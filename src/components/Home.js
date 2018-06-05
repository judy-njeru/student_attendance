import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

class Home extends Component {

  componentWillMount() {
    this.state = {};
    fetch("http://localhost:3001/api/att")
    .then(result=>{
      return result.json();
    })
    .then(result=>{
      this.setState({data: result});
    })
    const createProfile = bindActionCreators(actions.createProfile, this.props.dispatch);

    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile && this.props.auth.isAuthenticated()) {
      getProfile((err, profile) => {
        createProfile(profile);

      });
    } else{
      createProfile(userProfile);
    }
  }
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div>
              <h4>
                  You are logged in! You can now view your{' '}

                  <Link to="profile">profile area</Link>.

              </h4>

            </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
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
export default connect(mapStateToProps)(Home);
