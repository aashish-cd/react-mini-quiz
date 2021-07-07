import React, { useEffect, useState } from 'react'


const url = 'https://opentdb.com/api.php?amount=5'

const Quiz = () => {
 const [questionList, setQuestionList] = useState({})
 const [loading, setLoading] = useState(true)
 const [showScore, setShowScore] = useState(false)
 const [number, setNumber] = useState(0)
 const [score, setScore] = useState(0)

 const fetchData = async () => {
  const response = await fetch(url)
  const data = await response.json()
  const { results } = data;
  setQuestionList(results);
  setLoading(false)
 }
 useEffect(() => {
  fetchData()
 }, [showScore])

 const handleQuestion = () => {
  setNumber(number + 1);
  if (number >= questionList.length - 1) {

   setShowScore(true)
   setNumber(0)

  }
 }

 if (loading) {
  return <h2 className='container'>data is loading ... </h2>
 }
 const { question, correct_answer, incorrect_answers } = questionList[number]
 return <section>
  {showScore ?
   (<div className="container">
    <div className="question-container">
     <h1>you Scored {score}/{questionList.length}</h1>
    </div>
    <div className='question-container'>
     <button onClick={() => {
      setShowScore(false);
      setScore(0)
     }}>Play again ?</button>
    </div>
   </div>)
   : (<div className="container">
    <div className="question-container">
     <h1>Q. {question}</h1>
    </div>
    <div className="answer-container" onClick={() => {
     setScore(score + 1)
     handleQuestion()
    }}>
     <label for="answer" className="answer">{correct_answer}</label>
    </div>
    {incorrect_answers.map((item, index) => {
     return (
      <div className="answer-container" onClick={handleQuestion} key={index}>
       <label for="answer" className="answer" >{item}</label>
      </div>
     )
    })}

   </div>)
  }
 </section>
}

export default Quiz