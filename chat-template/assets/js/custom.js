
/* DJANGO CHAT APP package */
/* v1.0.0 */

document.querySelector('section.chatapp .chatapp__btn').addEventListener(
    'click', () => open_close_box()
);
document.querySelector('section.chatapp .header__options button.close__msgbox').addEventListener(
    'click', () => open_close_box()
);
document.querySelector('section.chatapp .header__options button.bottom__msgbox').addEventListener(
    'click', () => go_to_bottom_of_box()
);

go_to_bottom_of_box = () => {
    document.querySelector('.msg__body .body__wrapper').scrollIntoView({ behavior: "smooth", block: "end"});
}

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
        go_to_bottom_of_box();
    } else {
        document.querySelector('section.chatapp .chatapp__msg').classList.remove('chatapp__show');
        document.querySelector('section.chatapp .chatapp__msg').classList.add('chatapp__hide');
        setTimeout(() => {
            document.querySelector('section.chatapp .chatapp__msg').classList.add('d-none');
        }, 120);
    }
}

/* Tic-Toc-Toe Game */
// Computer X .:. Human O

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
    if(human_score == 10) {
        alertDiv.classList.remove('d-none');
        alertDiv.innerHTML = 'شما برنده شدید!';
        alertDiv.classList.add('game_alert_msg_win');
        final = true;
    }
    document.getElementById('score__game').innerHTML = `<div><span>شما:</span><span>${human_score}</span></div><div><span>کامپیوتر:</span><span>${computer_score}</span></div>`;

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
    if(computer_score == 10) {   
        alertDiv.classList.remove('d-none');
        alertDiv.innerHTML = 'کامپیوتر برنده شد!';
        alertDiv.classList.add('game_alert_msg_lose');
        final = true;
    }
    document.getElementById('score__game').innerHTML = `<div><span>شما:</span><span>${human_score}</span></div><div><span>کامپیوتر:</span><span>${computer_score}</span></div>`;

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
    document.getElementById('score__game').innerHTML = `<div><span>شما:</span><span>${human_score}</span></div><div><span>کامپیوتر:</span><span>${computer_score}</span></div>`;
    reset_game();
});
