let currentQuestionIndex = 0;
let questions = [];
let score = 0; // Track correct answers

// Fetch questions from Open Trivia DB
async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        const data = await response.json();
        questions = data.results;
        showQuestion();
    } catch (error) {
        document.getElementById('quiz-container').innerHTML = "<p>Failed to load questions. Try again later.</p>";
        console.error(error);
    }
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById('quiz-container').innerHTML = `
            <h2>Quiz Finished!</h2>
            <p>Your Score: ${score} / ${questions.length}</p>
            <button onclick="restartQuiz()">Play Again</button>
        `;
        document.getElementById('next-btn').style.display = "none";
        return;
    }

    const q = questions[currentQuestionIndex];
    const answers = [...q.incorrect_answers, q.correct_answer];
    answers.sort(() => Math.random() - 0.5); // shuffle answers

    let html = `<h2>${q.question}</h2>`;
    answers.forEach(answer => {
        html += `<button onclick="checkAnswer('${answer}', '${q.correct_answer}')">${answer}</button><br>`;
    });

    document.getElementById('quiz-container').innerHTML = html;
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("✅ Correct!");
        score++;
    } else {
        alert("❌ Wrong! The correct answer was: " + correct);
    }
    currentQuestionIndex++;
    showQuestion();
}

// Next question button
document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

// Restart quiz function
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('next-btn').style.display = "block";
    fetchQuestions();
}

// Start the quiz
fetchQuestions();
