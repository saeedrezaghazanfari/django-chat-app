
/* DJANGO CHAT APP package */
/* v1.0.0 */

document.querySelector('.btn_last_msg button').addEventListener(
    'click', () => go_to_bottom_of_box()
);

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
        writer = 'شما';
    else
        writer = 'پشتیبان';

    document.querySelector('.body__inputs .reply_msg_wrapper').classList.remove('d-none');
    document.querySelector('.body__inputs .reply_msg_wrapper .reply__writer').innerText = writer;
    document.querySelector('.body__inputs .reply_msg_wrapper .reply__content').innerText = content;
}

// close the reply bar
document.querySelector('.close_replybar').addEventListener(
    'click', () => {
        document.querySelector('.body__inputs .reply_msg_wrapper').classList.add('d-none');
        document.querySelector('.body__inputs .reply_msg_wrapper .reply__writer').innerText = '';
        document.querySelector('.body__inputs .reply_msg_wrapper .reply__content').innerText = '';
    }
)

// close the sidebar
document.querySelector('.nav .nav__header button').addEventListener('click', () => {
    document.querySelector('.nav').style.transform = 'translateX(500px)';
    setTimeout(()=>{
        document.querySelector('.nav').style.display = 'none';
    }, 200)
});

// open the sidebar
document.querySelector('.open_navbar button').addEventListener('click', () => {
    document.querySelector('.nav').style.display = 'block';
    setTimeout(()=>{
        document.querySelector('.nav').style.transform = 'translateX(0px)';
    }, 1)
});

// open or close add ready msg box
document.querySelector('button.openclose_addreadymsg').addEventListener('click', () => {
    if(document.querySelector('.addbox_section').classList.contains('d-none')) {
        document.querySelector('.copybox_section').classList.add('d-none');
        document.querySelector('.addbox_section').classList.remove('d-none');
    } else {
        document.querySelector('.copybox_section').classList.add('d-none');
        document.querySelector('.addbox_section').classList.add('d-none');
    }
});

// open or close copy ready msg box
document.querySelector('button.openclose_copyreadymsg').addEventListener('click', () => {
    if(document.querySelector('.copybox_section').classList.contains('d-none')) {
        document.querySelector('.addbox_section').classList.add('d-none');
        document.querySelector('.copybox_section').classList.remove('d-none');
    }else {
        document.querySelector('.addbox_section').classList.add('d-none');
        document.querySelector('.copybox_section').classList.add('d-none');
    }
});

document.querySelectorAll('.wrapper_close_btn button.close_box').forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector('.addbox_section').classList.add('d-none');
        document.querySelector('.copybox_section').classList.add('d-none');
    });
});
document.querySelector('.wrapper_close_btn button.goto_add_box').addEventListener('click', () => {
    document.querySelector('.copybox_section').classList.add('d-none');
    document.querySelector('.addbox_section').classList.remove('d-none');
});

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
