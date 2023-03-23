
/* DJANGO CHAT APP - supporter.js */

document.getElementById('chatapp').addEventListener('click', (ev)=> {
    if(!ev.target.closest('span.toggle_mneubar')){
        document.querySelectorAll('.chatapp ul.msg-menu-bar').forEach(element => {
            if(!element.classList.contains('d-none'))
                element.classList.add('d-none');
        });
    }
});

const translated_messages = {
    fa: {
        "WelCome to Supporter Panel": "به پنل پشتیبان خوش آمدید",
        "Home": "خانه",
        'edited': 'ویرایش شده',
        "Your unread Messages": "پیام‌های ناخوانده‌ی شما",
        "Other unread Messages": "سایر پیام‌های خوانده نشده",
        "All Users": "همه‌ی کاربران",
        "Enter your message:": "پیام خود را وارد کنید:",
        "Register a Ready Message": "ثبت پیام آماده",
        "Subject": "عنوان",
        "Content": "محتوا",
        "Save": "ثبت",
        "last seen recently": "آخرین بازدید اخیرا",
        "Reply": "پاسخ دادن",
        "Copy": "کپی کردن",
        "reply": "پاسخ دادن",
        "more": "بیشتر",
        "Edit": "ویرایش کردن",
        "Remove": "حذف کردن",
        "Send": "ارسال",
        "Report Content": "محتوای گذارش",
        "Using inappropriate words": "استفاده از کلمات نامناسب",
        "Others": "دلایل دیگر",
        "online": "آنلاین",
        "You": "شما",
        "Client": "کاربر",
        "This message has been deleted.": "این پیام حذف شده است.",
        "Your message has been saved successfully. You can use this message when chatting with users.": "پیام شما با موفقیت ذخیره شد. شما میتوانید هنگام چت با کاربران از این پیام استفاده کنید.",
        "Subject must be more than 4 characters.": "عنوان باید بیشتر از ۴ کاراکتر باشد.",
        "Content must be more than 4 characters.": "متن  باید بیشتر از ۴ کاراکتر باشد.",
        "There are no ready messages.": "هیچ پیام آماده‌ای وجود ندارد.",
        "User successfully reported.": "کاربر با موفقیت گزارش شد",
        "There are no unread messages for you": "پیام ناخوانده‌ای برای شما وجود ندارد",
        "There are no unread messages": "پیام ناخوانده‌ای وجود ندارد",
        "There are no Users": "هیچ کاربری وجود ندارد",
    },
    en: {
        "WelCome to Supporter Panel": "WelCome to Supporter Panel",
        "Home": "Home",
        'edited': 'edited',
        "Your unread Messages": "Your unread Messages",
        "Other unread Messages": "Other unread Messages",
        "All Users": "All Users",
        "Enter your message:": "Enter your message:",
        "Register a Ready Message": "Register a Ready Message",
        "Subject": "Subject",
        "Content": "Content",
        "Save": "Save",
        "last seen recently": "last seen recently",
        "Reply": "Reply",
        "Copy": "Copy",
        "reply": "reply",
        "more": "more",
        "Edit": "Edit",
        "Remove": "Remove",
        "Send": "Send",
        "Report Content": "Report Content",
        "Using inappropriate words": "Using inappropriate words",
        "Others": "Others",
        "online": "online",
        "You": "You",
        "Client": "Client",
        "This message has been deleted.": "This message has been deleted.",
        "Your message has been saved successfully. You can use this message when chatting with users.": "Your message has been saved successfully. You can use this message when chatting with users.",
        "Subject must be more than 4 characters.": "Subject must be more than 4 characters.",
        "Content must be more than 4 characters.": "Content must be more than 4 characters.",
        "There are no ready messages.": "There are no ready messages.",
        "User successfully reported.": "User successfully reported.",
        "There are no unread messages for you": "There are no unread messages for you",
        "There are no unread messages": "There are no unread messages",
        "There are no Users": "There are no Users",
    },
    ar: {
        "WelCome to Supporter Panel": "مرحبا بكم في لوحة الداعمين",
        "Home": "بيت",
        'edited': 'تم تحريره',
        "Your unread Messages": "رسائلك غير المقروءة",
        "Other unread Messages": "رسائل أخرى غير مقروءة",
        "All Users": "جميع المستخدمين",
        "Enter your message:": "أدخل رسالتك:",
        "Register a Ready Message": "سجل رسالة جاهزة",
        "Subject": "موضوع",
        "Content": "محتوى",
        "Save": "يحفظ",
        "last seen recently": "شوهد آخر مرة مؤخرا",
        "Reply": "رد",
        "Copy": "ينسخ",
        "reply": "رد",
        "more": "أكثر",
        "Edit": "يحرر",
        "Remove": "يزيل",
        "Send": "يرسل",
        "Report Content": "محتوى التقرير",
        "Using inappropriate words": "استخدام كلمات غير لائقة",
        "Others": "آحرون",
        "online": "متصل",
        "You": "أنت",
        "Client": "عميل",
        "This message has been deleted.": "تم حذف هذه الرسالة.",
        "Your message has been saved successfully. You can use this message when chatting with users.": "تم حفظ رسالتك بنجاح. يمكنك استخدام هذه الرسالة عند الدردشة مع المستخدمين.",
        "Subject must be more than 4 characters.": "يجب أن يكون الموضوع أكثر من 4 أحرف.",
        "Content must be more than 4 characters.": "يجب أن يكون المحتوى أكثر من 4 أحرف.",
        "There are no ready messages.": "لا توجد رسائل معدة.",
        "User successfully reported.": "أبلغ المستخدم بنجاح.",
        "There are no unread messages for you": "لا توجد رسائل غير مقروءة لك",
        "There are no unread messages": "لا توجد رسائل غير مقروءة",
        "There are no Users": "لا يوجد مستخدمون",
    },
    ru: {
        "WelCome to Supporter Panel": "Добро пожаловать в панель поддержки",
        "Home": "Дом",
        'edited': 'отредактировано',
        "Your unread Messages": "Ваши непрочитанные сообщения",
        "Other unread Messages": "Другие непрочитанные сообщения",
        "All Users": "Все пользователи",
        "Enter your message:": "Введите ваше сообщение:",
        "Register a Ready Message": "Зарегистрируйте готовое сообщение",
        "Subject": "Предмет",
        "Content": "Содержание",
        "Save": "Сохранять",
        "last seen recently": "последний раз видели недавно",
        "Reply": "Отвечать",
        "Copy": "Копировать",
        "reply": "отвечать",
        "more": "более",
        "Edit": "Редактировать",
        "Remove": "Удалять",
        "Send": "Отправлять",
        "Report Content": "Содержание отчета",
        "Using inappropriate words": "Использование неподходящих слов",
        "Others": "Другие",
        "online": "В сети",
        "You": "Ты",
        "Client": "Клиент",
        "This message has been deleted.": "Это сообщение было удалено.",
        "Your message has been saved successfully. You can use this message when chatting with users.": "Ваше сообщение было успешно сохранено. Вы можете использовать это сообщение при общении с пользователями.",
        "Subject must be more than 4 characters.": "Тема должна состоять более чем из 4 символов.",
        "Content must be more than 4 characters.": "Содержание должно быть более 4 символов.",
        "There are no ready messages.": "Нет готовых сообщений.",
        "User successfully reported.": "Пользователь успешно сообщил",
        "There are no unread messages for you": "Для вас нет непрочитанных сообщений",
        "There are no unread messages": "Непрочитанных сообщений нет",
        "There are no Users": "Нет пользователей",
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
            this_supporter_counter_tab: 0,
            no_supoorter_counter_tab: 0,

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
        this.$root.$i18n.locale = this.get_locale();
        this.set_setting();
    },

    watch: {

        unreads_thissupporter(newval, oldval) {
            this.get_tab_counter('this_sup', newval);
        },

        unreads_nosupoorter(newval, oldval) {
            this.get_tab_counter('no_sup', newval);
        },

    },

    mounted() {
        this.supporter_uid = document.getElementById('supporter_uid').innerText;
        this.get_board_msgs();
        this.start_socket();
    },

    methods: {

        clear_chat_objects_thissupporter() {

            this.unreads_thissupporter.forEach((item, index, object) => {
                if(item.owner_id == this.client_id)
                    object.splice(index, 1)
            })
            for(let i=0 ; i <= this.unreads_thissupporter_pre.length; i++) {
                this.unreads_thissupporter_pre.forEach((item, index, object) => {
                    if(item.owner_id == this.client_id)
                        object.splice(index, 1)
                })
            }
        },

        clear_chat_objects_nosupporter() {
            
            this.unreads_nosupoorter.forEach((item, index, object) => {
                if(item.owner_id == this.client_id)
                    object.splice(index, 1)
            })
            for(let i=0 ; i <= this.unreads_nosupoorter_pre.length; i++) {
                this.unreads_nosupoorter_pre.forEach((item, index, object) => {
                    if(item.owner_id == this.client_id)
                        object.splice(index, 1)
                })
            }
        },

        get_tab_counter(counter_type, newval) {

            let msg_counter = 0;

            if(counter_type == 'this_sup') {

                newval.forEach((el) => {
                    if(el.owner_id == this.client_id) {
                        this.this_supporter_counter_tab = 0;
                        return;
                    }
                    else
                        msg_counter += el.counter;
                });
                this.this_supporter_counter_tab = msg_counter;
            }

            else if(counter_type == 'no_sup') {

                newval.forEach((el) => {
                    if(el.owner_id == this.client_id){
                        this.no_supoorter_counter_tab = 0;
                        return;
                    }
                    msg_counter += el.counter;
                });
                this.no_supoorter_counter_tab = msg_counter;
            }
        },

        change_lang(lang) {
            let have_lang = this.get_prefix_lang_url();
            
            if(have_lang.length > 1)
                window.location.href = '/' + lang + window.location.pathname.slice(3) || '';
            
            else {
                this.$root.$i18n.locale = lang;
            }
        },
        
        get_prefix_lang_url(){
            let first_second_lang = window.location.pathname.slice(0,4);
            let langs = ['/fa/', '/en/', '/ar/', '/ru/'];

            if(langs.includes(first_second_lang))
                return first_second_lang.slice(0,3);  /* return '/fa' */
            return '';
        },

        get_locale(){
            let first_second_lang = window.location.pathname.slice(0,4);
            let langs = ['/fa/', '/en/', '/ar/', '/ru/'];

            if(langs.includes(first_second_lang))
                return first_second_lang.slice(1,3);  /* return 'fa' */
            return 'en';
        },

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
                        this.edit_user_msg = response.data.edit_supporter_msg;
                        this.delete_user_msg = response.data.delete_supporter_msg;
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
                            this.$root.$i18n.locale = this.env_lang;
                        }
                        else if(this.env_lang == 'auto') {
                            this.$root.$i18n.locale = this.get_locale();
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
                await fetch(this.get_prefix_lang_url() + '/django-chatapp/chat/supporter/unreads/', {
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
                reply_writer = this.$t('You');
            else
                reply_writer = this.$t('Client');

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
                        
                        mythis.clear_chat_objects_thissupporter();
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

                        mythis.clear_chat_objects_nosupporter();
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
                await fetch(this.get_prefix_lang_url() + '/django-chatapp/chat/supporter/read-all/', {
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

                        if(msg_type == 'thissupporter') {

                            this.unreads_thissupporter[index_item].counter = 0;
                            
                            this.clear_chat_objects_thissupporter();

                            this.get_tab_counter('this_sup', this.unreads_thissupporter);
                        }
                        else if(msg_type == 'nosupoorter'){

                            this.unreads_nosupoorter[index_item].counter = 0;

                            this.clear_chat_objects_nosupporter();

                            this.get_tab_counter('no_sup', this.unreads_nosupoorter);

                            // send supporterID to client
                            let mythis = this;
                            this.socket.send(JSON.stringify({
                                '_type_request': 'set_supporter_for_client',
                                'supporter_id': mythis.supporter_uid,
                                'client_id': mythis.client_id,
                            }));
    
                        }

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

            if(this.report_cause.length < 4){
                this.alert = this.$t('Content must be more than 4 characters.');
                setTimeout(() => {
                    this.alert = '';
                }, 3000);
                return;
            }
            
            let formdata = new FormData();
            formdata.append('supporter_uid', this.supporter_uid);
            formdata.append('client_id', this.client_id);
            formdata.append('report_cause', this.report_cause);
            formdata.append('report_item', this.report_item);

            (async () => {
                await fetch(this.get_prefix_lang_url() + '/django-chatapp/chat/supporter/report/', {
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
                            window.location.reload();
                        }

                        this.report_item = 'badterms';
                        this.report_cause = '';

                        this.open_report_box();

                        this.alert = this.$t('User successfully reported.');
                        setTimeout(() => {
                            this.alert = '';
                        }, 3000);
                        return;
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
                        await fetch(this.get_prefix_lang_url() + '/django-chatapp/chat/supporter/ready-msg/get/', {
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
                await fetch(this.get_prefix_lang_url() + '/django-chatapp/chat/supporter/ready-msg/del/', {
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

            if(this.new_readymsg_subject.length < 4){
                this.alert = this.$t('Subject must be more than 4 characters.');
                setTimeout(() => {
                    this.alert = '';
                }, 3000);
                return;
            }

            if(this.new_readymsg_content.length < 4){
                this.alert = this.$t('Content must be more than 4 characters.');
                setTimeout(() => {
                    this.alert = '';
                }, 3000);
                return;
            }

            let formdata = new FormData();
            formdata.append('supporter_uid', this.supporter_uid);
            formdata.append('subject', this.new_readymsg_subject);
            formdata.append('content', this.new_readymsg_content);

            (async () => {
                await fetch(this.get_prefix_lang_url() + '/django-chatapp/chat/supporter/ready-msg/create/', {
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
                        this.alert = this.$t('Your message has been saved successfully. You can use this message when chatting with users.');
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
});

vue_app.use(i18n);
vue_app.mount('#chatapp');
