import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import '../css/Profile.css';
import { connect } from 'react-redux';

class Profile extends Component {

  render() {
    console.log(this.props);
    const profile = this.props.profileData;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("The state is: ",state);
  return{
    profileData: state.profileData
  }
}
export default connect(mapStateToProps)(Profile);
