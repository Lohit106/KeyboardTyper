    //Random quotes api
const quoteApiUrl = "https://api.quotable.io/random?minLength=100&maxLength=150";
const dark = document.getElementById("dark");
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
const reload = document.getElementById("reload");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;



//Fetch random quote
const renderNewQuote = async () => {
    //Fetch content from quote api url
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;

    //Array of chars in quote
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    });
    quoteSection.innerHTML += arr.join("");
};

//Logic to compare input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    //Array of user input chars
    let userInputChars = userInput.value.split("");
    //Loop through each char in quote
    quoteChars.forEach((char, index) => {
        //Check chars with quote chars
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        //If user hasn't entered anything or backspaced
        else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        //if user entered wrong char
        else {
            if (!char.classList.contains("fail")) {
                //increament and displaying mistakes
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        //Return true if all chars are correct
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });

        //End test if all chars are correct
        if (check) {
            displayResult();
        }

    });

});

//Update timer
function updateTimer() {
    if (time == 0) {
        //End test if reaches 0
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

//Set timer
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

//End test

const Turndark = () =>{
    var body = document.body;
    var x = document.getElementById("container");
    var y = userInput;
    body.classList.toggle("dark-theme1");
    x.classList.toggle("dark-theme2");
    y.classList.toggle("dark-theme3");
}


const displayResult = () => {
    //Display result div
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    document.getElementById("reload").style.display = "block";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    const acc = (userInput.value.length / 5 / timeTaken).toFixed(2);
    if(acc < 0)
      acc = 0;
    document.getElementById("wpm").innerText = acc  + "wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
};

//Start test
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
    document.getElementById("reload").style.display = "none";
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("dark").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    document.getElementById("reload").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}