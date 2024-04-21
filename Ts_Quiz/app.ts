"use strict";

const questionElement = document.getElementById("question") as HTMLElement;
const answerButtons = document.getElementById("answerButtons") as HTMLElement;
const nextButton = document.getElementById("nextButton") as HTMLElement;
const questionNum = document.getElementById("question-counter") as HTMLElement;
const resetBtn = document.getElementById('resetButton') as HTMLElement;

// Variables for tracking quiz state
let currentQuestionIndex = 0;
let score = 0;
let questions: { question: string; correct_answer: string; incorrect_answers: string[] }[] = []; // Array to store fetched questions

// Function to start the quiz
function startQuiz(): void {
    currentQuestionIndex = 0;
    score = 0;
    fetchTriviaQuestions(); // Fetch questions from OTDB API
    resetBtn.style.display = "none";
}

// Function to fetch questions from OTDB API
async function fetchTriviaQuestions(): Promise<void> {
    try {
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
        );
        const data = await response.json();
        if (data.response_code === 0) {
            questions = data.results.map((result: any) => {
                return {
                    question: result.question,
                    correct_answer: result.correct_answer,
                    incorrect_answers: result.incorrect_answers
                };
            });
            showQuestion();
        } else {
            console.error("Failed to fetch questions from OTDB API.");
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

// Function to display a question
function showQuestion(): void {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    questionNum.innerHTML = questionNo + " of " + questions.length + " questions";

    const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];

    // Shuffle the answers to display them in a random order
    const shuffledAnswers = shuffleArray(allAnswers);

    shuffledAnswers.forEach((answer) => {
        const label = document.createElement("label");
        const radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = "answer";
        radioBtn.value = answer;
        radioBtn.dataset.correct = answer === currentQuestion.correct_answer;
        radioBtn.addEventListener("change", selectAns);
        label.appendChild(radioBtn);
        label.appendChild(document.createTextNode(answer));
        answerButtons.appendChild(label);
    });
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let currentq: number[] = [];
let isCorrect: boolean;
let selectedBtn: HTMLInputElement;
let selectedAnswerValue: string;
let iCorrect: number;

// Event handler for selecting an answer
function selectAnswer(e: Event): void {
    selectedBtn = e.target as HTMLInputElement;
    selectedAnswerValue = selectedBtn.value;
    isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.parentNode?.classList.add("correct");
        score++;
    } else {
        selectedBtn.parentNode?.classList.add("incorrect");
        currentq.push(currentQuestionIndex);
    }
    Array.from(answerButtons.children).forEach(label => {
        const radioBtn = label.firstChild as HTMLInputElement;
        radioBtn.disabled = true;
    });
    resetBtn.style.display = "block";
}

// Event handler for resetting the state
document.getElementById('resetButton')?.addEventListener('click', function () {
    resetState()
    showQuestion();
    resetBtn.style.display = "none";
});

// Function to reset the state
function resetState(): void {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Timer related variables
let time = 600; //

const timerElement: HTMLElement = document.getElementById('time')!;
// const nextButton: HTMLElement = document.getElementById('nextButton')!;

let time: number = 20;
let score: number = 0;
let currentQuestionIndex: number = 0;
const questions: { question: string; correct_answer: string; incorrect_answers: string[] }[] = [
    // Add your questions here
];
const currentq: number[] = [];

const timerInterval: ReturnType<typeof setInterval> = setInterval(() => {
    time--;
    if (time >= 0) {
        const minutes: number = Math.floor(time / 60);
        const seconds: number = time % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        // nextButton.style.display = "block";
    }
    if (time === 0) {
        showScore();
        clearInterval(timerInterval); // Stop the timer
        // Disable the "Next" button
    }
}, 1000);

function showScore() {
    // Reset state and clear timer
    resetState();
    clearInterval(timerInterval); // Stop the timer when the reset button is clicked
    time = 20; // Reset the timer to 20 seconds
    timerElement.textContent = "0:00";
    resetBtn.style.display = "none";

    // Update the user's score and total questions
    const userScoreElement: HTMLElement = document.getElementById('userScore')!;
    const totalQuestionsElement: HTMLElement = document.getElementById('totalQuestions')!;
    userScoreElement.textContent = score.toString();
    totalQuestionsElement.textContent = questions.length.toString();

    // Update the incorrect answers list
    const incorrectAnswersListElement: HTMLElement = document.getElementById('incorrectAnswersList')!;
    incorrectAnswersListElement.innerHTML = 'Your <strong>incorrect answers</strong> are:';
    const questionElement: HTMLElement = document.getElementById('question')!;
    questionElement.innerHTML = '';

    if (currentq.length > 0) {
        for (let i = 0; i < currentq.length; i++) {
            const currentQuestion = questions[currentq[i]];
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${i + 1}.</strong> ${currentQuestion.question}`;
            listItem.innerHTML += `<br> - <span style="color: green;">${currentQuestion.correct_answer}</span>`;
            incorrectAnswersListElement.appendChild(listItem);
        }
    }

    // Hide the next button
    const nextButton: HTMLElement = document.getElementById('nextButton')!;
    nextButton.style.display = 'none';
    nextButton.textContent = 'Play Again';

    const resultSection: HTMLElement = document.getElementById('resultSection')!;
    resultSection.style.display = 'block';
    resetState();
}

// Function to handle the next button click
function handleNextButton() {
    // Check if any radio button is checked to determine whether to move to the next question
    const anyAnswerSelected: boolean = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="answer"]')).some(input => input.checked);

    if (!anyAnswerSelected) {
        // Display an error message or take any other appropriate action
        alert("Please select an answer before moving to the next question.");
        return;
    }

    selectAnswer({ target: document.querySelector<HTMLInputElement>('input[name="answer"]:checked')! });

    // Move to the next question
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
    const resetBtn: HTMLElement = document.getElementById('resetBtn')!;
    resetBtn.style.display = "none";
}

const nextButton: HTMLElement = document.getElementById('nextButton')!;
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();

function goToHome() {
    // You can customize this based on your home page URL or any other logic
    window.location.href = '/index.html'; // Replace with your home page URL
}

function resetState() {
    // Add any necessary state reset logic here
}

function showQuestion() {
    // Add logic to display the current question
}

function selectAnswer(event: { target: HTMLInputElement }) {
    // Add logic to handle answer selection
}

function startQuiz() {
    // Add logic to start the quiz
}

