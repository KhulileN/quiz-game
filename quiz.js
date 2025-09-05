let currentQuestionIndex = 0;
let questions = [];
let score = 0;

// Fetch questions from Open Trivia DB
async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        const data = await response.json();
        questions = data.results;
        questions.sort(() => Math.random() - 0.5); // shuffle questions
        showQuestion();
    } catch (error) {
        document.getElementById('quiz-container').innerHTML = "<p>Failed to load questions. Try again later.</p>";
        console.error(error);
    }
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        let html = `
            <h2>Quiz Finished!</h2>
            <p>Your Score: ${score} / ${questions.length}</p>
        `;

        // Show image based on score
        if (score < 3) {
            html += `<img src="pieter.png" alt="Try Again">`;
        } else {
            html += `<img src="congrats.jpg" alt="Congrats">`;
        }

        html += `<button onclick="restartQuiz()">Play Again</button>`;
        document.getElementById('quiz-container').innerHTML = html;
        return;
    }

    const q = questions[currentQuestionIndex];
    const answers = [...q.incorrect_answers, q.correct_answer];
    answers.sort(() => Math.random() - 0.5); // shuffle answers

    let html = `
        <h2>Question ${currentQuestionIndex + 1} of ${questions.length}</h2>
        <p>${q.question}</p>
    `;

    answers.forEach(answer => {
        html += `<button onclick="checkAnswer('${answer.replace(/'/g, "\\'")}', '${q.correct_answer.replace(/'/g, "\\'")}')">${answer}</button>`;
    });

    document.getElementById('quiz-container').innerHTML = html;
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("✅ Correct!");
        score++;
    } else {
        alert(`❌ Wrong! The correct answer was: ${correct}`);
    }
    currentQuestionIndex++;
    showQuestion();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    fetchQuestions();
}

// Start the quiz
fetchQuestions();

