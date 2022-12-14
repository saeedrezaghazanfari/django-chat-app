
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

/* DJANGO CHAT APP package */
/* v1.0.0 */

let env_dir;
let env_title;
let env_subtitle;
let env_game;
let env_auth_fields;
let env_max_report_number;
let env_show_supporter_name;
let is_set_env = false; 

let user_is_logged = false;
let user_id = '';

set_setting = () => {

    if(is_set_env)
        return;

    (async () => {
        await fetch('/django-chat-app/chat/setting/', {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => response.json())
        .then((response) => {
            if(response.status == 200) {

                env_dir = response.data.dir;
                env_title = response.data.title;
                env_subtitle = response.data.subtitle;
                env_game = response.data.game;
                env_auth_fields = response.data.auth_fields;
                env_max_report_number = response.data.max_report_number;
                env_show_supporter_name = response.data.show_supporter_name;
                is_set_env = true;

                // setting for direction
                if(env_dir == 'ltr') {
                    document.querySelector('section.chatapp').classList.add('chatapp__ltr')
                } else if(env_dir == 'rtl') {
                    document.querySelector('section.chatapp').classList.remove('chatapp__ltr')
                } else if(env_dir == 'auto') {
                    //TODO
                }

                // setting for title and subtitle
                document.querySelector('.chatapp .chatapp__msg .header__info div span:nth-child(1)').innerText = env_title;
                document.querySelector('.chatapp .chatapp__msg .header__info div span:nth-child(2)').innerText = env_subtitle;

                // setting for game
                if(!env_game)
                    document.querySelector('.chatapp .body__inputs .show_game').classList.add('d-none');


                // setting for email or phone
                if(env_auth_fields == 'email')
                    document.querySelector('.chatapp .chatapp_control_email').classList.remove('d-none');
                else if(env_auth_fields == 'phone')
                    document.querySelector('.chatapp .chatapp_control_phone').classList.remove('d-none');
                    

            } else if(response.status == 401) {
                localStorage.removeItem('chatapp_client_id');
            }
        })
        .catch(err => {
            console.log('ERR: ', err);
        });
    })();
}

// set settings
set_setting();


document.querySelector('section.chatapp .chatapp__btn').addEventListener(
    'click', () => open_close_box()
);
document.querySelector('section.chatapp .header__options button.close__msgbox').addEventListener(
    'click', () => open_close_box()
);
document.querySelector('section.chatapp .msg__body .body__wrapper .btn_last_msg button').addEventListener(
    'click', () => go_to_bottom_of_box()
);
document.querySelector('section.chatapp .chatapp__msg .body__inputs .goback_chat_btn').addEventListener(
    'click', () => {
        document.querySelector('section.chatapp .msg__body .body__wrapper .all__msg__wrapper').classList.remove('d-none');
        document.querySelector('section.chatapp .msg__body .body__wrapper .tictoctoe__game').classList.add('d-none');
        document.querySelector('section.chatapp .chatapp__msg .body__inputs form').classList.remove('d-none');
        document.querySelector('section.chatapp .chatapp__msg .body__inputs .goback_chat_btn').classList.add('d-none');
    }
)
document.querySelector('section.chatapp .chatapp__msg .body__inputs form div button.show_game').addEventListener(
    'click', () => {
        document.querySelector('section.chatapp .msg__body .body__wrapper .all__msg__wrapper').classList.add('d-none');
        document.querySelector('section.chatapp .msg__body .body__wrapper .tictoctoe__game').classList.remove('d-none');
        document.querySelector('section.chatapp .chatapp__msg .body__inputs form').classList.add('d-none');
        document.querySelector('section.chatapp .chatapp__msg .body__inputs .goback_chat_btn').classList.remove('d-none');
    }
)

go_to_bottom_of_box = () => {
    document.querySelector('.msg__body .body__wrapper').scrollIntoView({ behavior: "smooth", block: "end"});
}

function aaa() {
    // let el = document.querySelector('.msg__body');
    // // let el = document.querySelector('.body__wrapper');
    // console.log('scrollHeight', el.scrollHeight);
    // console.log('scrollTop', el.scrollTop);
    // console.log('offsetHeight', el.offsetHeight);
}

// reply a msg
reply_msg = (msgID) => {
    let msgbox = document.getElementById(msgID);
    let writer = '';
    let content = document.querySelector(`#${msgID} .msg__content`).innerText;

    if(msgbox.classList.contains('msg__right'))
        writer = '??????';
    else
        writer = '??????????????';

    document.querySelector('.body__inputs .reply_msg_wrapper').classList.remove('d-none');
    document.querySelector('.body__inputs .reply_msg_wrapper .reply__writer').innerText = writer;
    document.querySelector('.body__inputs .reply_msg_wrapper .reply__content').innerText = content;
}

// close the reply bar
document.querySelector('.body__inputs .reply_msg_wrapper .close_replybar').addEventListener(
    'click', () => {
        document.querySelector('.body__inputs .reply_msg_wrapper').classList.add('d-none');
        document.querySelector('.body__inputs .reply_msg_wrapper .reply__writer').innerText = '';
        document.querySelector('.body__inputs .reply_msg_wrapper .reply__content').innerText = '';
    }
)

// show message of a reply
document.querySelectorAll('.msg__replied').forEach(msg => {
    msg.addEventListener(
        'click', (e) => {
            let target = e.target.getAttribute('scholl_msg'); 
            if(target) {
                let target_element = document.getElementById(target);
                let initial_bgcolor = '';
                
                // change background color for message
                if(target_element.classList.contains('msg__right')) {
                    initial_bgcolor = target_element.style.backgroundColor;
                    target_element.style.backgroundColor = '#1577c6';
                } else if (target_element.classList.contains('msg__left')) {
                    initial_bgcolor = target_element.style.backgroundColor;
                    target_element.style.backgroundColor = '#c2c2c2';
                }
                setTimeout(() => {
                    target_element.style.backgroundColor = initial_bgcolor;
                }, 500);
                // scroll to message
                target_element.scrollIntoView({ behavior: "smooth", block: "end"});
            }
        }
    )
});

open_close_box = () => {
    if(document.querySelector('section.chatapp .chatapp__msg').classList.contains('d-none')) {
        document.querySelector('section.chatapp .chatapp__msg').classList.remove('d-none');
        setTimeout(() => {
            document.querySelector('section.chatapp .chatapp__msg').classList.remove('chatapp__hide');
            document.querySelector('section.chatapp .chatapp__msg').classList.add('chatapp__show');
        }, 100);

        /* + search for localstorage */
        let stored_userid = localStorage.getItem('chatapp_client_id');
        stored_userid = stored_userid.slice(1, (stored_userid.length)-1);
        
        if (stored_userid) {

            let formdata = new FormData();
            formdata.append('user_id', stored_userid);
            
            (async () => {
                await fetch('/django-chat-app/auth/check/userid/', {
                    method: "POST",
                    body: new URLSearchParams(formdata),
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then((response) => {
                    if(response.status == 200) {
                        let data = response.data;

                        user_is_logged = true;
                        user_id = stored_userid;
                        // start_socket();

                        document.querySelector('.chatapp .all__msg__wrapper').classList.remove('d-none');
                        document.querySelector('.chatapp .body__inputs form').classList.remove('d-none');

                    } else if(response.status == 401) {
                        localStorage.removeItem('chatapp_client_id');
                    }
                })
                .catch(err => {
                    console.log('ERR: ', err);
                });
            })();

        }
        else {
            document.querySelector('.chatapp__form').classList.remove('d-none');
        }
        /* - search for localstorage */

        go_to_bottom_of_box();
    } else {
        document.querySelector('section.chatapp .chatapp__msg').classList.remove('chatapp__show');
        document.querySelector('section.chatapp .chatapp__msg').classList.add('chatapp__hide');
        setTimeout(() => {
            document.querySelector('section.chatapp .chatapp__msg').classList.add('d-none');
        }, 120);
    }
}

// submit information form to backend and get chat id and save to localstorage
document.querySelector('#chatapp_submitform').addEventListener('click', () => {

    let fname = document.getElementById('chatapp__fname');
    let lname = document.getElementById('chatapp__lname');
    let email_phone;
    if (document.getElementById('chatapp__email'))
        email_phone = document.getElementById('chatapp__email');
    else if (document.getElementById('chatapp__phone'))
        email_phone = document.getElementById('chatapp__phone');

    // if(!fname.value && ) {
    //     return;
    // }
    
    // if(!lname.value && ) {
    //     return;
    // }
    
    // if(!email_phone.value && ) {
    //     return;
    // }

    let formdata = new FormData();
    formdata.append('fname', fname.value);
    formdata.append('lname', lname.value);
    formdata.append('email_phone', email_phone.value);

    (async () => {
        await fetch('/django-chat-app/auth/create/userid/', {
            method: "POST",
            body: new URLSearchParams(formdata),
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => response.json())
        .then( (response) => {
            if(response.status == 200) {
                let user_chat_id = response.data[0].user_chat_id;
                localStorage.setItem(
                    'chatapp_client_id', JSON.stringify(user_chat_id)
                );

                document.querySelector('.chatapp__form').classList.add('d-none');
                document.querySelector('.chatapp .all__msg__wrapper').classList.remove('d-none');
                document.querySelector('.chatapp .body__inputs form').classList.remove('d-none');
            }
        })
        .catch(err => {
            console.log('ERR', err);
        });
    })();

});

// start of socket
start_socket = () => {

    let username = user_id;
    let socket = new WebSocket( 'ws://' + window.location.host + '/ws/chat/' + username + '/');
    
    socket.onmessage = function(e) {
        let message = JSON.parse(e.data);

        $('.chatapp .all__msg__wrapper').prepend(`
            <div class="media mb-2">
                <div class="media-body">
                    <h6 class="mt-0"><strong>${message['sender']}</strong></h6>
                    ${message['text']}
                </div>
            </div>
        `);
    };
    
    socket.onclose = function(e) {
        console.error('Socket closed unexpectedly');
    };
    
    // document.querySelector('#msg-input').focus();
    document.querySelector('#msg-input').onkeyup = function(e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#msg-submit').click();
        }
    };
    
    document.querySelector('#msg-submit').onclick = function(e) {
        let username = document.querySelector('#username-input').value;
    
        let messageInputDom = document.querySelector('#msg-input');
        let message = messageInputDom.value;
    
        $('#messages-list').prepend(`
            <div class="media mb-2">
            <div class="media-body">
                <h6 class="mt-0"><strong>You</strong></h6>
                MESSAGE
            </div>
            </div>
        `.replace('MESSAGE', message));
    
        socket.send(JSON.stringify({'sender': username, 'receiver': username, 'text': message}));
    
        messageInputDom.value = '';
    };
}
// end of socket


/* Tic-Toc-Toe Game */
// Computer X .:. Human O

const number_game_win = 10;
let human_score = 0;
let computer_score = 0;
let all_btn = ['btn11', 'btn12', 'btn13', 'btn21', 'btn22', 'btn23', 'btn31', 'btn32', 'btn33'];
let selected = [];
let row1 = ['', '', ''];
let row2 = ['', '', ''];
let row3 = ['', '', ''];
let endGame = false;
let final = false;
let alertDiv = document.getElementById('game_alert_msg');
let bg__glass = document.getElementById('bg__glass');
let oimg = document.getElementById('oimage_game').getAttribute('src');
let ximg = document.getElementById('ximage_game').getAttribute('src');

// start a step with Human
document.querySelectorAll('.btn_game').forEach((btn) => {
    
    btn.addEventListener('click', (e) => {
        
        let btnId = e.target.getAttribute('id');
        if(!selected.find(el => el == btnId)) {
            
            selected.push(btnId);
            set_image_in_btn(btnId, 'O');
            set_config(btnId, 'O');
            check_winner('O');

            if(endGame == false && final == false) { // computer select
                computer_select();
                check_winner('X');
            }
            else if(endGame == true && final == false) { // clear buttons
                setTimeout(() => {
                    reset_game();
                }, 2000);
            }
        }
    });
});

// computer or human selections, set a image in the buttons
set_image_in_btn = (btnId, human_computer) => {
    let new_img = document.createElement("img");

    if(human_computer == 'O')
        new_img.setAttribute('src', oimg);
    else if(human_computer == 'X')
        new_img.setAttribute('src', ximg);
    
    if(human_computer == 'null') {
        document.getElementById(btnId).innerHTML = '';
    }
    if(human_computer != 'null') {
        document.getElementById(btnId).appendChild(new_img);
    }
}

// set X or O in row1, row2 and row3 arrays
set_config = (btnId, human_computer) => {

    if(btnId == 'btn11') 
        row1[0] = human_computer;
    if(btnId == 'btn12') 
        row1[1] = human_computer;
    if(btnId == 'btn13') 
        row1[2] = human_computer;

    if(btnId == 'btn21') 
        row2[0] = human_computer;
    if(btnId == 'btn22') 
        row2[1] = human_computer;
    if(btnId == 'btn23') 
        row2[2] = human_computer;

    if(btnId == 'btn31') 
        row3[0] = human_computer;
    if(btnId == 'btn32') 
        row3[1] = human_computer;
    if(btnId == 'btn33') 
        row3[2] = human_computer;
}

check_winner = (human_computer) => {
    if(human_computer == 'O'){
        // win in rows
        if(row1[0] == 'O' && row1[1] == 'O' && row1[2] == 'O')
            human_win('btn11', 'btn12', 'btn13');
        if(row2[0] == 'O' && row2[1] == 'O' && row2[2] == 'O')
            human_win('btn21', 'btn22', 'btn23');
        if(row3[0] == 'O' && row3[1] == 'O' && row3[2] == 'O')
            human_win('btn31', 'btn32', 'btn33');
        // win in columns
        if(row1[0] == 'O' && row2[0] == 'O' && row3[0] == 'O')
            human_win('btn11', 'btn21', 'btn31');
        if(row1[1] == 'O' && row2[1] == 'O' && row3[1] == 'O')
            human_win('btn12', 'btn22', 'btn32');
        if(row1[2] == 'O' && row2[2] == 'O' && row3[2] == 'O')
            human_win('btn13', 'btn23', 'btn33');        
        // win in *
        if(row1[0] == 'O' && row2[1] == 'O' && row3[2] == 'O')
            human_win('btn11', 'btn22', 'btn33');
        if(row1[2] == 'O' && row2[1] == 'O' && row3[0] == 'O')
            human_win('btn13', 'btn22', 'btn31');
    }
    else if(human_computer == 'X'){
        // win in rows
        if(row1[0] == 'X' && row1[1] == 'X' && row1[2] == 'X')
            computer_win('btn11', 'btn12', 'btn13');
        if(row2[0] == 'X' && row2[1] == 'X' && row2[2] == 'X')
            computer_win('btn21', 'btn22', 'btn23');
        if(row3[0] == 'X' && row3[1] == 'X' && row3[2] == 'X')
            computer_win('btn31', 'btn32', 'btn33');
        // win in columns
        if(row1[0] == 'X' && row2[0] == 'X' && row3[0] == 'X')
            computer_win('btn11', 'btn21', 'btn31');
        if(row1[1] == 'X' && row2[1] == 'X' && row3[1] == 'X')
            computer_win('btn12', 'btn22', 'btn32');
        if(row1[2] == 'X' && row2[2] == 'X' && row3[2] == 'X')
            computer_win('btn13', 'btn23', 'btn33');        
        // win in *
        if(row1[0] == 'X' && row2[1] == 'X' && row3[2] == 'X')
            computer_win('btn11', 'btn22', 'btn33');
        if(row1[2] == 'X' && row2[1] == 'X' && row3[0] == 'X')
            computer_win('btn13', 'btn22', 'btn31');
    }
}

human_win = (btn1, btn2, btn3) => {

    bg__glass.classList.remove('d-none');

    document.getElementById(btn1).style.backgroundColor = '#ececec';
    document.getElementById(btn2).style.backgroundColor = '#ececec';
    document.getElementById(btn3).style.backgroundColor = '#ececec';
    setTimeout(() => {
        document.getElementById(btn1).style.backgroundColor = '#fff';
        document.getElementById(btn2).style.backgroundColor = '#fff';
        document.getElementById(btn3).style.backgroundColor = '#fff';
    }, 2000);

    human_score += 1;
    if(human_score == number_game_win) {
        alertDiv.classList.remove('d-none');
        alertDiv.innerHTML = '?????? ?????????? ????????!';
        alertDiv.classList.add('game_alert_msg_win');
        final = true;
    }
    document.getElementById('score__game').innerHTML = `<div><span>??????:</span><span>${human_score}</span></div><div><span>????????????????:</span><span>${computer_score}</span></div>`;

    endGame = true;
}

computer_win = (btn1, btn2, btn3) => {

    bg__glass.classList.remove('d-none');

    document.getElementById(btn1).style.backgroundColor = '#c8e7ff';
    document.getElementById(btn2).style.backgroundColor = '#c8e7ff';
    document.getElementById(btn3).style.backgroundColor = '#c8e7ff';
    setTimeout(() => {
        document.getElementById(btn1).style.backgroundColor = '#fff';
        document.getElementById(btn2).style.backgroundColor = '#fff';
        document.getElementById(btn3).style.backgroundColor = '#fff';
    }, 2000);

    computer_score += 1;
    if(computer_score == number_game_win) {   
        alertDiv.classList.remove('d-none');
        alertDiv.innerHTML = '???????????????? ?????????? ????!';
        alertDiv.classList.add('game_alert_msg_lose');
        final = true;
    }
    document.getElementById('score__game').innerHTML = `<div><span>??????:</span><span>${human_score}</span></div><div><span>????????????????:</span><span>${computer_score}</span></div>`;

    endGame = true;

    if(final == false) {
        setTimeout(() => {
            reset_game();
        }, 2000);

        setTimeout(() => {
            computer_select();
            check_winner('X');
        }, 2100);
    }
}

// set logics for computer selections - attack is first, defence is last strategy
computer_select = () => {
    let list_selection = [];
    let computer_selection = '';

    if(selected.length >= 0 && selected.length <= 8) {

        list_selection = all_btn.filter((item) => !selected.includes(item));

        /* + ATTACK */
        if(row1[0] == 'X' && row1[1] == 'X' && row1[2] == '')
            computer_selection = 'btn13';
        else if(row1[0] == 'X' && row1[2] == 'X' && row1[1] == '')
            computer_selection = 'btn12';
        else if(row1[1] == 'X' && row1[2] == 'X' && row1[0] == '')
            computer_selection = 'btn11';

        else if(row2[0] == 'X' && row2[1] == 'X' && row2[2] == '')
            computer_selection = 'btn23';
        else if(row2[0] == 'X' && row2[2] == 'X' && row2[1] == '')
            computer_selection = 'btn22';    
        else if(row2[1] == 'X' && row2[2] == 'X' && row2[0] == '')
            computer_selection = 'btn21';    

        else if(row3[0] == 'X' && row3[1] == 'X' && row3[2] == '')
            computer_selection = 'btn33';
        else if(row3[0] == 'X' && row3[2] == 'X' && row3[1] == '')
            computer_selection = 'btn32';  
        else if(row3[1] == 'X' && row3[2] == 'X' && row3[0] == '')
            computer_selection = 'btn31';

        else if(row1[0] == 'X' && row2[0] == 'X' && row3[0] == '')
            computer_selection = 'btn31';
        else if(row1[0] == 'X' && row3[0] == 'X' && row2[0] == '')
            computer_selection = 'btn21';
        else if(row3[0] == 'X' && row2[0] == 'X' && row1[0] == '')
            computer_selection = 'btn11';

        else if(row1[1] == 'X' && row2[1] == 'X' && row3[1] == '')
            computer_selection = 'btn32';
        else if(row1[1] == 'X' && row3[1] == 'X' && row2[1] == '')
            computer_selection = 'btn22';  
        else if(row3[1] == 'X' && row2[1] == 'X' && row1[1] == '')
            computer_selection = 'btn12';

        else if(row1[2] == 'X' && row2[2] == 'X' && row3[2] == '')
            computer_selection = 'btn33';
        else if(row1[2] == 'X' && row3[2] == 'X' && row2[2] == '')
            computer_selection = 'btn23';  
        else if(row3[2] == 'X' && row2[2] == 'X' && row1[2] == '')
            computer_selection = 'btn13';
        
        else if(row1[0] == 'X' && row2[1] == 'X' && row3[2] == '')
            computer_selection = 'btn33';
        else if(row1[0] == 'X' && row3[2] == 'X' && row2[1] == '')
            computer_selection = 'btn22';  
        else if(row2[1] == 'X' && row3[2] == 'X' && row1[0] == '')
            computer_selection = 'btn11';

        else if(row1[2] == 'X' && row2[1] == 'X' && row3[0] == '')
            computer_selection = 'btn31';
        else if(row1[2] == 'X' && row3[0] == 'X' && row2[1] == '')
            computer_selection = 'btn22';  
        else if(row2[1] == 'X' && row3[0] == 'X' && row1[2] == '')
            computer_selection = 'btn13';

        /* - ATTACK */
        /* + DEFENCE */

        else if(row1[0] == 'O' && row1[1] == 'O' && row1[2] == '')
            computer_selection = 'btn13';
        else if(row1[0] == 'O' && row1[2] == 'O' && row1[1] == '')
            computer_selection = 'btn12';
        else if(row1[1] == 'O' && row1[2] == 'O' && row1[0] == '')
            computer_selection = 'btn11';

        else if(row2[0] == 'O' && row2[1] == 'O' && row2[2] == '')
            computer_selection = 'btn23';
        else if(row2[0] == 'O' && row2[2] == 'O' && row2[1] == '')
            computer_selection = 'btn22';    
        else if(row2[1] == 'O' && row2[2] == 'O' && row2[0] == '')
            computer_selection = 'btn21';    

        else if(row3[0] == 'O' && row3[1] == 'O' && row3[2] == '')
            computer_selection = 'btn33';
        else if(row3[0] == 'O' && row3[2] == 'O' && row3[1] == '')
            computer_selection = 'btn32';  
        else if(row3[1] == 'O' && row3[2] == 'O' && row3[0] == '')
            computer_selection = 'btn31';

        else if(row1[0] == 'O' && row2[0] == 'O' && row3[0] == '')
            computer_selection = 'btn31';
        else if(row1[0] == 'O' && row3[0] == 'O' && row2[0] == '')
            computer_selection = 'btn21';
        else if(row3[0] == 'O' && row2[0] == 'O' && row1[0] == '')
            computer_selection = 'btn11';

        else if(row1[1] == 'O' && row2[1] == 'O' && row3[1] == '')
            computer_selection = 'btn32';
        else if(row1[1] == 'O' && row3[1] == 'O' && row2[1] == '')
            computer_selection = 'btn22';  
        else if(row3[1] == 'O' && row2[1] == 'O' && row1[1] == '')
            computer_selection = 'btn12';

        else if(row1[2] == 'O' && row2[2] == 'O' && row3[2] == '')
            computer_selection = 'btn33';
        else if(row1[2] == 'O' && row3[2] == 'O' && row2[2] == '')
            computer_selection = 'btn23';  
        else if(row3[2] == 'O' && row2[2] == 'O' && row1[2] == '')
            computer_selection = 'btn13';
        
        else if(row1[0] == 'O' && row2[1] == 'O' && row3[2] == '')
            computer_selection = 'btn33';
        else if(row1[0] == 'O' && row3[2] == 'O' && row2[1] == '')
            computer_selection = 'btn22';  
        else if(row2[1] == 'O' && row3[2] == 'O' && row1[0] == '')
            computer_selection = 'btn11';

        else if(row1[2] == 'O' && row2[1] == 'O' && row3[0] == '')
            computer_selection = 'btn31';
        else if(row1[2] == 'O' && row3[0] == 'O' && row2[1] == '')
            computer_selection = 'btn22';  
        else if(row2[1] == 'O' && row3[0] == 'O' && row1[2] == '')
            computer_selection = 'btn13';
        /* - DEFENCE */

        /* SELECT RANDOM BUTTON */
        else {
            computer_selection = list_selection[Math.floor(Math.random()*list_selection.length)];
        }

        set_image_in_btn(computer_selection, 'X');
        selected.push(computer_selection);
        set_config(computer_selection, 'X');
        
        if(selected.length == 9) {
            setTimeout(() => {
                reset_game();
            }, 1000);
        }
    }
    else if(selected.length == 9) {
        setTimeout(() => {
            reset_game();
        }, 1000);
    }
}

// clear buttons, hide alertbox [scores is not resets!]
reset_game = () => {
    selected = [];
    row1 = ['', '', ''];
    row2 = ['', '', ''];
    row3 = ['', '', ''];
    endGame = false;
    final = false;
    bg__glass.classList.add('d-none');
    all_btn.forEach(element => {
        set_image_in_btn(element, 'null');
    });
    alertDiv.classList.remove('game_alert_msg_lose');
    alertDiv.classList.remove('game_alert_msg_win');
    alertDiv.classList.add('d-none');
}

// restart all of game, reset scores
document.getElementById('restart__game').addEventListener('click', ()=> {
    human_score = 0;
    computer_score = 0;
    document.getElementById('score__game').innerHTML = `<div><span>??????:</span><span>${human_score}</span></div><div><span>????????????????:</span><span>${computer_score}</span></div>`;
    reset_game();
});
