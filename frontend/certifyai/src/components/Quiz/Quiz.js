import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import Scrollbars from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const { quiz_id } = useParams(); // Retrieve quiz_id from URL parameters
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // Object to store user answers
  const [formValid, setFormValid] = useState(true); // State to manage form validity
  const navigate = useNavigate()

  useEffect(() => {
    if (quiz_id) {
      fetchQuizQuestion(quiz_id);
    }
  }, [quiz_id]);

  useEffect(() => {
    // Check if all questions are answered
    const allAnswered = quizQuestions.every(question => userAnswers.hasOwnProperty(question.id));
    setFormValid(allAnswered);
  }, [userAnswers, quizQuestions]);

  const fetchQuizQuestion = (quiz_id) => {
    fetch(`http://127.0.0.1:8000/quizes/${quiz_id}/questions`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Success", data);
        setQuizQuestions(data);
      });
  };

  const handleOptionChange = (questionId, choice) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: choice
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValid) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Convert userAnswers to the required format
    const formattedAnswers = Object.keys(userAnswers).map(questionId => ({
      question: questionId,
      user_choice: userAnswers[questionId]
    }));

    console.log("User Answers:", formattedAnswers);

    const patchAnswer = (answer) => {
        return fetch(`http://127.0.0.1:8000/questions/${answer.question}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'user_option' : answer.user_choice
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          });
      };

    // Send PATCH requests for all answers
    Promise.all(formattedAnswers.map(answer => patchAnswer(answer)))
    .then(results => {
        console.log("All answers submitted successfully:", results);
        fetch(`http://127.0.0.1:8000/quizes/${quiz_id}`, {
            method:"PATCH",
            headers:{
                'Content-type':"application/json"
            },
            body:JSON.stringify({
                'status':'attempted'
            })
        })
        .then(response=>{
            if(!response.ok)
                throw new Error('Network response was not ok')
            return response.json()
        })
        .then(data=>{
            console.log("Success", data)
            navigate(-1);
        })
    })
    .catch(error => {
        console.error("Error submitting answers:", error);
    });
};

  return (
    <div className="container-fluid" style={{ border: '1px solid black', height: '100%' }}>
      <Scrollbars style={{ height: '80vh' }}>
        <form onSubmit={handleSubmit}>
          {quizQuestions.map((question, index) => {
            const choicesArray = question.choices.split('`');

            return (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Question {index + 1}: {question.statement}</strong>
                </div>
                <div>
                  {choicesArray.map((choice, i) => (
                    <div key={i} style={{ marginBottom: '5px' }}>
                      <input
                        type="radio"
                        id={`question-${index}-option-${i}`}
                        name={`question-${index}`}
                        value={choice}
                        checked={userAnswers[question.id] === choice}
                        onChange={() => handleOptionChange(question.id, choice)}
                      />
                      <label htmlFor={`question-${index}-option-${i}`}>{choice}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
            <MDBBtn
              type="submit"
              style={{ height: "40px", width: '125px' }}
              disabled={!formValid} // Disable button if form is not valid
            >
              Submit
            </MDBBtn>
          </div>
        </form>
      </Scrollbars>
    </div>
  );
}

export default Quiz;
