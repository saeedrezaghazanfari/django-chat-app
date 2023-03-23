
/* DJANGO CHAT APP - client.js */

document.getElementById('chatapp').addEventListener('click', (ev)=> {
    if(!ev.target.closest('span.toggle_mneubar')){
        document.querySelectorAll('section.chatapp ul.msg-menu-bar').forEach(element => {
            if(!element.classList.contains('d-none'))
                element.classList.add('d-none');
        });
    }
});

const translated_messages = {
    fa: {
        'online': 'آنلاین',
        'last seen recently': 'آخرین بازدید اخیرا',
        'You': 'شما',
        'edited': 'ویرایش شده',
        'Supporter': 'پشتیبان',
        'This message has been deleted.': 'این پیام حذف شده است.',
        'Play again': 'بازی مجدد',
        'Computer': 'کامپیوتر',
        'For better support and guidance, please enter your details correctly.': 'جهت پشتیبانی و راهنمایی بهتر، لطفا مشخصات خود را بصورت صحیح وارد نمایید.',
        'First Name': 'نام',
        'Last Name': 'نام‌خانوادگی',
        'E-mail': 'ایمیل',
        'Phone': 'شماره تماس',
        'Send': 'ارسال',
        'Enter your message:': 'پیام خود را وارد کنید:',
        'Return to Chat': 'بازگشت به چت',
        'Hello, the supporter will be online in a few moments. please await.': 'با عرض سلام، پشتیبان تا لحظاتی دیگر آنلاین خواهد شد. لطفا صبور باشید.',
        'Reply': 'پاسخ دادن',
        'Copy': 'کپی کردن',
        'Edit': 'ویرایش کردن',
        'Remove': 'حذف کردن',
        'reply': 'پاسخ دادن',
        'more': 'بیشتر',
        "Firstname must be more than 2 characters.": "تعداد کاراکترهای نام باید بیشتر از ۲ کاراکتر باشد.",
        "Lastname must be more than 2 characters.": "تعداد کاراکترهای نام‌خانوادگی باید بیشتر از ۲ کاراکتر باشد.",
        "The entered pattern is not valid.": "الگوی وارد شده صحیح نیست.",
    },
    en: {
        'online': 'online',
        'last seen recently': 'last seen recently',
        'You': 'You',
        'edited': 'edited',
        'Supporter': 'Supporter',
        'This message has been deleted.': 'This message has been deleted.',
        'Play again': 'Play again',
        'Computer': 'Computer',
        'For better support and guidance, please enter your details correctly.': 'For better support and guidance, please enter your details correctly.',
        'First Name': 'First Name',
        'Last Name': 'Last Name',
        'E-mail': 'E-mail',
        'Phone': 'Phone',
        'Send': 'Send',
        'Enter your message:': 'Enter your message:',
        'Return to Chat': 'Return to Chat',
        'Hello, the supporter will be online in a few moments. please await.': 'Hello, the supporter will be online in a few moments. please await.',
        'Reply': 'Reply',
        'Copy': 'Copy',
        'Edit': 'Edit',
        'Remove': 'Remove',
        'reply': 'reply',
        'more': 'more',
        "Firstname must be more than 2 characters.": "Firstname must be more than 2 characters.",
        "Lastname must be more than 2 characters.": "Lastname must be more than 2 characters.",
        "The entered pattern is not valid.": "The entered pattern is not valid.",
    },
    ar: {
        'online': 'متصل',
        'last seen recently': 'شوهد آخر مرة مؤخرا',
        'You': 'أنت',
        'edited': 'تم تحريره',
        'Supporter': 'مؤيد، مشجع، داعم',
        'This message has been deleted.': 'تم حذف هذه الرسالة.',
        'Play again': 'العب مرة أخرى',
        'Computer': 'حاسوب',
        'For better support and guidance, please enter your details correctly.': 'للحصول على دعم وتوجيه أفضل ، يرجى إدخال التفاصيل الخاصة بك بشكل صحيح.',
        'First Name': 'الاسم الأول',
        'Last Name': 'اسم العائلة',
        'E-mail': 'بريد إلكتروني',
        'Phone': 'هاتف',
        'Send': 'يرسل',
        'Enter your message:': 'أدخل رسالتك:',
        'Return to Chat': 'العودة إلى الدردشة',
        'Hello, the supporter will be online in a few moments. please await.': 'مرحبًا ، سيكون الداعم متصلاً بالإنترنت في غضون لحظات قليلة. من فضلك انتظر.',
        'Reply': 'رد',
        'Copy': 'ينسخ',
        'Edit': 'يحرر',
        'Remove': 'يزيل',
        "reply": "رد",
        "more": "أكثر",
        "Firstname must be more than 2 characters.": "يجب أن يكون الاسم الأول أكثر من حرفين.",
        "Lastname must be more than 2 characters.": "يجب أن يكون اسم العائلة أكثر من حرفين.",
        "The entered pattern is not valid.": "النمط الذي تم إدخاله غير صالح.",
    },
    ru: {
        'online': 'В сети',
        'last seen recently': 'последний раз видели недавно',
        'You': 'Ты',
        'edited': 'отредактировано',
        'Supporter': 'Сторонник',
        'This message has been deleted.': 'Это сообщение было удалено.',
        'Play again': 'Играть снова',
        'Computer': 'Компьютер',
        'For better support and guidance, please enter your details correctly.': 'Для лучшей поддержки и руководства, пожалуйста, введите свои данные правильно.',
        'First Name': 'Имя',
        'Last Name': 'Фамилия',
        'E-mail': 'Электронная почта',
        'Phone': 'Телефон',
        'Send': 'Отправлять',
        'Enter your message:': 'Введите ваше сообщение:',
        'Return to Chat': 'Вернуться в чат',
        'Hello, the supporter will be online in a few moments. please await.': 'Здравствуйте, сторонник будет в сети через несколько минут. Пожалуйста, подождите.',
        'Reply': 'Отвечать',
        'Copy': 'Копировать',
        'Edit': 'Редактировать',
        'Remove': 'Удалять',
        "reply": "отвечать",
        "more": "более",
        "Firstname must be more than 2 characters.": "Имя должно состоять более чем из 2 символов.",
        "Lastname must be more than 2 characters.": "Фамилия должна состоять более чем из 2 символов.",
        "The entered pattern is not valid.": "Введенный шаблон недействителен.",
    }
}

