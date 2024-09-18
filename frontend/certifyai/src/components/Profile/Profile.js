import React, { useContext, useEffect } from 'react';
import './Profile.css'
import { useState } from 'react';
import Scrollbars from "react-custom-scrollbars-2"
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
} from 'mdb-react-ui-kit';
import { myContext } from '../../Context';

export default function Profile() {
  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const [showEditProfileForm, setShowEditProfileForm] = useState(false)
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [educations, setEducations] = useState([])
  const [skills, setSkills] = useState([])
  const [userDetails, setUserDetails] = useState({})
  const [userCertifications, setUserCertifications] = useState([])
  const {user, setUser} = useContext(myContext)
  // all useEffects

  useEffect(() => {
    console.log(user.id)
    fetchUserEducations(user.id)
    fetchUserSkills(user.id)
    fetchUserCertifications(user.id)
    fetchUserDetails(user.id)
  }, [user])

  // all  other utitlities

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleEditProfileClick = () => {
    setShowEditProfileForm(true)
  }

  const handleEditProfileFormClose = (event) => {
    event.preventDefault()
    setShowEditProfileForm(false)
  }

  const handleAddSkillsClick = () => {
    setShowSkillsForm(true);
  };

  const handleSkillsFormClose = (event) => {
    event.preventDefault()
    setShowSkillsForm(false);
  };

  const handleAddEducationClick = () => {
    setShowEducationForm(true)
  }

  const handleEducationFormClose = (event) => {
    event.preventDefault()
    setShowEducationForm(false);
  };

  const updateProfile = (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const address = event.target.address.value
    const mobile = event.target.mobile.value
    console.log("Updating for : ", user.id)
    fetch(`http://127.0.0.1:8000/details/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "address": address,
        "mobile": mobile
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        fetchUserDetails(user.id)
        console.log("Success", data)
      })
      .catch((error) => {
        console.error("Fetch error:", error)
      });

    setShowEditProfileForm(false)
  }

  const deleteEducation = (id) => {
    const confirmed = window.confirm("Do you want to delete this Education?");
    if (confirmed) {
      console.log("Deleting item with id:", id);
      fetch(`http://127.0.0.1:8000/educations/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Deleted successfully:", data);
          fetchUserEducations(user.id)
        })
        .catch(error => {
          console.error("Fetch error:", error);
        });
    } else {
      console.log("Deletion canceled");
    }
  }

  const deleteSkill = (id) => {
    const confirmed = window.confirm("Do you want to delete this Skill?");
    if (confirmed) {
      // Perform the delete operation
      console.log("Deleting item with id:", id);
      // Example: Make an API call to delete the item
      fetch(`http://127.0.0.1:8000/skillsets/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Deleted successfully:", data);
          fetchUserSkills(user.id)
        })
        .catch(error => {
          console.error("Fetch error:", error);
        });
    } else {
      console.log("Deletion canceled");
    }
  }

  const addSkill = (event) => {
    event.preventDefault()

    const skill_name = event.target.name.value
    const proficiency_level = event.target.proficiency.value
    console.log(skill_name, proficiency_level)

    if (!skill_name || !proficiency_level) {
      alert('Please fill all fields!')
    }
    else {
      fetch("http://127.0.0.1:8000/skillsets", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'name': skill_name,
          'proficiency_level': proficiency_level,
          'user': user.id
        })
      })
        .then(response => {
          if (!response.ok) {
            setShowSkillsForm(false)
            throw new Error('Network response was not ok');
          }
        })
        .then(data => {
          setShowSkillsForm(false)
          console.log("Success", data)
          fetchUserSkills(user.id)
        })
        .catch((error) => {
          setShowSkillsForm(false)
          console.error("Fetch error:", error)
        });
    }
  }

  const addEducation = (event) => {
    event.preventDefault()

    const institute_name = event.target.institute_name.value
    const degree = event.target.degree.value
    const end_year = event.target.end_year.value


    if (!institute_name || !degree || !end_year) {
      alert("Please fill all fields!")
    }
    else if (!(/^\d{4}$/.test(end_year)) && (end_year.length !== 4)) {
      alert("Add a valid year!")
    }
    else {
      fetch("http://127.0.0.1:8000/educations", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "institute_name": institute_name,
          "degree": degree,
          "end_year": end_year,
          "user": user.id
        })
      })
        .then(response => {
          if (!response.ok) {
            setShowEducationForm(false)
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setShowEducationForm(false)
          console.log("Success", data);
          fetchUserEducations(user.id)
        })
        .catch((error) => {
          setShowEducationForm(false)
          console.error("Fetch error:", error)
        });
    }
  }

  // all fetch oprations

  const fetchUserCertifications = (id) => {
    fetch(`http://127.0.0.1:8000/users/${id}/usercertifications`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then(data => {
        setUserCertifications(data)
        console.log("Success", data)
      })
      .catch((error) => console.error("Fetch error:", error))
  }

  const fetchUserEducations = (id) => {
    fetch(`http://127.0.0.1:8000/users/${id}/educations`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then(data => {
        setEducations(data)
        return console.log(data)
      })
      .catch((error) => console.error("Fetch error:", error))
  }

  const fetchUserSkills = (id) => {
    fetch(`http://127.0.0.1:8000/users/${id}/skillsets`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then(data => {
        setSkills(data)
        console.log(data)
      })
      .catch((error) => console.error("Fetch error:", error))
  }

  const fetchUserDetails = (id) => {
    fetch(`http://127.0.0.1:8000/users/${id}/details`,)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then(data => {
        setUserDetails(data)
        console.log(data)
      })
      .catch((error) => console.error("Fetch error:", error))
  }

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-2">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4" style={{ height: "100%" }}>
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="av.form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .form-container {
          background: white;
          padding: 20px;
          border-radius: 5px;
          width: 300px;
        }atar"
                  className="rounded-circle"
                  style={{ width: '150px', border: '1px solid black' }}
                  fluid
                />
                <p className="text-muted mb-1 mt-2">{userDetails.role}</p>
                <p className="text-muted mb-2">{userDetails.address}</p>
                <button onClick={handleEditProfileClick} className='custom-button' style={{ width: '110px' }}>Edit Profile</button>
                <div className="text-primary font-italic me-1" style={{ marginBottom: "5px", marginTop: "10px" }}><b>Certifications</b></div>
                <MDBListGroup flush className="rounded-3" >
                  <Scrollbars
                    style={{ position: "relative", height: "200px" }}
                  >
                    {userCertifications.length === 0 && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        borderRadius: '5px',
                        padding: '20px',
                        color: '#6c757d',
                        fontStyle: 'italic'
                      }}>
                        No Certifications yet!
                      </div>)}
                    {userCertifications.length > 0 && userCertifications.map(item => {
                      return <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fa icon="fas fa-award" style={{ color: '#55acee' }} />
                        <MDBCardText><b>{item.certification_name}</b></MDBCardText>
                      </MDBListGroupItem>
                    })}
                  </Scrollbars>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.mobile}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6" >
                <MDBCard className="mb-4 mb-md-0" >
                  <MDBCardBody>
                    <MDBCardText className='text-center'><span className="text-primary font-italic me-1"><b>Educational Background</b></span></MDBCardText>
                    <Scrollbars
                      style={{ position: "relative", height: "200px" }}
                    >
                      {educations.length === 0 && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #dee2e6',
                          borderRadius: '5px',
                          padding: '20px',
                          color: '#6c757d',
                          fontStyle: 'italic'
                        }}>
                          No Education to show
                        </div>
                      )}
                      {educations.length > 0 &&
                        educations.map((edu, i) => {
                          return (
                            <li key={i}
                              onClick={() => deleteEducation(edu.id)}
                              style={{
                                marginBottom: "5px",
                                border: '1px solid',
                                borderRadius: '5px',
                                borderColor: "gray",
                                cursor: 'pointer', // Show a pointer cursor on hover
                                transition: 'background-color 0.3s', // Smooth transition for hover effect
                              }}
                              className="p-2 d-flex justify-content-between align-items-center list-item">
                              <div className="d-flex justify-content-between" style={{ flex: 1 }}>
                                <div className="d-flex flex-row">
                                  <div>
                                    <p className="fw-bold mb-0">{edu.degree}</p>
                                    <p class="small text-muted">Institute : {edu.institute_name}</p>
                                  </div>
                                </div>
                                <div className="">
                                  <p className="small text-muted mb-1">{edu.end_year}</p>
                                </div>
                              </div>
                            </li>)
                        })
                      }
                    </Scrollbars>
                    <button onClick={handleAddEducationClick} className='custom-button' style={{ marginTop: '10px' }}>
                      Add Education
                    </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className='text-center'><span className="text-primary font-italic me-1"><b>Skills</b></span></MDBCardText>
                    <Scrollbars
                      style={{ position: "relative", height: "200px" }}
                    >
                      {skills.length === 0 && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #dee2e6',
                          borderRadius: '5px',
                          padding: '20px',
                          color: '#6c757d',
                          fontStyle: 'italic'
                        }}>
                          No Skills to show
                        </div>
                      )}
                      {skills.length > 0 && skills.map((skill, index) => {
                        return (
                          <li key={index} onClick={() => deleteSkill(skill.id)}
                            style={{
                              cursor: 'pointer',
                              marginBottom: "5px",
                              border: '1px solid',
                              borderRadius: '5px',
                              borderColor: "gray"
                            }}
                            className="list-item p-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between" style={{ flex: 1 }}>
                              <div className="d-flex flex-row">
                                <div>
                                  <p className="fw-bold mb-0">{skill.name}</p>
                                  <p class="small text-muted">Proficiency : {capitalizeFirstLetter(skill.proficiency_level)}</p>
                                </div>
                              </div>
                            </div>
                          </li>)
                      })}
                    </Scrollbars>
                    <button onClick={handleAddSkillsClick} className='custom-button' style={{ marginTop: '10px' }}>
                      Add Skill
                    </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {showSkillsForm && (
        <div className="form-overlay">
          <div className="form-container">
            <form onSubmit={addSkill}>
              <MDBInput placeholder="Skillset" className="mb-3" name='name' />
              <div class="custom-select-container">
                <label className="text-muted">Proficiency Level</label>
                <select id="proficiency" name="proficiency">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <MDBBtn type="submit" style={{ height: "40px", width: '125px' }}>Submit</MDBBtn>
                <MDBBtn color="secondary" onClick={handleSkillsFormClose} style={{ height: "40px", width: "125px" }}>
                  Close
                </MDBBtn>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEducationForm && (
        <div className="form-overlay">
          <div className="form-container">
            <form onSubmit={addEducation}>
              <label>Institute Name</label>
              <MDBInput className="mb-3" type='text' name='institute_name' />

              <label>Degree</label>
              <MDBInput className="mb-3" type='text' name='degree' />

              <label>Year Completed</label>
              <MDBInput className="mb-3" type='text' maxLength={4} name='end_year' />
              <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <MDBBtn type="submit" style={{ height: "40px", width: '125px' }}>Submit</MDBBtn>
                <MDBBtn color="secondary" onClick={handleEducationFormClose} style={{ height: "40px", width: "125px" }}>
                  Close
                </MDBBtn>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditProfileForm && (
        <div className="form-overlay">
          <div className="form-container">
            <form onSubmit={updateProfile}>
              <label>Full Name</label>
              <MDBInput className="mb-3" type='text' maxLength={30} minLength={1} defaultValue={userDetails.name} name='name' />

              <label>Mobile</label>
              <MDBInput className="mb-3" type='numbers' minLength={11} maxLength={11} defaultValue={userDetails.mobile} name='mobile' />

              <label>Address</label>
              <MDBInput className="mb-3" type='text' maxLength={100} defaultValue={userDetails.address} name='address' />
              <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <MDBBtn type="submit" style={{ height: "40px", width: '125px' }}>Submit</MDBBtn>
                <MDBBtn color="secondary" onClick={handleEditProfileFormClose} style={{ height: "40px", width: "125px" }}>
                  Close
                </MDBBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}