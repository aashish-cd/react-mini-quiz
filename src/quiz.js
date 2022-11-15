import React, { useEffect, useState } from "react";

const url = "https://opentdb.com/api.php?amount=5";

const Quiz = () => {
  const [questionList, setQuestionList] = useState({});
  const [loading, setLoading] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);

  const [showAnswer, setShowAnswer] = useState(false);

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    setQuestionList(results);

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [showScore]);

  const handleQuestion = () => {
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      setNumber(number + 1);
      if (number >= questionList.length - 1) {
        setShowScore(true);
        setNumber(0);
      }
    }, 1000);
  };

  if (loading) {
    return <h2 className="container">data is loading ... </h2>;
  }
  const { question, correct_answer, incorrect_answers } = questionList[number];

  const answers = [
    { text: correct_answer, correct: true },
    ...incorrect_answers.map((answer) => ({ text: answer, correct: false })),
  ];

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  shuffle(answers);

  return (
    <section>
      {showScore ? (
        <div className="container">
          <div className="question-container">
            <h1>
              you Scored {score}/{questionList.length}
            </h1>
          </div>
          <div className="question-container">
            <button
              onClick={() => {
                setShowScore(false);
                setScore(0);
              }}
            >
              Play again ?
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="question-container">
            <h1>Q. {question}</h1>
          </div>
          {answers.map((item, index) => {
            return (
              <div
                className={`answer-container ${
                  showAnswer && item.correct ? "correct" : "incorrect"
                }`}
                onClick={() => {
                  handleQuestion();
                  if (item.correct) {
                    setScore(score + 1);
                  }
                }}
                key={index}
              >
                <label for="answer" className="answer">
                  {index + 1}. {item.text}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Quiz;
