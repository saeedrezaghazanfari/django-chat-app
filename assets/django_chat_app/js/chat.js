
/* DJANGO CHAT APP package */
/* v1.0.0 */


// encrypt = (salt, text) => {
//     const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
//     const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
//     const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
//     return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
// };
// decrypt = (salt, encoded) => {
//     const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
//     const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
//     return encoded.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)).map(applySaltToChar).map((charCode) => String.fromCharCode(charCode)).join("");
// };


// let stored_userid = localStorage.getItem('chatapp_client_id');

// if (stored_userid) {

//     // (async () => {
//     //     await fetch(`/django-chat-app/auth/?data=${stored_userid}`, {
//     //         method: 'POST',
//     //         headers: {
//     //             "Content-type": "application/json; charset=UTF-8"
//     //         },
//     //         body: JSON.stringify({data: 'saeedreza'})
//     //     })
//     //     .then(response => response.json())
//     //     .then(json => console.log(json))
//     //     .catch(err => {
//     //         console.log('err', err);
//     //     });
//     // })();
// }
// else {

//     document.querySelector('.chatapp__form').classList.remove('d-none');
    
//     // localStorage.setItem(
//     //     'chatapp_client_id', JSON.stringify(username)
//     // );
// }


// chatapp_submitform = () => {
//     let fname = document.getElementById('chatapp__fname').value;
//     let lname = document.getElementById('chatapp__lname').value;
//     let email = document.getElementById('chatapp__email').value;
//     let phone = document.getElementById('chatapp__phone').value;

//     console.log(fname);
// } 





// let my_username = 'username_json'; //TODO
// document.querySelector('#user_id').innerHTML = my_username;

// let socket = new WebSocket( 'ws://' + window.location.host + '/ws/chat/' + my_username + '/');

// socket.onmessage = function(e) {
//     let message = JSON.parse(e.data);
//     $('#messages-list').prepend(`
//         <div class="media mb-2">
//         <div class="media-body">
//             <h6 class="mt-0"><strong>USERNAME</strong></h6>
//             MESSAGE
//         </div>
//         </div>
//     `.replace('USERNAME', message['sender']).replace('MESSAGE', message['text']));
// };

// socket.onclose = function(e) {
//     console.error('Socket closed unexpectedly');
// };

// document.querySelector('#msg-input').focus();
// document.querySelector('#msg-input').onkeyup = function(e) {
//     if (e.keyCode === 13) {  // enter, return
//         document.querySelector('#msg-submit').click();
//     }
// };

// document.querySelector('#msg-submit').onclick = function(e) {
//     let username = document.querySelector('#username-input').value;

//     let messageInputDom = document.querySelector('#msg-input');
//     let message = messageInputDom.value;

//     $('#messages-list').prepend(`
//         <div class="media mb-2">
//         <div class="media-body">
//             <h6 class="mt-0"><strong>You</strong></h6>
//             MESSAGE
//         </div>
//         </div>
//     `.replace('MESSAGE', message));

//     socket.send(JSON.stringify({'sender': my_username, 'receiver': username, 'text': message}));

//     messageInputDom.value = '';
// };