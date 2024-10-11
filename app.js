const questions = [
    {
      question: "Who is the strongest man in the world",
      answers: [
        { text: "Eddie Hall", correct: true },
        { text: "Thor", correct: false },
        { text: "Larry Wheel", correct: false },
        { text: "You", correct: false }
      ]
    },
    {
      question: "What is the largest animal on the planet",
      answers: [
        { text: "Shark", correct: false },
        { text: "Whale", correct: true }, // Corrected spelling of "Whale"
        { text: "Giraffe", correct: false }, // Corrected spelling of "Giraffe"
        { text: "Elephant", correct: false }
      ]
    },
    {
      question: "In this list what is the high level language",
      answers: [
        { text: "C", correct: false },
        { text: "Rust", correct: false }, // Corrected capitalization of "Rust"
        { text: "JavaScript", correct: true }, // Corrected capitalization of "JavaScript"
        { text: "Rust", correct: false }
      ]
    },
    {
      question: "What is the most popular language used in DSA",
      answers: [
        { text: "Java", correct: false },
        { text: "Python", correct: false }, // Corrected spacing
        { text: "C++", correct: true },
        { text: "C#", correct: false }
      ]
    }
  ];
  
  const questionelement = document.getElementById("question");
  const answersbtn = document.getElementById("answer-button");
  const next = document.getElementById("next-btn");
  let currentQuestionindex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionindex = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let questionno = currentQuestionindex + 1; 
    questionelement.innerHTML = questionno + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text; 
      button.classList.add("btn");
      answersbtn.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = "true";  // Corrected dataset usage
      }
      button.addEventListener("click", selectans);
    });
  }
  
  function resetState() {
    next.style.display = "none";
    while (answersbtn.firstChild) {
      answersbtn.removeChild(answersbtn.firstChild);
    }
  }
  
  function selectans(e) {
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true"; // Corrected comparison
    if (isCorrect) {
      selectbtn.classList.add("correct");
      score++;
    } else {
      selectbtn.classList.add("incorrect");
    }
    Array.from(answersbtn.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    next.style.display = "block";
  }
  
  function showscore() {
    resetState();
    questionelement.innerHTML = `You scored ${score} out of ${questions.length}!`;  // Corrected string output
    next.innerHTML = "Play Again";
    next.style.display = "block";
  }
  
  function handlenextbtn() {
    currentQuestionindex++;
    if (currentQuestionindex < questions.length) {
      showQuestion();
    } else {
      showscore();
    }
  }
  
  next.addEventListener("click", () => {
    if (currentQuestionindex < questions.length) {
      handlenextbtn();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  