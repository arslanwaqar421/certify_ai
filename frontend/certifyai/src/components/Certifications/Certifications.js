import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import image from '../../assets/images/tutor.png'
import Scrollbars from 'react-custom-scrollbars-2'
import InternshipCard from '../Cards/InternshipCard'
import { myContext } from '../../Context';


function Certifications() {

  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const [certifications, setCertifications] = useState([])
  const { user, setUser } = useContext(myContext)

  useEffect(() => {
    fetchCertifications()
  }, [])

  const createQuizesNavigate = (id) => {
    console.log("User", user.id)
    fetch(`http://127.0.0.1:8000/users/${user.id}/certifications/${id}/quizes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0){
          navigate(`/certifications/${id}/quizes`)
        }
        else{
          setShowSpinner(true)
    setLoadingText('Creating Personalized Quizzes for you...')
    console.log('creating quizzes')
    fetch(`http://127.0.0.1:8000/quizes`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "certification": id,
        "difficulty": "Expert",
        "user": user.id
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        console.log("Data" , data)
          console.log('creating questions')
        setLoadingText('Getting ready...')
        fetch(`http://127.0.0.1:8000/questions`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            "quizzes": data
          })
        })
          .then(response => {
            if (!response.ok)
              throw new Error('Network response was not ok')
            return response.json()
          })
          .then(data => {
            console.log('Success', data)
            setShowSpinner(false)
            navigate(`/certifications/${id}/quizes`)
          })
          .catch((error) => {
            console.error("Fetch error:", error)
          })
      })
      .catch((error) => {
        console.error("Fetch error:", error)
      })
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  const fetchCertifications = () => {
    fetch("http://127.0.0.1:8000/certifications")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setCertifications(data)
        console.log("Certifications", data)
      })
      .catch((error) => {
        console.error("Fetch error:", error)
      });
  }

  return (<>
    {!showSpinner && (
      <Scrollbars style={{ position: "relative" }}>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            gap: "20px",  // Optional: Adds space between rows and columns
            listStyleType: "none", // Removes bullets
            padding: "5px",
            margin: "0"
          }}
        >
          {certifications && certifications.map((item) => (
            <li key={item.id} onClick={() => createQuizesNavigate(item.id)}>
              <InternshipCard img={item.image} title={item.name} />
            </li>
          ))}
        </ul>
      </Scrollbars>
    )}
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
  </>
  )
}

export default Certifications