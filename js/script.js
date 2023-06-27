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

//add an event listener for the button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const captureValueInput = textInput.value;
    console.log(guess);
    letterInput.value = "";
});