const i18n = VueI18n.createI18n({
    messages: translated_messages,
});

const vue_app = Vue.createApp({
    
    delimiters: [`[[`, `]]`],

    i18n: i18n,
    
    data() {
        return {

            // env variables
            env_dir: '',
            env_lang: '',
            env_title: '',
            env_subtitle: '',
            env_game: '',
            env_auth_fields: '',
            edit_user_msg: false,
            delete_user_msg: false,
            show_deleted_msg: false,
            is_set_env: false,

            is_open_game: false,

            user_is_logged: false,
            user_id: '',
            supporter_id: '',

            is_open_box: false,
            counter_new_msg: 0,

            message_status_is_edit: false,

            receiver_status: '',

            socket: '',
            msg_input: '',

            message_list: [],

            form_errors: {
                fname: '',
                lname: '',
                phone_email: '',
            },
        }
    },

    created() {

        this.$i18n.locale = this.get_locale();
        setTimeout(() => {
            document.getElementById('chat_locale').innerHTML = this.$i18n.locale;
        }, 50);

        this.set_setting();

        let stored_userid = JSON.parse(localStorage.getItem('chatapp_client_id'));
        if(stored_userid) {
            this.user_id = stored_userid;
            this.start_socket();
        }
    },

    methods: {
        
        get_prefix_lang_url(){
            let first_second_lang = window.location.pathname.slice(0,4);
            let langs = ['/fa/', '/en/', '/ar/', '/ru/'];

            if(langs.includes(first_second_lang))
                return first_second_lang.slice(0,3); /* return '/fa' */
            return '';
        },

        get_locale(){
            let first_second_lang = window.location.pathname.slice(0,4);
            let langs = ['/fa/', '/en/', '/ar/', '/ru/'];

            if(langs.includes(first_second_lang))
                return first_second_lang.slice(1,3); /* return 'fa' */
            return 'en';
        },

        add_emoji_toinput(emoji) {
            this.msg_input += emoji;
            this.focus_msg_input();
        },

        copy_ready_msg(content) {
            const el = document.createElement('textarea');
            el.value = content;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },

        show_menu_bar(elementID) {

            if(document.getElementById(elementID).classList.contains('d-none')) {
                document.querySelectorAll('section.chatapp .msg-menu-bar').forEach(element => {
                    element.classList.add('d-none');
                });
                document.getElementById(elementID).classList.remove('d-none');
            }
            else
                document.getElementById(elementID).classList.add('d-none');
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
                await fetch(this.get_prefix_lang_url() + '/django-chatapp/chat/setting/', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then((response) => {
                    if(response.status == 200) {

                        this.env_dir = response.data.dir;
                        this.env_lang = response.data.language;
                        this.env_title = response.data.title;
                        this.env_subtitle = response.data.subtitle;
                        this.env_game = response.data.game;
                        this.env_auth_fields = response.data.auth_fields;
                        this.edit_user_msg = response.data.edit_user_msg;
                        this.delete_user_msg = response.data.delete_user_msg;
                        this.show_deleted_msg = response.data.show_deleted_msg;
                        this.is_set_env = true;

                        let language = this.get_prefix_lang_url();
                        
                        // setting for direction
                        if(this.env_dir == 'ltr') {
                            document.querySelector('section.chatapp').classList.add('chatapp__ltr')
                        } else if(this.env_dir == 'rtl') {
                            document.querySelector('section.chatapp').classList.remove('chatapp__ltr')
                        } else if(this.env_dir == 'auto') {
                            if(language == '/fa' || language == '/ar')
                                document.querySelector('section.chatapp').classList.remove('chatapp__ltr')
                            else
                                document.querySelector('section.chatapp').classList.add('chatapp__ltr')
                        }

                        // setting for language
                        let languages_list = ['en', 'fa', 'ar', 'ru'];
                        if(languages_list.includes(this.env_lang)){
                            this.$i18n.locale = this.env_lang;
                        }
                        else if(this.env_lang == 'auto') {
                            this.$i18n.locale = this.get_locale();
                        }

                        // setting for title and subtitle
                        document.querySelector('section.chatapp .chatapp__msg .header__info div span:nth-child(1)').innerText = this.env_title;
                        document.querySelector('section.chatapp .chatapp__msg .header__info div span:nth-child(2)').innerText = this.env_subtitle;

                        // setting for game
                        if(!this.env_game)
                            document.querySelector('section.chatapp .body__inputs .show_game').classList.add('d-none');

                        // setting for email or phone
                        if(this.env_auth_fields == 'email')
                            document.querySelector('section.chatapp .chatapp_control_email').classList.remove('d-none');
                        else if(this.env_auth_fields == 'phone')
                            document.querySelector('section.chatapp .chatapp_control_phone').classList.remove('d-none');

                    } else if(response.status == 401) {
                        localStorage.removeItem('chatapp_client_id');
                    }
                })
                .catch(err => {
                    console.log('ERR: ', err);
                });
            })();
        },

        go_to_bottom_of_box() {
            document.querySelector('section.chatapp .msg__body .body__wrapper').scrollIntoView({ behavior: "smooth", block: "end"});
        },

        goback_chat_btn() {
            this.is_open_game = false;
            // document.querySelector('section.chatapp .btn_last_msg').classList.remove('d-none');
            document.querySelector('section.chatapp .msg__body .body__wrapper .all__msg__wrapper').classList.remove('d-none');
            document.querySelector('section.chatapp .msg__body .body__wrapper .tictoctoe__game').classList.add('d-none');
            document.querySelector('section.chatapp .chatapp__msg .body__inputs form').classList.remove('d-none');
            document.querySelector('section.chatapp .chatapp__msg .body__inputs .goback_chat_btn').classList.add('d-none');

            this.go_to_bottom_of_box();

            if(this.counter_new_msg >= 1){

                this.counter_new_msg = 0;
                
                // read all message signal
                this.socket.send(JSON.stringify({
                    '_type_request': 'seen',
                    'message_id': 'all-msg',
                    'message_sender': 'supporter',
                    'client_id': 'supporter',
                }));
            }
            
            setTimeout(() => {
                document.querySelector('section.chatapp .body__inputs #text-chatinput').focus();
            }, 600);
        },

        show_game_btn() {
            this.is_open_game = true;
            // document.querySelector('section.chatapp .btn_last_msg').classList.add('d-none');
            document.querySelector('section.chatapp .msg__body .body__wrapper .all__msg__wrapper').classList.add('d-none');
            document.querySelector('section.chatapp .msg__body .body__wrapper .tictoctoe__game').classList.remove('d-none');
            document.querySelector('section.chatapp .chatapp__msg .body__inputs form').classList.add('d-none');
            document.querySelector('section.chatapp .chatapp__msg .body__inputs .goback_chat_btn').classList.remove('d-none');
        },

        show_emojibar() {
            if(document.querySelector('section.chatapp .emoji_wrapper').classList.contains('d-none')){
                document.querySelector('section.chatapp .emoji_wrapper').classList.remove('d-none');
            }else {
                document.querySelector('section.chatapp .emoji_wrapper').classList.add('d-none');
            }
        },

        open_close_box() {

            if(document.querySelector('section.chatapp .chatapp__msg').classList.contains('d-none')) {

                this.is_open_box = true;
                this.counter_new_msg = 0;
                this.focus_msg_input();

                if(!document.querySelector('section.chatapp .tictoctoe__game').classList.contains('d-none'))
                    this.goback_chat_btn();

                document.querySelector('section.chatapp .chatapp__msg').classList.remove('d-none');
                setTimeout(() => {
                    document.querySelector('section.chatapp .chatapp__msg').classList.remove('chatapp__hide');
                    document.querySelector('section.chatapp .chatapp__msg').classList.add('chatapp__show');
                }, 100);

                /* + search for localstorage */
                let stored_userid = JSON.parse(localStorage.getItem('chatapp_client_id'));
                
                if (stored_userid) {
                    
                    let formdata = new FormData();
                    formdata.append('user_id', stored_userid);
                    
                    (async () => {
                        await fetch(this.get_prefix_lang_url() + '/django-chatapp/auth/check/userid/', {
                            method: "POST",
                            body: new URLSearchParams(formdata),
                            headers: {
                                "Content-type": "application/x-www-form-urlencoded"
                            }
                        })
                        .then(response => response.json())
                        .then((response) => {
                            if(response.status == 200) {

                                // document.getElementById('close__msgbox').classList.remove('d-none');
                                // document.getElementById('loader_spinner').classList.add('d-none');
                                
                                this.message_list = response.data;
                                this.user_is_logged = true;
                                this.user_id = stored_userid;

                                document.querySelector('section.chatapp .all__msg__wrapper').classList.remove('d-none');
                                document.querySelector('section.chatapp .body__inputs form').classList.remove('d-none');

                                setTimeout(()=> {
                                    this.go_to_bottom_of_box();
                                }, 500);

                            } else if(response.status == 401) {
                                localStorage.removeItem('chatapp_client_id');
                            }
                        })
                        .catch(err => {
                            console.log('ERR: ', err);
                        });
                    })();

                    setTimeout(() => {
                        let mythis = this;

                        // send online status
                        this.socket.send(JSON.stringify({
                            '_type_request': 'status',
                            'status': 'online',
                            'user_id': mythis.user_id,
                        }));

                        // read all message signal
                        this.socket.send(JSON.stringify({
                            '_type_request': 'seen',
                            'message_id': 'all-msg',
                            'message_sender': 'supporter',
                            'client_id': 'supporter',
                        }));

                    }, 1500);
                }
                else {
                    document.querySelector('section.chatapp .chatapp__form').classList.remove('d-none');
                    setTimeout(() => {
                        document.querySelector('section.chatapp .chatapp__form input#chatapp__fname').focus();
                    }, 200);
                    // document.querySelector('section.chatapp .btn_last_msg').classList.add('d-none');
                }
                /* - search for localstorage */

                this.go_to_bottom_of_box();

            } 
            else {
                this.is_open_box = false;
                document.querySelector('section.chatapp .chatapp__msg').classList.remove('chatapp__show');
                document.querySelector('section.chatapp .chatapp__msg').classList.add('chatapp__hide');
                setTimeout(() => {
                    document.querySelector('section.chatapp .chatapp__msg').classList.add('d-none');
                }, 120);

                if(this.socket) {
                    let mythis = this;

                    // send offline status
                    this.socket.send(JSON.stringify({
                        '_type_request': 'status',
                        'status': 'offline',
                        'user_id': mythis.user_id,
                    }));

                }
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
                'client_id': mythis.user_id,
                'owner_id': '',
                'id': msgId,
            }));    

            this.message_list.forEach(element => {
                if(element.id == msgId) 
                    element.is_deleted = true;
                if(element.reply_id == msgId)
                    element.reply_is_deleted = true;
            });
        },
        
        reply_msg(elementId, msgId) {
            this.focus_msg_input();
            let msgbox = document.getElementById(elementId);
            let reply_writer = '';
            let reply_id = msgId;
            let reply_content = document.querySelector(`section.chatapp #${elementId} .msg__content`).innerText;

            if(msgbox.classList.contains('msg__right'))
                reply_writer = this.$t('You');
            else
                reply_writer = this.$t('Supporter');

            document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper').classList.remove('d-none');
            document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__writer').innerText = reply_writer;
            document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__content').innerText = reply_content;
            document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__reply_id').innerText = reply_id;
        },
        
        close_replybar() {
            this.message_status_is_edit = false;
            document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper').classList.add('d-none');
            document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__writer').innerText = '';
            document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__content').innerText = '';
            document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__reply_id').innerText = '';
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
    
        chatapp_submitform() {

            this.form_errors = {
                fname: '',
                lname: '',
                phone_email: '',
            }

            let fname = document.getElementById('chatapp__fname');
            let lname = document.getElementById('chatapp__lname');
            let email_phone;
            if (this.is_set_env && this.env_auth_fields == 'email')
                email_phone = document.getElementById('chatapp__email');
            else if (this.is_set_env && this.env_auth_fields == 'phone')
                email_phone = document.getElementById('chatapp__phone');

            const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const phone_regex = /^\d{11,12}$/i;
            let formdata;
            
            if(fname.value.length <= 2){
                this.form_errors.fname = this.$t('Firstname must be more than 2 characters.');
                return;
            }
            if(lname.value.length <= 2){
                this.form_errors.lname = this.$t('Lastname must be more than 2 characters.');
                return;
            }
            
            if(email_phone.value.match(email_regex)) {
                formdata = new FormData();
                formdata.append('fname', fname.value);
                formdata.append('lname', lname.value);
                formdata.append('email', email_phone.value);
                
            } else if(email_phone.value.match(phone_regex)) {
                formdata = new FormData();
                formdata.append('fname', fname.value);
                formdata.append('lname', lname.value);
                formdata.append('phone', email_phone.value);
            }
            else {
                this.form_errors.phone_email = this.$t('The entered pattern is not valid.');
                return;
            }

            (async () => {
                await fetch(this.get_prefix_lang_url() + '/django-chatapp/auth/create/userid/', {
                    method: "POST",
                    body: new URLSearchParams(formdata),
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response => response.json())
                .then( (response) => {
                    if(response.status == 200) {

                        this.user_id = response.data;
                        localStorage.setItem(
                            'chatapp_client_id', JSON.stringify(this.user_id)
                        );
                        this.start_socket();
                        
                        document.querySelector('section.chatapp .chatapp__form').classList.add('d-none');
                        // document.querySelector('section.chatapp .btn_last_msg').classList.remove('d-none');
                        document.querySelector('section.chatapp .all__msg__wrapper').classList.remove('d-none');
                        document.querySelector('section.chatapp .body__inputs form').classList.remove('d-none');
                        setTimeout(()=> {
                            this.focus_msg_input();
                        }, 500);
                    }
                })
                .catch(err => {
                    console.log('ERR', err);
                });
            })();
        },

        start_socket() {

            let username = this.user_id;

            this.socket = new WebSocket( 'ws://' + window.location.host + '/ws/client/chat/' + username + '/');
            
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

                else if(message._type_request == 'set_supporter_for_client') {  /* just set supporter for client */
                    mythis.supporter_id = message.supporter_id;
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

                else if(message._type_request == 'status') {
                    mythis.receiver_status = message.status;
                }

                else if (message._type_request == 'send'){
                    mythis.message_list.push(message);

                    if(!mythis.is_open_box || mythis.is_open_game)
                        mythis.counter_new_msg += 1;

                    if(mythis.is_open_box && !mythis.is_open_game){

                        // read all message signal
                        mythis.socket.send(JSON.stringify({
                            '_type_request': 'seen',
                            'message_id': 'all-msg',
                            'message_sender': 'supporter',
                            'client_id': 'supporter',
                        }));
                        mythis.counter_new_msg = 0;
                    }
                }

                else if(message._type_request == 'seen'){
                    mythis.message_list.forEach(element => {
                        element.is_seen = true;
                    });
                }

                if(!mythis.is_open_game) {
                    setTimeout(()=> {
                        mythis.go_to_bottom_of_box();
                    }, 200);
                }

            };

            this.socket.onclose = function(e) {
                console.error('Socket closed unexpectedly');
            };
        },
        
        sned_msg_socket(e) {

            if(!this.msg_input)
                return;

            if(!document.querySelector('section.chatapp .emoji_wrapper').classList.contains('d-none'))
                document.querySelector('section.chatapp .emoji_wrapper').classList.add('d-none');
                
            if(this.message_status_is_edit) { /* just edit message */

                let content = document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__content').innerText;
                let reply_id = document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__reply_id').innerText;
                let mythis = this;
                this.socket.send(JSON.stringify({
                    '_type_request': 'edit',
                    'client_id': mythis.user_id,
                    'owner_id': '',
                    'owner_name': '',
                    'id': 0,
                    'sender_type': 'client', 
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

            if(document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper').classList.contains('d-none')) {
                let mythis = this;

                this.socket.send(JSON.stringify({
                    '_type_request': 'send',
                    'owner_id': mythis.user_id,
                    'owner_name': '',
                    'id': 0,
                    'sender_type': 'client', 
                    'reply_id': '',
                    'reply_title': '', 
                    'reply_msg': '', 
                    'is_seen': 0,
                    'created': '',
                    'supporter_uid': mythis.supporter_id,
                    'text': mythis.msg_input
                }));    

                // play send sound
                this.play_send_sound();

                setTimeout(()=> {
                    this.go_to_bottom_of_box();
                }, 500);

            } else {
                let writer = document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__writer').innerText;
                let content = document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__content').innerText;
                let reply_id = document.querySelector('section.chatapp .body__inputs .reply_msg_wrapper .reply__reply_id').innerText;
                let mythis = this;
                this.socket.send(JSON.stringify({
                    '_type_request': 'send',
                    'owner_id': mythis.user_id,
                    'owner_name': '',
                    'id': 0,
                    'sender_type': 'client', 
                    'reply_id': reply_id,
                    'reply_title': '', 
                    'reply_msg': content, 
                    'is_seen': 0,
                    'created': '',
                    'supporter_uid': mythis.supporter_id,
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
        }
    }
});

vue_app.use(i18n);
vue_app.mount('#chatapp');


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
document.querySelectorAll('section.chatapp .btn_game').forEach((btn) => {

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

set_message_game = (index) => {

    let lang = document.getElementById('chat_locale').innerHTML;

    if(lang == 'fa'){
        let msg_arr = [
            'شما برنده شدید!', 
            'کامپیوتر برنده شد!',
            'شما',
            'کامپیوتر',
        ]
        return msg_arr[index];
    }
    else if(lang == 'en'){
        let msg_arr = [
            'You are Winner!',
            'Computer is Winner!',
            'You',
            'Computer',
        ]
        return msg_arr[index];
    }
    else if(lang == 'ar'){
        let msg_arr = [
            'فزت!',
            'فاز الكمبيوتر!',
            'أنت',
            'حاسوب',
        ]
        return msg_arr[index];
    }
    else if(lang == 'ru'){
        let msg_arr = [
            'ты победил!',
            'Компьютер победил!',
            'Ты',
            'Компьютер',
        ]
        return msg_arr[index];
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
        alertDiv.innerHTML = set_message_game(0);
        alertDiv.classList.add('game_alert_msg_win');
        final = true;
    }
    document.getElementById('score__game').innerHTML = `<div><span>${set_message_game(2)}:</span><span>${human_score}</span></div><div><span>${set_message_game(3)}:</span><span>${computer_score}</span></div>`;

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
        alertDiv.innerHTML = set_message_game(1);
        alertDiv.classList.add('game_alert_msg_lose');
        final = true;
    }
    document.getElementById('score__game').innerHTML = `<div><span>${set_message_game(2)}:</span><span>${human_score}</span></div><div><span>${set_message_game(3)}:</span><span>${computer_score}</span></div>`;

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
    document.getElementById('score__game').innerHTML = `<div><span>${set_message_game(2)}:</span><span>${human_score}</span></div><div><span>${set_message_game(3)}:</span><span>${computer_score}</span></div>`;
    reset_game();
});

