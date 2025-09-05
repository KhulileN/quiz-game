let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
    const data = await response.json();
    questions = data.results;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById('quiz-container').innerHTML = "<h2>Quiz Finished!</h2>";
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
        alert("Correct!");
    } else {
        alert("Wrong! The correct answer was: " + correct);
    }
    currentQuestionIndex++;
    showQuestion();
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

fetchQuestions();
