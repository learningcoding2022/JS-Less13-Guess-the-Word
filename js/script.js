//global variables

//unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");

//the button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");

//The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");

//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");/*how should I refer to the p class?*/

//The paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");

//The span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");/*double check this*/

//The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");

//The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";

//add a new global variable for player guesses
const guessedLetters = [];

//create a global variable called remainingGuesses and set it to a value of 8
let remainingGuesses = 8;

//add an async function
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //this is the delimiter used to create a new array in order to grab a random word
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    circlesPlaceholders(word);
};

getWord();

//write a function to add placeholders for each letter
const circlesPlaceholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//Step 3 of 6 Accept and Validate Player Guesses

//Validate Input in the button event handler
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    //Empty message paragraph
    message.innerText = "";
    //grab what was entered in the input
    const guess = letterInput.value;
    //make sure it's a single letter
    const acceptedGuess = validateInput(guess);

    if (acceptedGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

//Create a function to check play's input
const validateInput = function (input) {
                            
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText ="Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    }
    //use the /match() method here to check if they've entered a character that doesn't match the regular expression
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        //a single letter has been input
        return input;
    }
};

//create a function to capture input
const makeGuess = function (guess) {
    //JavaScript is case sensitive- convert all letters to one casing
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed this letter. Try again!";
    } else { 
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateRemainingGuesses(guess);
        displayGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

//Step 4 of 6: Display Word and Guessed Letters (will use split() and join() )

//Create a function to show the guessed letters
const displayGuessedLetters = function () {
    //to clear the list
    guessedLettersElement.innerHTML = "";
    //to create a new list item for each letter inside your guessedLetters array
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

//Create a function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
        } else {
        revealWord.push("●");
        }
    }
//The next step would be to update the innerText of the wordInProgress variable with the letters stored in the revealWord array. Once you add that piece of code within the updateWordInProgress function, the letters should appear.
wordInProgress.innerText = revealWord.join("");
checkForWinner();
};

//create a Function to Count Guesses Remaining
const updateRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1; //subtracts the  value and reassigns the variable the new value
    } else {
        message.innerText = `Nice guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Sorry, the game is over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//Create a function to check if the player won
const checkForWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;    
        startOver();
    }
};

//Step 6 of 6 Play It Again

//create a function to hide and show elements
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    //to show the button to play again
    playAgainButton.classList.remove("hide");
};

//add a click event to the play again button
playAgainButton.addEventListener("click", function () {
    //reset all original values - grab a new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    //Grab a new word
    getWord();
});