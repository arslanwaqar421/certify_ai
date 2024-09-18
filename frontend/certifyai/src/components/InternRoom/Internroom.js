import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Internroom.css';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../Context';

function Internroom() {
  const [quizes, setQuizes] = useState([]);
  const navigate = useNavigate()
  const { certification_id }= useParams()
  const [showClaimCertificate, setShowClaimCertificate] = useState(false)
  const [showRegenerateMessage, setShowRegenerateMessage] = useState(false)
  const [loadingText, setLoadingText] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const [certificateData,setCertificateData] = useState(null)
  const {user,setUser} = useContext(myContext)

  useEffect(() => {
    fetchCertificationQuizes(certification_id);
  }, [certification_id]);

  useEffect(()=>{
  if( quizes.length>0 && quizes.every(quiz => quiz.status === 'attempted')){
    if (quizes.every(quiz=>quiz.score >= 5))
        setShowClaimCertificate(true)
    else
      setShowRegenerateMessage(true)
  }
    }, [quizes,certificateData])

  const displayQuiz = (quiz_id) => {
    navigate(`/quizes/${quiz_id}`)
  };

  const handleClaimCertificate = ()=>{
    console.log(certification_id)
    fetch("http://127.0.0.1:8000/usercertifications", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        "user":user.id,
        "certification": certification_id
      })
    })
    .then(response => {
      if (!response.ok)
        throw new Error('Network Response was not ok')

      return response.blob()
    })
    .then(data => {
      const imageObjectUrl = URL.createObjectURL(data);
      setShowClaimCertificate(false)
      setCertificateData(imageObjectUrl)
      console.log(data)
    })
    .catch(error => console.log('Fetch error : ', error))
  }


  const createQuizes = (id) => {
    console.log('Creating quizzes...');
    fetch(`http://127.0.0.1:8000/quizes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "certification": id,
        "difficulty": "Expert",
        "user": user.id
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log('Creating questions...');
      setLoadingText('Getting ready...');
      fetch(`http://127.0.0.1:8000/questions`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "quizzes": data,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success', data);
        fetchCertificationQuizes(certification_id);
        setShowRegenerateMessage(false);
        setShowSpinner(false); // Hide the spinner after all operations
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setShowSpinner(false); // Ensure spinner is hidden if an error occurs
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      setShowSpinner(false); // Ensure spinner is hidden if an error occurs
    });

  };

  const handleRegenerateQuizzes = () => {
    setShowSpinner(true);
    setLoadingText('Creating Personalized Quizzes for you...');

    const deleteQuiz = (quiz_id) => {
      return fetch(`http://127.0.0.1:8000/quizes/${quiz_id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    };

    // Send delete request for all quizzes
    Promise.all(quizes.map(quiz => deleteQuiz(quiz.id)))
      .then(() => {
        console.log('All quizzes deleted successfully');
        createQuizes(certification_id);
      })
      .catch(error => {
        console.error('Error deleting quizzes', error);
      });
  };

  const fetchCertificationQuizes = (id) => {
    fetch(`http://127.0.0.1:8000/users/${user.id}/certifications/${id}/quizes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setQuizes(data);
        console.log('Success from fetch', data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <>
    {showSpinner && (
  <div
    style={{
      display: "flex",
      flexDirection: "column", // Align items in a column
      justifyContent: "center",
      alignItems: "center",
      position: "relative", // Fixed to ensure it covers the whole viewport
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: Background to make spinner more visible
      zIndex: "1000" // Ensure it appears on top of other content
    }}
  >
    <div className="spinner-grow" role="status" style={{ marginBottom: "20px" }}>
      {/* Optionally, you can include additional spinner styles here */}
    </div>
    <div
      style={{
        color: '#333', // Darker color for better contrast
        fontSize: '24px', // Larger font size
        fontWeight: 'bold', // Make text bold
        textAlign: 'center', // Center align text
        borderRadius: '8px', // Rounded corners for the border
        padding: '20px',
        backgroundColor: '#fff', // White background for text container
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for better contrast
        maxWidth: '80%', // Restrict the width to make it more readable
        margin: '0 auto' // Center the text container
      }}
    >
      {loadingText}
    </div>
  </div>
)}
    {!showSpinner && <>
      {showRegenerateMessage && (
        <div style={{
          display:'flex',
          justifyContent:'space-around',
          color: 'red'
        }}>
        <p style={{ color: 'red' , fontWeight: 'bolder'}}>
          Oops looks like you did not pass all the quizes. You may regenerate the quizzes
        </p>
        <button className='custom-button' style={{width:"160px"}} onClick={handleRegenerateQuizzes}>Regenerate Quizes</button>
      </div>
      )}
      {showClaimCertificate && !certificateData &&(
        <div style={{
          display: 'flex',
          justifyContent: 'space-around', // Center horizontally
        }}>
          <p style={{color:'green', fontWeight: 'bolder'}}>Congratulations! You passed all the quizzes.</p>
          <button className='custom-button' style={{width:"160px"}} onClick={handleClaimCertificate}>
            Claim Certificate
          </button>
        </div>
      )}
        {certificateData!== null &&
        <div style={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
        }}
        >
        <a href={certificateData} download="certificate.png">
            <button className="custom-button" style={{width:'200px'}}>Download Certificate</button>
          </a>
          </div>
          }
      <ul style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "20px",
        listStyleType: "none",
        padding: "5px",
        margin: "0"
      }}>
        {quizes.length > 0 && quizes.map((quiz, index) => (
          <li key={quiz.id} style={{ flex: "0 0 48%", marginBottom: "10px" }}>
            <div className="card text-center">
              <div className="card-header">
                {`Quiz ${index + 1}`}
              </div>
              <div className="card-body" style={{ height: '160px' }}>
                <h5 className="card-title">{quiz.name}</h5>
                <p className="card-text">{quiz.details}</p>
              </div>
              <div className="card-footer text-muted">
                {quiz.status === 'notattempted' && <button className='custom-button' onClick={() => displayQuiz(quiz.id)}>
                  Start
                </button>}
                {quiz.status === 'attempted' && (
      <div style={{ display: 'flex', justifyContent:'space-around'}}>
        <p>Attempted</p>
        <p style={{ margin: 0, color: quiz.score >= 5 ? 'green' : 'red' }}>
          Score: {quiz.score}/10
        </p>
      </div>
    )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      </>}
    </>
  );
}

export default Internroom;
