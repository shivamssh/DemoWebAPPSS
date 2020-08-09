import React, { Component } from 'react';
import { FormErrors }  from '../Components/FormErrors'
export default class Login extends Component {
constructor(props) {
super(props);
this.state = {
    username : '',
    password : '',
    formErrors: {username: '', password: ''},
    usernameValid: false,
    passwordValid: false,
    formValid: false
}
// handle initialization activities
}
handleUserInput = (e) => {
//handle change events

const name = e.target.name;
  const value = e.target.value;
  console.log("handleChangeEvents => ",name,"---",value,e);
  this.setState({[name]: value}, 
                () => { this.validateField(name, value) });
  //
}
handleSubmitevents(e) {
// handle submit events
console.log("handleSubmitevents => ");
}



validateField(fieldName, value) {
  console.log(this.state.username, "----------------------")
  let fieldValidationErrors = this.state.formErrors;
  let usernameValid = this.state.usernameValid;
  let passwordValid = this.state.passwordValid;
switch(fieldName) {
    case 'username':
      usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
      break;
    case 'password':
      passwordValid = value.length >= 6;
      fieldValidationErrors.password = passwordValid ? '': ' is too short';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  usernameValid: usernameValid,
                  passwordValid: passwordValid
                }, this.validateForm);
}
validateForm() {
    console.log('validateForm');
  this.setState({formValid: (this.state.usernameValid &&
                            this.state.passwordValid)});
}

errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
}
render() {
return (
<div className=" TestLoginForm ">
<div className="panel panel-default">
 <FormErrors formErrors={this.state.formErrors} />
</div>
<form onSubmit={this.handleSubmitevents}>
{
//handle error condition
}
<label htmlFor="username">User Name</label>
<input type="text" name="username" value={this.state.username} onChange={this.handleUserInput} />
<div className={`form-group
                 ${this.errorClass(this.state.formErrors.username)}`}></div>
<label htmlFor="password">Password</label>
<input type="password" name="password" value={this.state.password} onChange={this.handleUserInput} />
<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
<input type="submit" value="Log In" data-test="submit" className="btn btn-primary"
  disabled={!this.state.formValid}/>
  </div>
</form>
</div>
);
}
}