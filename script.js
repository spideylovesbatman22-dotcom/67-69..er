/* =======================================
   MOVIE NIGHT 🍿
   script.js — PART 1
======================================= */


/* =========================
   PAGE SYSTEM
========================= */

const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

}



/* =========================
   LOADING SCREEN
========================= */

const loadingBar = document.getElementById("loading-bar");
const loadingTitle = document.getElementById("loading-title");

let loadingProgress = 0;


const loadingTimer = setInterval(()=>{

    loadingProgress += 2;

    loadingBar.style.width = loadingProgress + "%";


    if(loadingProgress >= 100){

        clearInterval(loadingTimer);

        loadingTitle.textContent = "Found one.";


        setTimeout(()=>{

            showPage("intro");

        },1000);

    }


},40);





/* =========================
   INTRO BUTTONS
========================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");


const noMessages = [

    "Maybe not",

    "Are you sure?",

    "I already picked the movie...",

    "It has Minions.",

    "I'll buy popcorn.",

    "Last chance.",

    "..."

];


let noCount = 0;


noBtn.addEventListener("click",()=>{


    if(noCount < noMessages.length - 1){

        noCount++;

    }


    noBtn.textContent = noMessages[noCount];


    noBtn.style.transform =
    `scale(${Math.max(0.3,1 - noCount * 0.12)})`;


    yesBtn.style.transform =
    `scale(${1 + noCount * 0.05})`;


    noBtn.style.left =
    `${Math.random()*80 - 40}px`;


    noBtn.style.top =
    `${Math.random()*40 - 20}px`;

});






/* =========================
   BOOKING ANIMATION
========================= */


const bookingBar = document.getElementById("booking-bar");


yesBtn.addEventListener("click",()=>{


    showPage("booking");


    bookingBar.style.width="0%";


    let progress = 0;


    const bookingTimer = setInterval(()=>{


        progress += 2;


        bookingBar.style.width =
        progress + "%";



        if(progress >= 100){


            clearInterval(bookingTimer);


            setTimeout(()=>{

                showPage("moviePage");

            },500);


        }



    },30);



});





/* =========================
   MOVIE VARIABLES
========================= */


let selectedMovie = "Minions";

let selectedTime = "12:40 PM";

let selectedSnacks = [
    "🍿 Popcorn"
];





/* =========================
   MOVIE SELECT
========================= */


const movieCards =
document.querySelectorAll(".movie-card");


const movieNext =
document.querySelector("#moviePage .nextBtn");


const popup =
document.getElementById("popupMessage");



movieCards.forEach(card=>{


    card.addEventListener("click",()=>{


        movieCards.forEach(movie=>{

            movie.classList.remove("selected");

        });



        card.classList.add("selected");



        selectedMovie =
        card.querySelector("h3")
        .textContent
        .trim();




        if(selectedMovie === "Evil Dead Burn"){


            popup.textContent =
            "💀 please no.";


            popup.classList.add("show");



            setTimeout(()=>{

                popup.classList.remove("show");

            },2000);


        }



        if(selectedMovie === "Minions"){

            bananaRain();

        }



    });


});



movieNext.addEventListener("click",()=>{


    showPage("datePage");


});

/* =======================================
   MOVIE NIGHT 🍿
   script.js — PART 2
======================================= */


/* =========================
   DATE SELECTION
========================= */


const datePicker =
document.getElementById("datePicker");


const dateNext =
document.querySelector("#datePage .nextBtn");



dateNext.addEventListener("click",()=>{


    if(datePicker.value === ""){


        alert("Pick a date first 🍿");

        return;


    }



    showPage("timePage");


});






/* =========================
   TIME SELECTION
========================= */


const timeButtons =
document.querySelectorAll(".timeBtn");


const timeNext =
document.querySelector("#timePage .nextBtn");



timeButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        timeButtons.forEach(btn=>{

            btn.classList.remove("selected");

        });



        button.classList.add("selected");



        selectedTime =
        button.textContent.trim();



    });


});




/* Default selected time */

if(timeButtons.length){

    timeButtons[0].classList.add("selected");

}




timeNext.addEventListener("click",()=>{


    showPage("snackPage");


});







/* =========================
   SNACK SELECTION
   (MULTIPLE CHOICE)
========================= */



const snackButtons =
document.querySelectorAll(".snackBtn");



const ticketBtn =
document.getElementById("ticketBtn");




selectedSnacks = [];




