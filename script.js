let questions = [];
let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const userAnswer = document.getElementById("user-answer");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const replayBtn = document.getElementById("replay-btn");

// Loading questions from JSON
fetch(`questions.json?v=${Date.now()}`)
  .then(response => {
    if (!response.ok) throw new Error("Could not load questions");
    return response.json();
  })
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(error => {
    questionText.textContent = "Error loading questions.";
    console.error("Error:", error);
  });

function loadQuestion() {
  questionText.textContent = questions[currentQuestion].question;
  userAnswer.value = "";
  feedback.textContent = "";
  nextBtn.disabled = true;
  submitBtn.disabled = false;
}

submitBtn.addEventListener("click", () => {
  const userResponse = userAnswer.value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestion].answer.toLowerCase();

  if (userResponse === correctAnswer) {
    feedback.textContent = "✅ Correct!";
    score++;
    scoreDisplay.textContent = score;
  } else {
    feedback.textContent = `❌ Incorrect. Answer: ${questions[currentQuestion].answer}`;
  }
  
  submitBtn.disabled = true;
  nextBtn.disabled = false;
});

userAnswer.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if (!submitBtn.disabled) {
      submitBtn.click();
    } else if (!nextBtn.disabled) {
      nextBtn.click();
    }
  }
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionText.textContent = "🎉 Quiz complete!";
    userAnswer.style.display = "none";
    submitBtn.style.display = "none";
    nextBtn.style.display = "none";
    replayBtn.style.display = "inline-block"; // ✅ show replay button
    feedback.textContent = `Final Score: ${score}/${questions.length}`;
  }

  replayBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    scoreDisplay.textContent = score;
    
    userAnswer.style.display = "inline-block";
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    replayBtn.style.display = "none";
  
    loadQuestion();
  });
  
});
