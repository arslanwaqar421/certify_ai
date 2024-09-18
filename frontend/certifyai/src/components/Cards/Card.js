import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import './Card.css'; // Make sure to import your CSS file

export default function Card(props) {
  return (
    <MDBCard className='custom-card' onClick={props.method}>
        <MDBCardImage src={props.img} fluid alt='...'    style={{ 
    height: 'auto', 
    maxHeight: '200px', // Adjust as needed
    objectFit: 'cover', // Ensures the image covers the area without distortion
  }}/>

      <MDBCardBody>
        <MDBCardTitle>{props.title}</MDBCardTitle>
        <MDBCardText>
          {props.detail}
        </MDBCardText>
        <button className='custom-button' onClick={props.method}>Go</button>
      </MDBCardBody>
    </MDBCard>
  );
}
