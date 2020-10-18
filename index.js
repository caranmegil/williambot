/*

index.js - code responsible for the Aethred bot on matrix

Copyright (C) 2020  William R. Moore <caranmegil@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

const StorageShim = require('node-storage-shim')
global.Olm = require('./olm')
const sdk = require('matrix-js-sdk');
const request = require('superagent');
const moment = require('moment');

function processCommand(m) {
    switch(m[1]) {
        case 'leave':
	    break;
    }
}

setInterval(() => {
    var rooms = client.getRooms();
    rooms.forEach( (room) => {
        var me = room.getMember(`@${process.env.USER}:${process.env.HOST}`)
	if(!me) return
        if (me.membership === 'invite') {
            client.joinRoom(room.currentState.roomId).catch((err) => {
                console.log(err)
            })
        }
    })
}, 5000)

const client = sdk.createClient({
    baseUrl: `https://${process.env.HOST}`,
    idBaseUrl: 'https://vector.im',
    sessionStore: new sdk.WebStorageSessionStore(new StorageShim()),
    accessToken: process.env.ACCESS_TOKEN,
    userId: `@${process.env.USER}:${process.env.HOST}`,
    deviceId: process.env.DEVICE_ID,
})

var startUp = moment()
client.on("Room.timeline", (evt, room, toStartOfTimeline) => {
    let content = evt.getContent()

    if (toStartOfTimeline) {
        return;
    }
    const evtOriginServerTS = moment(evt.event.origin_server_ts);
    
    if (startUp.isAfter(evtOriginServerTS)) {
        return;
    }

    startUp = evtOriginServerTS
    if (evt.getType() === "m.room.encrypted" || evt.getType() === "m.room.message") {
	var body = evt.event.content.body ? evt.event.content.body : content.body
    }
})

client.initCrypto().then( () => {
    client.startClient({initialSyncLimit: 0})
}).catch( (e) => {
    console.error(e)
})