snackButtons.forEach(snack=>{


    snack.addEventListener("click",()=>{


        snack.classList.toggle("selected");



        selectedSnacks = [];



        document
        .querySelectorAll(".snackBtn.selected")
        .forEach(selected=>{


            selectedSnacks.push(
                selected.textContent.trim()
            );


        });



    });



});







/* =========================
   PRINT TICKET
========================= */



ticketBtn.addEventListener("click",()=>{



    document
    .getElementById("ticketMovie")
    .textContent = selectedMovie;



    document
    .getElementById("ticketDate")
    .textContent = datePicker.value;



    document
    .getElementById("ticketTime")
    .textContent = selectedTime;




    document
    .getElementById("ticketSnack")
    .textContent =


    selectedSnacks.length > 0

    ?

    selectedSnacks.join(", ")

    :

    "No snacks";





    if(document.getElementById("printingPage")){


        showPage("printingPage");



        const printBar =
        document.getElementById("ticketPrintBar");



        let printProgress = 0;



        printBar.style.width = "0%";



        const printTimer =
        setInterval(()=>{


            printProgress += 5;



            printBar.style.width =
            printProgress + "%";



            if(printProgress >= 100){



                clearInterval(printTimer);



                setTimeout(()=>{


                    showPage("ticketPage");


                },500);



            }



        },40);



    }

    else{


        showPage("ticketPage");


    }



});








/* =========================
   BANANA RAIN 🍌
========================= */



function bananaRain(){



    const container =
    document.getElementById("bananaContainer");



    if(!container) return;



    for(let i = 0; i < 30; i++){



        const banana =
        document.createElement("div");



        banana.className = "banana";



        banana.textContent = "🍌";



        banana.style.left =
        Math.random()*100 + "vw";



        banana.style.animationDuration =
        (3 + Math.random()*2) + "s";



        banana.style.fontSize =
        (20 + Math.random()*20) + "px";



        container.appendChild(banana);




        setTimeout(()=>{


            banana.remove();


        },5000);



    }



}

/* =======================================
   MOVIE NIGHT 🍿
   script.js — PART 3
======================================= */


/* =========================
   TICKET ANIMATION
========================= */


const ticketPage =
document.getElementById("ticketPage");


const ticket =
document.querySelector(".ticket");



if(ticketPage && ticket){



    const ticketObserver =
    new MutationObserver(()=>{



        if(ticketPage.classList.contains("active")){


            ticket.style.opacity = "0";

            ticket.style.transform =
            "translateY(40px) scale(.95)";



            setTimeout(()=>{


                ticket.style.transition =
                ".6s ease";


                ticket.style.opacity = "1";


                ticket.style.transform =
                "translateY(0) scale(1)";



            },100);



        }



    });




    ticketObserver.observe(ticketPage,{

        attributes:true

    });



}







/* =========================
   ENDING PAGE
========================= */


const endingBtn =
document.getElementById("endingBtn");



if(endingBtn){


    endingBtn.addEventListener("click",()=>{


        document.body.style.transition =
        "background .8s ease";



        showPage("endingPage");



    });


}







/* =========================
   FLOATING BACKGROUND
========================= */


const background =
document.getElementById("background");



if(background){


    setInterval(()=>{


        background.animate(


            [

                {
                    transform:"translateY(0px)"
                },

                {
                    transform:"translateY(-8px)"
                },

                {
                    transform:"translateY(0px)"
                }


            ],


            {

                duration:5000,

                iterations:1

            }



        );



    },5000);



}







/* =========================
   ENTER KEY SHORTCUT
========================= */


document.addEventListener("keydown",(event)=>{


    if(event.key === "Enter"){



        const activePage =
        document.querySelector(".page.active");



        if(!activePage) return;




        const button =
        activePage.querySelector(
        ".nextBtn, #ticketBtn, #endingBtn"
        );



        if(button){

            button.click();

        }



    }



});







/* =========================
   PREVENT PAST DATES
========================= */


if(datePicker){


    const today =
    new Date()
    .toISOString()
    .split("T")[0];



    datePicker.min = today;



}







/* =========================
   PAGE FADE IN
========================= */


window.addEventListener("load",()=>{


    document.body.style.opacity = "0";



    setTimeout(()=>{


        document.body.style.transition =
        ".6s ease";



        document.body.style.opacity = "1";



    },100);



});







/* =========================
   CONSOLE MESSAGE
========================= */


console.log(

`
🍿 MOVIE NIGHT

Made with too much effort.

Hope she says yes. ❤️

`

);