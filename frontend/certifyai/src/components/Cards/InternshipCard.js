import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
  } from 'mdb-react-ui-kit';

function InternshipCard(props) {
  return (
    <MDBCard className='custom-card' >
          <MDBCardImage    src={`data:image/jpeg;base64,${props.img}`}
    fluid alt='...'    style={{
    height: 'auto',
    maxHeight: '200px', // Adjust as needed
      objectFit: 'cover', // Ensures the image covers the area without distortion
    borderRadius: '5px'
  }}/>

      <MDBCardBody>
        <MDBCardTitle>{props.title}</MDBCardTitle>
        <MDBCardText>
          {props.detail}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default InternshipCard