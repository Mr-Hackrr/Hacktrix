// Global Variables
let currentQuestion = 0;
let score = 0;
let timer;
const questions = [
    {
        question: "Which of the following is a Python keyword?",
        options: ["function", "return", "define"],
        correct: 1,
        hint: "Think about the keyword used to return a value from a function."
    },
    {
        question: "What is the correct file extension for Python files?",
        options: [".py", ".python", ".pt"],
        correct: 0,
        hint: "Python files have an extension that matches the language abbreviation."
    },
    {
        question: "What is the output of `print(2 ** 3)` in Python?",
        options: ["6", "8", "9"],
        correct: 1,
        hint: "The '**' operator is used for exponentiation."
    }
];

// Helper Function: Reset Timer
function resetTimer(duration, onComplete) {
    clearInterval(timer);
    const timerBar = document.getElementById("timer-bar");
    const timerText = document.getElementById("timer");
    let remainingTime = duration;

    timer = setInterval(() => {
        remainingTime--;
        const percentage = (remainingTime / duration) * 100;
        timerBar.style.width = `${percentage}%`;
        timerText.textContent = `Time remaining: ${remainingTime}s`;

        if (remainingTime <= 0) {
            clearInterval(timer);
            onComplete();
        }
    }, 1000);
}

// Function: Load Question
function loadQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        document.getElementById("question-text").textContent = question.question;

        const optionsHTML = question.options
            .map(
                (option, index) => `
            <li>
                <input type="radio" id="option${index}" name="answer" value="${index}">
                <label for="option${index}">${option}</label>
            </li>`
            )
            .join("");
        document.getElementById("question-options").innerHTML = optionsHTML;

        document.getElementById("question-area").classList.remove("d-none");
        document.getElementById("feedback-progress").classList.add("d-none");

        resetTimer(30, () => {
            alert("Time's up! Moving to the next question.");
            currentQuestion++;
            loadQuestion();
        });

        updateProgressBar();
    } else {
        endQuiz();
    }
}

// Function: Submit Answer
document.getElementById("submit-answer").addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    const selectedValue = parseInt(selectedOption.value, 10);
    const correctValue = questions[currentQuestion].correct;

    if (selectedValue === correctValue) {
        score++;
        showFeedback("Correct! 🎉", true);
    } else {
        const correctAnswer = questions[currentQuestion].options[correctValue];
        showFeedback(`Incorrect! The correct answer is: ${correctAnswer}.`, false);
    }

    currentQuestion++;
    setTimeout(() => loadQuestion(), 2000);
});

// Function: Show Hint
document.getElementById("hint-btn").addEventListener("click", () => {
    const hint = questions[currentQuestion]?.hint || "No hints available for this question.";
    alert(`Hint: ${hint}`);
});

// Function: Skip Question
document.getElementById("skip-question").addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
});

// Function: Update Progress Bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
}

// Function: Show Feedback
function showFeedback(message, success = true) {
    const feedbackText = document.getElementById("feedback-text");
    feedbackText.textContent = message;
    feedbackText.className = success ? "text-success" : "text-danger";

    const feedbackProgress = document.getElementById("feedback-progress");
    feedbackProgress.classList.remove("d-none");

    feedbackProgress.classList.add(success ? "correct-feedback" : "incorrect-feedback");
    setTimeout(() => {
        feedbackProgress.classList.remove("correct-feedback", "incorrect-feedback");
    }, 2000);
}

// Function: End Quiz
function endQuiz() {
    clearInterval(timer);
    document.getElementById("question-area").classList.add("d-none");
    document.getElementById("feedback-progress").classList.remove("d-none");

    const feedbackText = document.getElementById("feedback-text");
    feedbackText.textContent = `Quiz Complete! 🎉 You scored ${score} out of ${questions.length}.`;
    document.getElementById("next-question").classList.add("d-none");
    document.getElementById("restart-quest").classList.remove("d-none");
}

// Function: Restart Quiz
document.getElementById("restart-quest").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    document.getElementById("restart-quest").classList.add("d-none");
});

// Start Quiz Button
document.getElementById("start-quest").addEventListener("click", () => {
    document.getElementById("quest-mode").classList.add("d-none");
    loadQuestion();
});

// Add Animations for Buttons and Feedback
document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener("click", () => {
        document.getElementById("quest-mode").classList.add("fade-out");
        setTimeout(() => loadQuestion(), 1000);
    });
});