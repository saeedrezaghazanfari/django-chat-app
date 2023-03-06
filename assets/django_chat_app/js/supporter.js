
document.getElementById('chatapp').addEventListener('click', (ev)=> {
    if(!ev.target.closest('span.toggle_mneubar')){
        document.querySelectorAll('.chatapp ul.msg-menu-bar').forEach(element => {
            if(!element.classList.contains('d-none'))
                element.classList.add('d-none');
        });
    }
});

/* DJANGO CHAT APP package */
/* v1.0.0 */

Vue.createApp({
    
    delimiters: [`[[`, `]]`],
    
    data() {
        return {
            // env variables
            env_dir: '',
            edit_user_msg: false,
            delete_user_msg: false,
            show_deleted_msg: false,
            is_set_env: false,

            supporter_uid: '',
            client_id: '',
            client_name: '',

            socket: '',
            msg_input: '',

            receiver_status: '',

            new_readymsg_subject: '',
            new_readymsg_content: '',

            ready_msgs: [],

            chat_to_all: [],

            tab_id_active: 'yourunreads',
            tab_data_is_show: true,
            show_msg_container: false,
            menu_active_tab: '',

            message_status_is_edit: false,

            message_list: [],
            unreads_nosupoorter_pre: [],
            unreads_nosupoorter: [],
            unreads_thissupporter_pre: [],
            unreads_thissupporter: [],

            which_toggle_popup: '',
            report_item: 'badterms',
            report_cause: '',

            alert: '',
        }
    },

    created() {
        this.set_setting();
    },

    mounted() {
        this.supporter_uid = document.getElementById('supporter_uid').innerText;
        this.get_board_msgs();
        this.start_socket();
    },

    methods: {
        
        // encrypt(salt, text) {
        //     const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        //     const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        //     const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        //     return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
        // },

        // decrypt(salt, encoded) {
        //     const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        //     const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        //     return encoded.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)).map(applySaltToChar).map((charCode) => String.fromCharCode(charCode)).join("");
        // },

        open_tab_data(context) {
            this.tab_id_active = context;
            this.show_msg_container = false;
            this.tab_data_is_show = true;

            this.reset_close_chat_box()
        },

        open_report_box() {
            if(this.which_toggle_popup == 'report')
                this.which_toggle_popup = '';
            else 
                this.which_toggle_popup = 'report';
        },

        add_emoji_toinput(emoji) {
            this.msg_input += emoji;
            this.focus_msg_input();
        },
        show_menu_bar(elementID) {

            if(document.getElementById(elementID).classList.contains('d-none')) {
                document.querySelectorAll('.chatapp .msg-menu-bar').forEach(element => {
                    element.classList.add('d-none');
                });
                document.getElementById(elementID).classList.remove('d-none');
            }
            else
                document.getElementById(elementID).classList.add('d-none');
        },

        show_emojibar() {
            if(document.querySelector('section.chatapp .emoji_wrapper').classList.contains('d-none')){
                document.querySelector('section.chatapp .emoji_wrapper').classList.remove('d-none');
            }else {
                document.querySelector('section.chatapp .emoji_wrapper').classList.add('d-none');
            }
        },

        play_send_sound() {
            let sound_sendmsg = document.getElementById('sound_sendmsg');
            new Audio(sound_sendmsg.innerText).play();
        },

        focus_msg_input() {
            setTimeout(() => {
                document.querySelector('section.chatapp .body__inputs #text-chatinput').focus();
            }, 200);
        },

        set_setting() {

            if(this.is_set_env)
                return;

            (async () => {
                await fetch('/' +  window.location.pathname[1] + window.location.pathname[2] + '/django-chat-app/chat/setting/', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then((response) => {
                    if(response.status == 200) {

                        this.env_dir = response.data.dir;
                        this.edit_user_msg = response.data.edit_supporter_msg;
                        this.delete_user_msg = response.data.delete_supporter_msg;
                        this.show_deleted_msg = response.data.show_deleted_msg;
                        this.is_set_env = true;

                        let language = window.location.pathname[1] + window.location.pathname[2];

                        // setting for direction
                        if(this.env_dir == 'ltr') {
                            document.querySelector('section.chatapp').classList.add('chatapp__ltr')
                        } else if(this.env_dir == 'rtl') {
                            document.querySelector('section.chatapp').classList.remove('chatapp__ltr')
                        } else if(this.env_dir == 'auto') {
                            if(language == 'fa' || language == 'ar')
                                document.querySelector('section.chatapp').classList.remove('chatapp__ltr')
                            else
                                document.querySelector('section.chatapp').classList.add('chatapp__ltr')
                        }
                    }
                })
                .catch(err => {
                    console.log('ERR: ', err);
                });
            })();
        },

        get_board_msgs() {

            let formdata = new FormData();
            formdata.append('supporter_uid', this.supporter_uid);
            
            (async () => {
                await fetch('/' + window.location.pathname[1] + window.location.pathname[2] + '/django-chat-app/chat/supporter/unreads/', {
                    method: "POST",
                    body: new URLSearchParams(formdata),
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then((response) => {
                    if(response.status == 200) {
                        
                        // set to board
                        this.set_unread_msgs_to_board(
                            response.unreads_nosupoorter,
                            response.unreads_thissupporter
                        )

                        this.chat_to_all = response.chat_to_all;
                    }
                })
                .catch(err => {
                    console.log('ERR: ', err);
                });
            })();

        },

        set_unread_msgs_to_board(GetNosupoorter, GetThissupporter) {

            // get nosupoorter
            this.unreads_nosupoorter_pre = GetNosupoorter;
            let nosupoorter_count = {};
            let nosupoorter_result = [];

            this.unreads_nosupoorter_pre.forEach(element => {
                nosupoorter_count[element.owner_id] = (nosupoorter_count[element.owner_id] || 0) + 1;
            });
            
            for (const key in nosupoorter_count) {
                for (let i = 0; i < this.unreads_nosupoorter_pre.length; i++) {
                    if(key == this.unreads_nosupoorter_pre[i].owner_id) {
                        nosupoorter_result.push({
                            "owner_id": this.unreads_nosupoorter_pre[i].owner_id,
                            "owner_name": this.unreads_nosupoorter_pre[i].owner_name,
                            "counter": nosupoorter_count[key],
                            "status": ""
                        })
                        break;
                    }
                }
            }
            this.unreads_nosupoorter = nosupoorter_result;
            
            // get thissupporter
            this.unreads_thissupporter_pre = GetThissupporter;
            let thissupporter_count = {};
            let thissupporter_result = [];

            this.unreads_thissupporter_pre.forEach(element => {
                thissupporter_count[element.owner_id] = (thissupporter_count[element.owner_id] || 0) + 1;
            });
            
            for (const key in thissupporter_count) {
                for (let i = 0; i < this.unreads_thissupporter_pre.length; i++) {
                    if(key == this.unreads_thissupporter_pre[i].owner_id) {
                        thissupporter_result.push({
                            "owner_id": this.unreads_thissupporter_pre[i].owner_id,
                            "owner_name": this.unreads_thissupporter_pre[i].owner_name,
                            "counter": thissupporter_count[key],
                            "status": ""
                        })
                        break;
                    }
                }
            }
            this.unreads_thissupporter = thissupporter_result;
        },

        go_to_bottom_of_box() {
            document.querySelector('.msg__body .body__wrapper').scrollIntoView({ behavior: "smooth", block: "end"});
        },
        
        reply_msg(elementId, msgId) {
            this.focus_msg_input();
            let msgbox = document.getElementById(elementId);
            let reply_writer = '';
            let reply_id = msgId;
            let reply_content = document.querySelector(`#${elementId} .msg__content`).innerText;

            if(msgbox.classList.contains('msg__right'))
                reply_writer = 'شما';
            else
                reply_writer = 'کاربر';

            document.querySelector('.body__inputs .reply_msg_wrapper').classList.remove('d-none');
            document.querySelector('.body__inputs .reply_msg_wrapper .reply__writer').innerText = reply_writer;
            document.querySelector('.body__inputs .reply_msg_wrapper .reply__content').innerText = reply_content;
            document.querySelector('.body__inputs .reply_msg_wrapper .reply__reply_id').innerText = reply_id;
        },
        
        close_replybar() {
            this.message_status_is_edit = false;
            document.querySelector('.body__inputs .reply_msg_wrapper').classList.add('d-none');
            document.querySelector('.body__inputs .reply_msg_wrapper .reply__writer').innerText = '';
            document.querySelector('.body__inputs .reply_msg_wrapper .reply__content').innerText = '';
            document.querySelector('.body__inputs .reply_msg_wrapper .reply__reply_id').innerText = '';
        },

        msg_replied(scholl_msg) {
            let target = document.getElementById(scholl_msg); 

            if(target) {
                let initial_bgcolor = '';

                // change background color for message
                if(target.classList.contains('msg__right')) {
                    initial_bgcolor = target.style.backgroundColor;
                    target.style.backgroundColor = '#1577c6';
                } else if (target.classList.contains('msg__left')) {
                    initial_bgcolor = target.style.backgroundColor;
                    target.style.backgroundColor = '#c2c2c2';
                }

                setTimeout(() => {
                    target.style.backgroundColor = initial_bgcolor;
                }, 3000);

                // scroll to message
                target.scrollIntoView({ behavior: "smooth", block: "end"});
            }
        },

        start_socket() {

            this.socket = new WebSocket( 'ws://' + window.location.host + '/ws/supporter/chat/' + this.supporter_uid + '/');
            
            let mythis = this;

            this.socket.onmessage = function(e) {

                let message = JSON.parse(e.data);
                // console.log(message);

                if(message._type_request == 'edit') {  /* just edit message */
                    mythis.message_list.forEach(element => {
                        if(element.id == message.reply_id) {
                            element.text = message.text;
                            element.is_edited = true;
                        }
                    });

                    return;
                }

                else if(message._type_request == 'del') {  /* just delete message */
                    mythis.message_list.forEach(element => {
                        if(element.id == message.id)
                            element.is_deleted = true;
                        if(element.reply_id == message.id)
                            element.reply_is_deleted = true;
                    });

                    return;
                }

                else if(message._type_request == 'seen'){
                    mythis.message_list.forEach(element => {
                        element.is_seen = true;
                    });
                }

                else if(message._type_request == 'status') {
                    if(mythis.client_id)
                        mythis.receiver_status = message.status;

                    mythis.unreads_thissupporter.forEach(element => {
                        if(element.owner_id == message.user_id) 
                            element.status = message.status;
                    });
                    mythis.unreads_nosupoorter.forEach(element => {
                        if(element.owner_id == message.user_id) 
                            element.status = message.status;
                    });
                }

                // add message to board
                else if(message._type_request == 'send') {

                    if(message.client_have_supporter == 'yes') {

                        mythis.unreads_thissupporter_pre.push(message);
                        let thissupporter_count = {};
                        let thissupporter_result = [];

                        mythis.unreads_thissupporter_pre.forEach(element => {
                            thissupporter_count[element.owner_id] = (thissupporter_count[element.owner_id] || 0) + 1;
                        });
                        
                        for (const key in thissupporter_count) {
                            for (let i = 0; i < mythis.unreads_thissupporter_pre.length; i++) {
                                if(key == mythis.unreads_thissupporter_pre[i].owner_id) {
                                    thissupporter_result.push({
                                        "owner_id": mythis.unreads_thissupporter_pre[i].owner_id,
                                        "owner_name": mythis.unreads_thissupporter_pre[i].owner_name,
                                        "counter": thissupporter_count[key],
                                        "status": ""
                                    })
                                    break;
                                }
                            }
                        }
                        mythis.unreads_thissupporter = thissupporter_result;
                    }
                    else if(message.client_have_supporter == 'no') {

                        mythis.unreads_nosupoorter_pre.push(message);
                        let nosupoorter_count = {};
                        let nosupoorter_result = [];

                        mythis.unreads_nosupoorter_pre.forEach(element => {
                            nosupoorter_count[element.owner_id] = (nosupoorter_count[element.owner_id] || 0) + 1;
                        });

                        for (const key in nosupoorter_count) {
                            for (let i = 0; i < mythis.unreads_nosupoorter_pre.length; i++) {
                                if(key == mythis.unreads_nosupoorter_pre[i].owner_id) {
                                    nosupoorter_result.push({
                                        "owner_id": mythis.unreads_nosupoorter_pre[i].owner_id,
                                        "owner_name": mythis.unreads_nosupoorter_pre[i].owner_name,
                                        "counter": nosupoorter_count[key],
                                        "status": ""
                                    })
                                    break;
                                }
                            }
                        }
                        mythis.unreads_nosupoorter = nosupoorter_result;
                    }

                    setTimeout(()=> {
                        mythis.go_to_bottom_of_box();
                    }, 400);
                }
                
                if(message._type_request == 'send' && mythis.client_id && !message.message_id) {
                    mythis.message_list.push(message);
                    setTimeout(()=> {
                        mythis.go_to_bottom_of_box();
                    }, 400);
                }

                // read this message if this page is open
                if(message.owner_id == mythis.client_id && !message.message_id){ 

                    // read this msg signal
                    mythis.socket.send(JSON.stringify({
                        '_type_request': 'seen',
                        'message_id': 'all-msg',
                        'message_sender': 'client',
                        'client_id': mythis.client_id,
                    }));
                }

            };

            this.socket.onclose = function(e) {
                console.error('Socket closed unexpectedly');
            };
        },
        
        show_user_chat_page(client_id, client_name, client_item, msg_type, index_item) {

            this.tab_data_is_show = false;
            this.show_msg_container = true;

            this.focus_msg_input();
            document.querySelectorAll('.chatapp .wrapper__chatboxes .chat__box').forEach(element => {
                if(element.classList.contains('msg_item_active'))
                    element.classList.remove('msg_item_active');
            });
            document.querySelector(`.chatapp .wrapper__chatboxes .${client_item}`).classList.add('msg_item_active');
            document.querySelector('.chatapp .body__inputs').classList.remove('d-none');
            
            this.client_id = client_id;
            this.client_name = client_name;
            
            let formdata = new FormData();
            formdata.append('supporter_uid', this.supporter_uid);
            formdata.append('client_id', client_id);
            formdata.append('msg_type', msg_type);
            
            (async () => {
                await fetch('/' + window.location.pathname[1] + window.location.pathname[2] + '/django-chat-app/chat/supporter/read-all/', {
                    method: "POST",
                    body: new URLSearchParams(formdata),
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then((response) => {
                    if(response.status == 200) {
                        
                        this.message_list = response.data;
                        // console.log(response);

                        if(msg_type == 'thissupporter')
                            this.unreads_thissupporter[index_item].counter = 0;
                        else if(msg_type == 'nosupoorter')
                            this.unreads_nosupoorter[index_item].counter = 0;

                        setTimeout(()=> {
                            this.go_to_bottom_of_box();
                        }, 500);    

                        // send online status
                        let mythis = this;
                        this.socket.send(JSON.stringify({
                            '_type_request': 'status',
                            'status': 'online',
                            'user_id': 'supporter',
                            'client_id': mythis.client_id,
                        }));

                        // read all message signal
                        this.socket.send(JSON.stringify({
                            '_type_request': 'seen',
                            'message_id': 'all-msg',
                            'message_sender': 'client',
                            'client_id': mythis.client_id,
                        }));

                    }
                })
                .catch(err => {
                    console.log('ERR: ', err);
                });
            })();
        },
       
        reset_close_chat_box() {
            document.querySelectorAll('.chatapp .wrapper__chatboxes .chat__box').forEach(element => {
                if(element.classList.contains('msg_item_active'))
                    element.classList.remove('msg_item_active');
            });
            document.querySelector('.chatapp .body__inputs').classList.add('d-none');
            
            // send offline status
            let mythis = this;
            if(this.client_id){
                this.socket.send(JSON.stringify({
                    '_type_request': 'status',
                    'status': 'offline',
                    'user_id': 'supporter',
                    'client_id': mythis.client_id,
                }));
            }

            this.receiver_status = '';
            this.client_id = '';
            this.client_name = '';
            this.msg_input = '';
            this.message_list = [];
            this.which_toggle_popup = '';
        },
        
        sned_msg_socket(e) {

            if(!this.msg_input)
                return;

            if(!document.querySelector('section.chatapp .emoji_wrapper').classList.contains('d-none'))
                document.querySelector('section.chatapp .emoji_wrapper').classList.add('d-none');

            if(this.message_status_is_edit) { /* just edit message */

                let content = document.querySelector('.body__inputs .reply_msg_wrapper .reply__content').innerText;
                let reply_id = document.querySelector('.body__inputs .reply_msg_wrapper .reply__reply_id').innerText;
                let mythis = this;
                this.socket.send(JSON.stringify({
                    '_type_request': 'edit',
                    'client_id': mythis.client_id,
                    'owner_id': mythis.supporter_uid,
                    'owner_name': '',
                    'id': 0,
                    'sender_type': 'supporter', 
                    'reply_id': reply_id,
                    'reply_title': '', 
                    'reply_msg': content, 
                    'is_seen': 0,
                    'created': '',
                    'text': mythis.msg_input,
                }));

                this.message_list.forEach(element => {
                    if(element.id == reply_id) {
                        element.text = mythis.msg_input;
                        element.is_edited = true;
                    }
                });

                this.message_status_is_edit = false;
                this.msg_input = '';

                this.close_replybar();
                
                setTimeout(()=> {
                    this.go_to_bottom_of_box();
                }, 500);

                return;
            }

            if(document.querySelector('.body__inputs .reply_msg_wrapper').classList.contains('d-none')) {
                let mythis = this;
                this.socket.send(JSON.stringify({
                    '_type_request': 'send',
                    'client_id': mythis.client_id,
                    'owner_id': mythis.supporter_uid,
                    'owner_name': '',
                    'id': 0,
                    'sender_type': 'supporter', 
                    'reply_id': '',
                    'reply_title': '', 
                    'reply_msg': '', 
                    'is_seen': 0,
                    'created': '',
                    'text': mythis.msg_input
                }));    

                // play send sound
                this.play_send_sound();

                setTimeout(()=> {
                    this.go_to_bottom_of_box();
                }, 500);

            } 
            else {
                let writer = document.querySelector('.body__inputs .reply_msg_wrapper .reply__writer').innerText;
                let content = document.querySelector('.body__inputs .reply_msg_wrapper .reply__content').innerText;
                let reply_id = document.querySelector('.body__inputs .reply_msg_wrapper .reply__reply_id').innerText;
                let mythis = this;
                this.socket.send(JSON.stringify({
                    '_type_request': 'send',
                    'client_id': mythis.client_id,
                    'owner_id': mythis.supporter_uid,
                    'owner_name': '',
                    'id': 0,
                    'sender_type': 'supporter', 
                    'reply_id': reply_id,
                    'reply_title': '', 
                    'reply_msg': content, 
                    'is_seen': 0,
                    'created': '',
                    'text': mythis.msg_input
                }));

                // play send sound
                this.play_send_sound();

                this.close_replybar();
                
                setTimeout(()=> {
                    this.go_to_bottom_of_box();
                }, 500);
            }

            this.msg_input = '';
        },

        send_report() {
            
            let formdata = new FormData();
            formdata.append('supporter_uid', this.supporter_uid);
            formdata.append('client_id', this.client_id);
            formdata.append('report_cause', this.report_cause);
            formdata.append('report_item', this.report_item);

            (async () => {
                await fetch('/' + window.location.pathname[1] + window.location.pathname[2] + '/django-chat-app/chat/supporter/report/', {
                    method: "POST",
                    body: new URLSearchParams(formdata),
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then((response) => {
                    if(response.status == 200) {

                        if(response.is_blocked) {
                            window.location.reload()
                        }

                        this.report_item = 'badterms';
                        this.report_cause = '';
                    }
                })
                .catch(err => {
                    console.log('ERR: ', err);
                });
            })();
        },
        
        openclose_copyreadymsg() {
            if(this.which_toggle_popup != 'copybox') {

                if(this.ready_msgs.length == 0) {
                    let formdata = new FormData();
                    formdata.append('supporter_uid', this.supporter_uid);

                    (async () => {
                        await fetch('/' + window.location.pathname[1] + window.location.pathname[2] + '/django-chat-app/chat/supporter/ready-msg/get/', {
                            method: "POST",
                            body: new URLSearchParams(formdata),
                            headers: {
                                "Content-type": "application/x-www-form-urlencoded"
                            }
                        })
                        .then(response => response.json())
                        .then((response) => {
                            if(response.status == 200) {
                                this.ready_msgs = response.data;
                            }
                        })
                        .catch(err => {
                            console.log('ERR: ', err);
                        });
                    })();
                }

                this.which_toggle_popup = 'copybox';
            }else {
                this.which_toggle_popup = '';
            }
        },

        edit_message(elementId, msgId) {
            this.message_status_is_edit = true;
            this.reply_msg(elementId, msgId);
        },

        delete_message(msgId) {

            let mythis = this;
            this.socket.send(JSON.stringify({
                '_type_request': 'del',
                'client_id': mythis.client_id,
                'owner_id': mythis.supporter_uid,
                'id': msgId,
            }));    

            this.message_list.forEach(element => {
                if(element.id == msgId) 
                    element.is_deleted = true;
                if(element.reply_id == msgId)
                    element.reply_is_deleted = true;
            });
        },

        delete_ready_msg(msgID) {
            let formdata = new FormData();
            formdata.append('supporter_uid', this.supporter_uid);
            formdata.append('msgID', msgID);

            (async () => {
                await fetch('/' + window.location.pathname[1] + window.location.pathname[2] + '/django-chat-app/chat/supporter/ready-msg/del/', {
                    method: "POST",
                    body: new URLSearchParams(formdata),
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then((response) => {
                    if(response.status == 200) {
                        this.ready_msgs = response.data;
                    }
                })
                .catch(err => {
                    console.log('ERR: ', err);
                });
            })();
        },

        copy_ready_msg(content) {
            const el = document.createElement('textarea');
            el.value = content;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },

        submit_new_readymsg() {

            if(this.new_readymsg_subject.length < 4)
                return;

            if(this.new_readymsg_content.length < 4)
                return;
            
            let formdata = new FormData();
            formdata.append('supporter_uid', this.supporter_uid);
            formdata.append('subject', this.new_readymsg_subject);
            formdata.append('content', this.new_readymsg_content);

            (async () => {
                await fetch('/' + window.location.pathname[1] + window.location.pathname[2] + '/django-chat-app/chat/supporter/ready-msg/create/', {
                    method: "POST",
                    body: new URLSearchParams(formdata),
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then((response) => {
                    if(response.status == 200) {
                        this.ready_msgs = response.data;
                        this.new_readymsg_subject = '';
                        this.new_readymsg_content = '';
                        this.alert = 'پیام شما با موفقیت ذخیره شد. شما میتوانید هنگام چت با کاربران از این پیام استفاده کنید.'
                    }

                    setTimeout(() => {
                        this.alert = '';
                    }, 3000);
                })
                .catch(err => {
                    console.log('ERR: ', err);
                });
            })();
        },

    }
}).mount('#chatapp');
