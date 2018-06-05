import React, { Component } from 'react';
import { Button, } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import '../css/RegisterAttendance.css';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import presImage from '../img/present.png';
import sickImage from '../img/Sick_Emoji.png';
import awayImage from '../img/away.png';

class RegisterAttendance extends Component {

  //dropdown
  constructor(props) {
    super(props);
    this.getCourse = this.getCourse.bind(this);
    this.submitSelection = this.submitSelection.bind(this);
    this.onStatusClick = this.onStatusClick.bind(this);
    this.attStatus = {status: "", course: "", userId:""};
  }

    getCourse(event){
      this.props.dispatch(actions.getValue(event.target.value));
      console.log('change event');
    }


    //attendance status onclick event
      onStatusClick(e) {
        this.attStatus.status=e.target.value;
        this.attStatus.userId=this.props.profileData.sub;
        this.attStatus.date= new Date().toDateString();
        console.log(e.target.value);
      }
      submitSelection() {

        if (this.props.value) {
          console.log(this.props.value);
          this.attStatus.course=this.props.value;
          const url = "http://localhost:3001/api/create/attuser";
          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append('Accept','application/json');
          fetch(url, {
            method: "POST",
            body: JSON.stringify(this.attStatus),
            headers: headers
          }).then(()=>console.log('attendanceInfo collection updated!!!'))
          .then(()=>{
            fetch("http://localhost:3001/api/attInfo")
            .then((results)=>results.json())
            .then((results)=>{
              console.log("the result is, ", results)

              return results;
            })
          })
          .catch( err => {
            console.log("The error is ", err)
          });
        }
      }
  render() {
    console.log(this.props);
    const profile = this.props.profileData;
    return (
      <div className="container">
        <div className="profile-area">

          <Panel header="Register Your Attendance">


            <div className="row">
              <div className="float sick card">
              <img src={presImage}  className="card_img" alt="Avatar"></img>
                <div className="present">
                  <Button bsStyle="success" className="btn-width" value="Present" onClick={this.onStatusClick}>Present</Button>
                </div>
              </div>
              <div className="float ">
              <img src={sickImage}  className="card_img" alt="Avatar"></img>
                <div className="present">
                  <Button bsStyle="success" className="btn-width" value="Sick" onClick={this.onStatusClick}>Sick</Button>
                </div>
              </div>
              <div className="float">
              <img src={awayImage}  className="card_img" alt="Avatar"></img>
                <div className="present">
                  <Button bsStyle="success" className="btn-width" value="Away" onClick={this.onStatusClick}>Away</Button>
                </div>
              </div>
            </div>
            <div className="course-selection">
              <select id="lang" onChange={this.getCourse} value={this.props.value}>
                <option value="select">Select Course</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Backend Programming">Backend Programming</option>
                <option value="Research Project">Research Project</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
              </select>

            </div>
            <div>

              <Button bsStyle="warning" className="btn-margin" onClick={this.submitSelection}>
                    Submit
              </Button>

          </div>

          </Panel>

        </div>


      </div>
    );
  }
}


const mapStateToProps = state => {
  // console.log("state er:",state);
  return{
    profileData: state.profileData,
    value: state.value

  }
}
export default connect(mapStateToProps)(RegisterAttendance);
