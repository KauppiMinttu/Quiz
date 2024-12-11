

const questions = [
    {
        question: "What does 'project management' mean?",
        answers: [
            { text: "Planning and organizing tasks", correct: true },
            { text: "Managing people only", correct: false },
            { text: "Hiring staff", correct: false },
            { text: "Running a team meeting", correct: false }
        ]
    },
    {
        question: "What is 'Agile methodology' used for?",
        answers: [
            { text: "Financial planning", correct: false },
            { text: "Product marketing", correct: false },
            { text: "Project management and development", correct: true },
            { text: "Team management", correct: false }
        ]
    },
    {
        question: "What does 'software debugging' involve?",
        answers: [
            { text: "Designing software features", correct: false },
            { text: "Finding and fixing errors in code", correct: true },
            { text: "Writing code", correct: false },
            { text: "Testing user interfaces", correct: false }
        ]
    },
    {
        question: "What does 'API' stand for?",
        answers: [
            { text: "Application Programming Interface", correct: true },
            { text: "Automated Process Integration", correct: false },
            { text: "Advanced Programming Interface", correct: false },
            { text: "Application Platform Interface", correct: false }
        ]
    },
    {
        question: "What is 'version control' used for?",
        answers: [
            { text: "Managing software versions for customers", correct: false },
            { text: "Tracking project expenses", correct: false },
            { text: "Documenting user feedback", correct: false },
            { text: "Managing changes to code over time", correct: true }
        ]
    },
    {
        question: "What is 'cybersecurity' concerned with?",
        answers: [
            { text: "Creating user interfaces", correct: false },
            { text: "Building servers", correct: false },
            { text: "Protecting systems and data from cyber threats", correct: true },
            { text: "Developing marketing strategies", correct: false }
        ]
    },
    {
        question: "What is the main goal of 'data encryption'?",
        answers: [
            { text: "Securing data from unauthorized access", correct: true },
            { text: "Improving data readability", correct: false },
            { text: "Compressing data", correct: false },
            { text: "Storing data", correct: false }
        ]
    },
    {
        question: "What does 'cloud computing' mean?",
        answers: [
            { text: "Storing data on local servers", correct: false },
            { text: "Running software on personal computers", correct: false },
            { text: "Using remote servers to store and manage data", correct: true },
            { text: "Building data centers", correct: false }
        ]
    },
    {
        question: "What is 'machine learning'?",
        answers: [
            { text: "Manual coding of algorithms", correct: false },
            { text: "Human learning in a business context", correct: false },
            { text: "Improving system hardware", correct: false },
            { text: "A type of artificial intelligence where systems learn from data", correct: true }
        ]
    },
    {
        question: "What does 'UX' stand for?",
        answers: [
            { text: "User Experience", correct: true },
            { text: "Unified Execution", correct: false },
            { text: "Universal Extension", correct: false },
            { text: "User Expansion", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();