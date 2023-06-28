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
                            //why is input used instead of textInput.value
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //Is the input empty?
        message.innerText ="Please enter a letter.";
    } else if (input.length > 1) {
        //Did you type more than one letter?
        message.innerText = "Please enter a single letter.";
    }
    //use the /match() method here to check if they've entered a character that doesn't match the regular expression
    else if (!input.match(acceptedLetter)) {
        //Did you type a number, a special character or someother non letter thiing?
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
    //how do you know to use a for...of loop?
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    //what does this next step do?
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
    //why isn't guessed letters used (const guessedLetters of wordArray)
    if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
        } else {
        revealWord.push("●");
        }
    }
};

//Create a function to check if the player won
