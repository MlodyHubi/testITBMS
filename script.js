var resultElement = document.getElementById('result');
var menuList = document.getElementById("menuList");
var timerDisplay = document.getElementById('timerDisplay');
var resetButton = document.getElementById('resetButton');
var divItems = document.getElementsByClassName('item');

//menu
menuList.style.maxHeight = "0px";
function togglemenu(){
    if(menuList.style.maxHeight == "0px"){
        menuList.style.maxHeight = "130px";
    }
    else{
        menuList.style.maxHeight = "0px";
    }
}

function startTimer() {
    var startTime;
    var duration = 8 * 60 * 60 * 1000; //8h

    //sprawdzanie czy czas poczatkowy jest w pamieci lokalnej
    if (localStorage.getItem('startTime')) {
        startTime = parseInt(localStorage.getItem('startTime'));
    } else {
        //ustaw poczatkowy na aktualny
        startTime = Date.now();
        localStorage.setItem('startTime', startTime.toString());
    }

    var timerId = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        var remainingTime = duration - elapsedTime;

        if (remainingTime <= 0) {
            clearInterval(timerId);
            timerDisplay.textContent = 'Koniec czasu!';
        } else {
            var hours = Math.floor(remainingTime / (1000 * 60 * 60));
            var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            timerDisplay.textContent =hours + 'h ' + minutes + 'm ' + seconds + 's';
        }
    }, 1000); //odswiezanie co sekunde

    //reset
    resetButton.addEventListener('click', function() {
        //resetowanie czasu lokalnego
        startTime = Date.now();
        localStorage.setItem('startTime', startTime.toString());
    });
}

    //start gdy strona jest zaladowana
    window.addEventListener('DOMContentLoaded', startTimer);

//teksty
var przykladoweTeksty = [
'POS nie działa. Nie podłączyli go do prądu',
'EC chce hasła pana Wilka',
'Gość hotelowy nie potrafi się podłączyć do WIFI',
'Wywaliło STBka',
'Zgłoszenie brak papieru na szlabanach. Wystarczy poprawić papier',
'Nie działa ArlamowINFO',
'Muzyka na bar basenie nie działa. Głośnik/telefon jest wyłączony.',
'Klub nocny za gorąco',
'Pianista nie potrafi kliknąć spacji czyli włączyć muzyki podczas przerwy',
'Chwilę przed eventem nie działa projektor/głosnik',
'Ochrona zablokowała sobie konto w domenie',
'Internet nie działa. Magicznie odłączony kabel',
'Animatorzy dzwonią 5min przed eventem że trzeba coś przygotować',
'Zgłoszenie na HD o przeniesieniu POSa tego samego dnia',
'Muzyka na carpathii nie działa',
'POS nie działa. Jest podłączony po WIFI',
'Poprzestawiane porty na telefonie w pokoju hotelowym',
'Laptop nie działa. Odłączony od zasilania.',
'Kamera nie działa',
'Bar basen nie wyświetlają się reklamy. Nie włączyli ich z kanału/pendrive',
'Nie działa poczta. Wyłączony internet',
'Zanik prądu',



];


    //zbior tekstow
    var dostepneIndeksy = Array.from(Array(przykladoweTeksty.length).keys());

    //losowanie tekstu
    function losujTekst(element) {
        if (dostepneIndeksy.length === 0) {
            element.textContent = 'Brak dostępnych tekstów';
            return;
        }

        var losowyIndeks = Math.floor(Math.random() * dostepneIndeksy.length);
        var wylosowanyIndeks = dostepneIndeksy.splice(losowyIndeks, 1)[0];
        var wylosowanyTekst = przykladoweTeksty[wylosowanyIndeks];
        element.textContent = wylosowanyTekst;
        element.style.backgroundColor = "white";
    }

    //przywrocenie zapisanego stanu tekstow po otwarciu strony
    window.addEventListener('DOMContentLoaded', function() {
        Array.from(divItems).forEach(function(item) {
            losujTekst(item);
        });
    });

    //reset losowania
    resetButton.addEventListener('click', function() {
        dostepneIndeksy = Array.from(Array(przykladoweTeksty.length).keys());
        resultElement.textContent ="";
        Array.from(divItems).forEach(function(item) {
            losujTekst(item);
        });
    });
  

// function main(element){
//     var currentColor = element.style.backgroundColor;
//     element.style.backgroundColor = currentColor !== "rgb(166, 245, 189)" ? "rgb(166, 245, 189)" : "rgb(255, 255, 255)";
// }  
var rows = [];
var columns = [];
var diagonal = 0;
var antiDiagonal = 0;

function main(element) {
    var currentColor = element.style.backgroundColor;
    element.style.backgroundColor = currentColor !== "rgb(166, 245, 189)" ? "rgb(166, 245, 189)" : "rgb(255, 255, 255)";

    checkWin();
}

function checkWin() {
    rows = [];
    columns = [];
    diagonal = 0;
    antiDiagonal = 0;

    for (var i = 0; i < divItems.length; i++) {
        var row = Math.floor(i / 4);
        var column = i % 4;

    if (rows[row] === undefined) {
        rows[row] = true;
    }

    if (columns[column] === undefined) {
        columns[column] = true;
    }

    if (row === column) {
        diagonal = diagonal || (divItems[i].style.backgroundColor !== "rgb(166, 245, 189)");
    }

    if (row + column === 3) {
        antiDiagonal = antiDiagonal || (divItems[i].style.backgroundColor !== "rgb(166, 245, 189)");
    }

    if (divItems[i].style.backgroundColor !== "rgb(166, 245, 189)") {
        rows[row] = false;
        columns[column] = false;
    }
  }

    var win = rows.includes(true) || columns.includes(true) || !diagonal || !antiDiagonal;

    resultElement.textContent = win ? "Wygrałeś!" : "";
}

// Przywróć zapisany stan po otwarciu strony
window.addEventListener('DOMContentLoaded', function() {
    for (var i = 0; i < divItems.length; i++) {
        if (divItems[i].style.backgroundColor === "rgb(166, 245, 189)") {
        divItems[i].click();
        }
    }
});

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
