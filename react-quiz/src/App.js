// import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestion } from './API';
import { Difficulty } from './API';

const TOTAL_QUESTIONS = 10;
function App() {
  // const [Loading, setLoading]= useState(false);
  // const [questions, setQuestions] = useState([]);
  // const [number, serNumber] = useState(0);
  // const [userAnswers, setUserAnswers]= useState([]);
  // const [score, setScore] = useState(0);
  // const [gameOver, setGameOver] = useState(true);


  // console.log(fetchQuizQuestion(TOTAL_QUESTIONS, Difficulty.Easy))



  // const startTrivia = async () =>{

  // }
  // const checkAnswer =( )=>{
    
  // }
  // const nextQuestion = ()=>{

  // }
  return (
    <div className="App">
       <h1> React Quiz</h1>
       {/* <button className='start' onClick={startTrivia}>
        Start
       </button>
       <p className='score'>Score:</p>
       <p>Loading questions...</p>
       <QuestionCard
       questionNr={number+1}
       totalQuestion={TOTAL_QUESTIONS}
       question={questions[number].question}
       answers={questions[number].answers}
       userAnswer ={userAnswers ? userAnswers[number] : undefined}
       callback={checkAnswer}
       
       />
       <button className='next' onClick={nextQuestion}>
        Next Question
       </button> */}
    </div>
  );
}

export default App;
