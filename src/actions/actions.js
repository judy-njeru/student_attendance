import * as actionTypes from "../actionTypes/actionTypes";

export const createProfile = (profileData)=>{

  const url = "http://localhost:3001/api/createuser";
  console.log("The profileData is: ",profileData)
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append('Accept','application/json');
  fetch(url, {
    method: "POST",
    body: JSON.stringify(profileData),
    headers: headers
  }).then(()=>console.log('updated!!!'))
  .catch( err => {
    console.log("The error is ", err)
  });

  return {
    type: actionTypes.CREATE_PROFILE,
    profileData: profileData
  }
}

export const getValue = (value)=>{

console.log("inside getValue", value);
  return{

    type: actionTypes.SUBMIT_DATA,
    value: value
  }
}
