
/* P.E.A.K.A. */

function rand(min , max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// persian digit
$(document).ready(function(){
    $('.digit').persiaNumber();
});

function showPW() {

    var x = document.getElementById("pwLOGIN");
    var y = document.getElementById('eye');
    var yy = document.getElementById('eye2');

    if (x.type === "password") {
    x.type = "text";
    y.classList.remove('fa-eye');
    y.classList.add('fa-eye-slash');
    yy.classList.remove('fa-eye');
    yy.classList.add('fa-eye-slash');

    } else {
    x.type = "password";
    y.classList.add('fa-eye');
    y.classList.remove('fa-eye-slash');
    yy.classList.add('fa-eye');
    yy.classList.remove('fa-eye-slash');
    }
}

clockDefner = () =>{

    var m;
    var a = new Date();
    var b = a.getHours();
    var c = a.getMinutes();
    var d = a.getSeconds();

    if(b >= 0 && b <= 6){

        m = "خواب خوبی داشته باشید😵";
        document.getElementById('goodsayer').innerHTML = m;
    }
    else if(b > 6 && b <= 9){

        m = "صبح بخیر😉";
        document.getElementById('goodsayer').innerHTML = m;
    }
    else if(b > 9 && b <= 16){

        m = "روز خوبی داشته باشید😘";
        document.getElementById('goodsayer').innerHTML = m;
    }
    else if(b > 16 && b <= 20){

        m = "عصر خوبی داشته باشید💘";
        document.getElementById('goodsayer').innerHTML = m;
    }
    else if(b > 20 && b < 24){

        m = "شب خوبی داشته باشید✨";
        document.getElementById('goodsayer').innerHTML = m;
    }

    document.getElementById('clock').innerHTML = "<span style='font-weight:bolder;'>" + d + "</span>" + "<span style='font-weight:bolder; color :red;'> : </span>" + "<span style='font-weight:bolder;'>" + c + "</span>" + "<span style='font-weight:bolder; color :red;'> : </span>" + "<span style='font-weight:bolder;'>" + b + "</span>";

}
// document.getElementById('clock').innerHTML = setInterval("clockDefner()" , 1000);  


// scroll events
// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//     var currentScrollPos = window.pageYOffset;
//     if (currentScrollPos < 100) {
//         document.getElementById("a").style.display = "none";
//     } else {
//         document.getElementById("a").style.display = "block";
//     }
// }
