"use strict";
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            { text: "Mount Everest", correct: true },
            { text: "K2", correct: false },
            { text: "Kangchenjunga", correct: false },
            { text: "Lhotse", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Michelangelo", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for the element Oxygen?",
        answers: [
            { text: "O", correct: true },
            { text: "O2", correct: false },
            { text: "O3", correct: false },
            { text: "Om", correct: false }
        ]
    }
];
let currentQuestion = 0;
function showQuestion(questionIndex) {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answerButtons');
    if (questionElement && answerButtonsElement) {
        questionElement.innerText = questions[questionIndex].question;
        answerButtonsElement.innerHTML = '';
        questions[questionIndex].answers.forEach((answer, index) => {
            answerButtonsElement.innerHTML += `
                <label>
                    <input type="radio" name="answer" value="${answer.text}">
                    ${answer.text}
                </label>
            `;
        });
    }
}
function resetAnswer() {
    const answerButtons = document.getElementsByName('answer');
    answerButtons.forEach((button) => {
        button.checked = false;
    });
}
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
        document.getElementById('question-counter').innerText = `Question ${currentQuestion + 1} / ${questions.length}`;
        resetAnswer();
    }
    else {
        // Quiz is over
        // Add your logic for end of quiz
    }
}
document.getElementById('resetButton').addEventListener('click', resetAnswer);
document.getElementById('nextButton').addEventListener('click', nextQuestion);
// Show the first question when the page loads
showQuestion(currentQuestion);
document.getElementById('question-counter').innerText = `Question 1 / ${questions.length}`;
