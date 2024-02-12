 
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

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextButton");
const questionNum = document.getElementById("question-counter");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    questionNum.innerHTML = questionNo + "/5";

    currentQuestion.answers.forEach(answer => {
        const label = document.createElement("label");
        const radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = "answer";
        radioBtn.value = answer.text;
        radioBtn.dataset.correct = answer.correct;
        radioBtn.addEventListener("change", selectAnswer);
        label.appendChild(radioBtn);
        label.appendChild(document.createTextNode(answer.text));
        answerButtons.appendChild(label);
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.parentNode.classList.add("correct");
        score++;
    } else {
        selectedBtn.parentNode.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(label => {
        const radioBtn = label.firstChild;
        if (radioBtn.dataset.correct === "true") {
            label.classList.add("correct");
        }
        radioBtn.disabled = true;
    });
    nextButton.style.display = "block";
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    // Display all questions with correct answers
    for (let i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];
        questionElement.innerHTML += `<br>${i + 1}. ${currentQuestion.question}`;
        currentQuestion.answers.forEach(answer => {
            if (answer.correct) {
                questionElement.innerHTML += `<br> - ${answer.text}`;
            }
        });
    }


    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
        clearInterval(timerInterval);
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

// Timer logic
let time = 60; // Set initial time to 1 minute (60 seconds)
const timerElement = document.getElementById('time');
const timerInterval = setInterval(() => {
    time--;
    if (time >= 0) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }  
}, 1000); // Update every second