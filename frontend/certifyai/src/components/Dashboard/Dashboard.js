import React from "react";
import Card from "../Cards/Card";
import { useNavigate } from "react-router-dom";
import tutorImg from "../../assets/images/tutor.png"
import plannerImg from "../../assets/images/guide.png"
import internImg from "../../assets/images/internship.png"
function Dashboard() {
    
    const tutorDetails = "Chat with our AI based bot that assists users in learning various topics by providing tutorials and interactive learning experiences."
    const plannerDetails = "Meet our Career guide to explore career paths, setting goals, and creating personalized plans for professional growth."
    const InternGuide = "Our supervisor bot that creates quizzes, grades them, and helps users assess their knowledge and skills effectively."
    const navigate = useNavigate()

  
    return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Dashboard</h1>
      <div className="row" style={{display:"flex", justifyContent: "space-evenly"}}>

        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Earnings (Monthly)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings (Annual) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Earnings (Annual)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Requests
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Card img = {tutorImg} title = "TutorBot"  detail ={tutorDetails}/>
        <Card img = {plannerImg} title = "CareerBot" detail ={plannerDetails} />
        <Card img = {internImg} title = "Internship" detail = {InternGuide} method={()=>navigate('/certifications')}/>
      </div>
    </div>
  );
}

export default Dashboard;
