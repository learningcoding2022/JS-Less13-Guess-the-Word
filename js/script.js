//global variables

//unordered list where the player's guessed letters will appear
const pastGuessedLetters = document.querySelector(".guessed-letters");

//the button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");

//The text input where the player will guess a letter
const textInput = document.querySelector(".letter");

//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");/*how should I refer to the p class?*/

//The paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");

//The span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");/*double check this*/

//The empty paragraph where messages will appear when the player guesses a letter
const messageWillAppear = document.querySelector(".message");

//The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

//add a new global variable for player guesses
const guessedLetters = [];

//write a function to add placeholders for each letter
const circlesPlaceholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        //why push the placeholderLetters?
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

circlesPlaceholders(word);

//Step 3 of 6 Accept and Validate Player Guesses

//Validate Input in the button event handler
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    //Empty message paragraph
    messageWillAppear.innerText = "";
    //grab what was entered in the input
    const guess = textInput.value;
    //make sure it's a single letter
    const acceptedGuess = validateInput(guess);

    if (acceptedGuess) {
        makeGuess(guess);
    }
    textInput.value = "";
});

//Create a function to check play's input
const validateInput = function (input){
                            //why is input used instead of textInput.value
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //Is the input empty?
        messageWillAppear.innerText ="Please guess a letter.";
    }
    else if (input.length > 1) {
        //Did you type more than one letter?
        messageWillAppear.innerText = "Please enter one letter at a time.";
    }
    //use the /match() method here to check if they've entered a character that doesn't match the regular expression
    else if (!input.match(acceptedLetter)) {
        //Did you type a number, a special character or someother non letter thiing?
        messageWillAppear.innerText = "Please enter a letter from A to Z.";
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
        messageWillAppear.innerText = "You already guessed this letter. Try again!";
    } else { 
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

