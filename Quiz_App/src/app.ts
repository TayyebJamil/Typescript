 interface Question {
    question: string;
    answers: Answer[];
}
interface Answer {
    text: string;
    correct: boolean;
}



const questions: Question[] = [
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

const questionElement: HTMLElement = document.getElementById("question")!;
const answerButtons: HTMLElement = document.getElementById("answerButtons")!;
// const nextButton: HTMLElement = document.getElementById("nextButton")!;
const questionNum: HTMLElement = document.getElementById("question-counter")!;

let currentQuestionIndex: number = 0;
let score: number = 0;

function startQuiz(): void {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(): void {
    resetState();
    let currentQuestion: Question = questions[currentQuestionIndex];
    let questionNo: number = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    questionNum.innerHTML = questionNo + "/5";

    currentQuestion.answers.forEach(answer => {
        const label: HTMLLabelElement = document.createElement("label");
        const radioBtn: HTMLInputElement = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = "answer";
        radioBtn.value = answer.text;
        radioBtn.dataset.correct = answer.correct.toString();
        radioBtn.addEventListener("change", selectAnswer);
        label.appendChild(radioBtn);
        label.appendChild(document.createTextNode(answer.text));
        answerButtons.appendChild(label);
    });
}

function selectAnswer(e: Event): void {
    const selectedBtn: HTMLInputElement = e.target as HTMLInputElement;
    const isCorrect: boolean = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        (selectedBtn.parentNode as HTMLElement).classList.add("correct");
        score++;
    } else {
        (selectedBtn.parentNode as HTMLElement).classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(label => {
        const radioBtn: HTMLInputElement = label.firstChild as HTMLInputElement;
        if (radioBtn.dataset.correct === "true") {
            label.classList.add("correct");
        }
        // radioBtn.disabled = true;
    });
    // ... (previous code)

// Timer logic


    
}

// Add event listener for the reset button
document.getElementById('resetButton')!.addEventListener('click', function() {
    // Clear the selected answer by unchecking all radio buttons
    var answerInputs = document.getElementsByName('answer');
    for (var i = 0; i < answerInputs.length; i++) {
        (answerInputs[i] as HTMLInputElement).checked = false;
    }
});


function resetState(): void {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
let time = 30; // Set initial time to 1 minute (60 seconds)
const timerElement = document.getElementById('time');
const nextButton = document.getElementById('nextButton') as HTMLButtonElement;

const timerInterval = setInterval(() => {
    time--;
    if (time >= 0) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement!.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        nextButton.style.display = "block";
    }

    if (time === 0) {
        clearInterval(timerInterval); // Stop the timer
        nextButton.style.display = "none"; // Disable the "Next" button
    }
}, 1000);

function showScore(): void {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    // Display all questions with correct answers
    for (let i = 0; i < questions.length; i++) {
        const currentQuestion: Question = questions[i];
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
// function showScore(): void {
//     resetState();
//     questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

//     // Display incorrect questions and their correct answers
//     for (let i = 0; i < questions.length; i++) {
//         const currentQuestion: Question = questions[i];
//         const isCorrect: boolean = currentQuestion.answers.some(answer => answer.correct);
        
//         if (!isCorrect) {
//             questionElement.innerHTML += `<br>${i + 1}. ${currentQuestion.question}`;
//             currentQuestion.answers.forEach(answer => {
//                 if (answer.correct) {
//                     questionElement.innerHTML += `<br> - ${answer.text}`;
//                 }
//             });
//         }
//     }

//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = "block";
// }


function handleNextButton(): void {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
        // clearInterval(timerInterval);
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
 