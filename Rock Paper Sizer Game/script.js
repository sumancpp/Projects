document.addEventListener("DOMContentLoaded", () => {
    let userScore = 0;
    let compScore = 0;

    const choices = document.querySelectorAll(".choice");
    const msg = document.querySelector("#msg");
    const userScorePara = document.querySelector("#user-score");
    const compScorePara = document.querySelector("#computer-score");

    const genCompChoice = () => {
        const options = ["rock", "paper", "scissors"];
        const randIdx = Math.floor(Math.random() * options.length);
        return options[randIdx];
    };

    const drawGame = () => {
        msg.innerText = "Game was a draw, play again";
        msg.style.backgroundColor = "#081b31";
    };

    const showWinner = (userWin, userChoice, compChoice) => {
        if (userWin) {
            userScore++;
            userScorePara.innerText = userScore;
            msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
            msg.style.backgroundColor = "green";
        } else {
            compScore++;
            compScorePara.innerText = compScore;
            msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
            msg.style.backgroundColor = "red";
        }
    };

    const playGame = (userChoice) => {
        const compChoice = genCompChoice();
        console.log(`User choice: ${userChoice}, Computer choice: ${compChoice}`); // Log choices to debug
        if (userChoice === compChoice) {
            drawGame();
        } else {
            let userWin = false;
            if (userChoice === "rock") {
                userWin = compChoice === "scissors";
            } else if (userChoice === "paper") {
                userWin = compChoice === "rock";
            } else if (userChoice === "scissors") {
                userWin = compChoice === "paper";
            }
            console.log(`User win: ${userWin}`); // Log result to debug
            showWinner(userWin, userChoice, compChoice);
        }
    };

    choices.forEach((choice) => {
        choice.addEventListener("click", () => {
            const userChoice = choice.getAttribute("id");
            playGame(userChoice);
        });
    });
});
