const questions=[
    {
        question:"Who won the T20 World Cup 2024?",
        answers:[
            {text:"India",correct:true},
            {text:"South Africa",correct:false},
            {text:"England",correct:false},
            {text:"Australia",correct:false},
        ]
    },
    {
        question:"In which country were the 2024 Olympic Games held?",
        answers:[
            {text:"United States",correct:false},
            {text:"Russia",correct:false},
            {text:"France",correct:true},
            {text:"Germany",correct:false}
        ]
    },
    {question:"Which country won the 2024 UEFA Euro Championship?",
        answers:[
            {text:"Spain", correct:true},
            {text:"Germany", correct:false},
            {text:"Italy", correct:false},
            {text:"France", correct:false}
        ]
    },
    {question:"Which club won the 2024 UEFA Champions League?",
        answers:[
            {text:"Real Madrid", correct:true},
            {text:"Barcelona", correct:false},
            {text:"Manchester City", correct:false},
            {text:"Borrusia Dortmund", correct:false}
        ]
    },
    {question:"Which tech giant introduced the AI assistant Gemini in 2024?",
        answers:[
            {text:"Google", correct:true},
            {text:"Microsoft", correct:false},
            {text:"Amazon", correct:false},
            {text:"Apple", correct:false}
        ]
    },
    
    

]

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectanswer);
    })
}

function resetState(){
    nextButton.style.display="none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectanswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextButton.style.display="block"
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML='Restart';
    nextButton.style.display="block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();