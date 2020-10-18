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

const sdk = require('matrix-js-sdk');

const client = sdk.createClient(`https://${process.argv[2]}`)


client.login("m.login.password", {"user": process.argv[3], "password": process.argv[4]})
.then( async (response) => {
  console.log(response)
}).catch( (err) => {
    console.log(err)
})
