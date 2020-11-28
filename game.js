const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarfull = document.getElementById('progressBarfull')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions =[];
     
let questions =  [
    {
        question :"CEO of PFS?",
        choice1:"Thomas J. Madden",
        choice2:"Mike Willoughby",
        choice3:"Travis Hess",
        choice4:"Cindy Almond",
        answer : 2
    },
    {
        question :"PFS longform?",
        choice1:"Progression Free Survival ",
        choice2:"Percent Full Scale ",
        choice3:"Primary Flight System",
        choice4:"Priority Fulfillment Services",
        answer : 4
    },
    {
        question :"PFS head quarters?",
        choice1:"ALLEN",
        choice2:"DALLAS",
        choice3:"TORONTO",
        choice4:"SEATTLE",
        answer : 1
    },
    {
        question :"PFSweb, Inc. was established in the year of ......",
        choice1:"1998",
        choice2:"1996",
        choice3:"1994",
        choice4:"2000",
        answer : 3
    },
    {
        question :"PFS web Global In india?",
        choice1:"Delhi",
        choice2:"Banglore",
        choice3:"Mumbai",
        choice4:"Channai",
        answer : 2
    },
    {
        question :"What is the correct JavaScript syntax to write “Hello World”?",
        choice1:" System.out.println(“Hello World”)",
        choice2:"println (“Hello World”)",
        choice3:"document.write(“Hello World”)",
        choice4:"response.write(“Hello World”)",
        answer : 3
    },
    
    
];
const rightAnswer = 10;
const maxQuestions = 6;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions =[...questions];
    getNewQuestion();
}


getNewQuestion = () =>{

    if(availableQuestions.length === 0 || questionCounter >maxQuestions){

        localStorage.setItem('mostRecentScore', score);
        //goto end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    
    //Question Counter
    progressText.innerText =`Questions : ${questionCounter}/${maxQuestions}`;

    // Progress Bar
    progressBarfull.style.width = `${(questionCounter/maxQuestions)*100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length );
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers =true;
}

choices.forEach(choice =>{
    choice.addEventListener('click',e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnswer= selectedChoice.dataset['number'];

        const classToAplly = 
        selectedAnswer==currentQuestion.answer ? 'RightAnswer' :'WrongAnswer'; 

        if(classToAplly === 'RightAnswer'){
            incrementScore(rightAnswer);
        }
        
        //Below line for adding the classes after clicked the choices, those classes can change the background color of choices.
        selectedChoice.parentElement.classList.add(classToAplly);

        setTimeout(()=>{
                selectedChoice.parentElement.classList.remove(classToAplly);
                getNewQuestion();
        },1000)
        
    })
});

incrementScore = num =>{
    score+=num;
    scoreText.innerText = score;
}

startGame(); 