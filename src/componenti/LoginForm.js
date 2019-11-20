import React from "react";
import ReactDOM from "react-dom";
import "./LoginForm.css";


const txtFieldState = {
  value: "",
  valid: true,
  typeMismatch: false,
  errMsg: "" //this is where our error message gets across
};

class App extends React.Component {
  state = {
    username: {
      ...txtFieldState,
      fieldName: "Username",
      required: true,
      requiredTxt: "Username is required"
    },
    password: {
      ...txtFieldState,
      fieldName: "Password",
      required: false,
      requiredTxt: "Password is required"
    },
    allFieldsValid: false
  };

  //we need to extract specific properties in Constraint Validation API using this code snippet
  reduceFormValues = formElements => {
    const arrElements = Array.prototype.slice.call(formElements); //we convert elements/inputs into an array found inside form element
    //we need to extract specific properties in Constraint Validation API using this code snippet
    const formValues = arrElements
      .filter(elem => elem.name.length > 0)
      .map(x => {
        const { typeMismatch } = x.validity;
        const { name, type, value } = x;
        return {
          name,
          type,
          typeMismatch, //we use typeMismatch when format is incorrect(e.g. incorrect email)
          value,
          valid: x.checkValidity()
        };
      })
      .reduce((acc, currVal) => {
        //then we finally use reduce, ready to put it in our state
        const { value, valid, typeMismatch } = currVal;
        const { fieldName, requiredTxt, formatErrorTxt } = this.state[
          currVal.name
        ]; //get the rest of properties inside the state object
        //we'll need to map these properties back to state so we use reducer...
        acc[currVal.name] = {
          value,
          valid,
          typeMismatch,
          fieldName,
          requiredTxt,
          formatErrorTxt
        };
        return acc;
      }, {});
    return formValues;
  };
  checkAllFieldsValid = formValues => {
    return !Object.keys(formValues)
      .map(x => formValues[x])
      .some(field => !field.valid);
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formValues = this.reduceFormValues(form.elements);
    const allFieldsValid = this.checkAllFieldsValid(formValues);

    //note: put ajax calls here to persist the form inputs in the database.
    //END
    this.setState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API
  };
  

  render() {
    const ErrorValidationLabel = ({ txtLbl }) => (
      <label htmlFor="" style={{ color: "red" }}>
        {txtLbl}
      </label>
    );
    const {username, password, allFieldsValid } = this.state;
    const successFormDisplay = allFieldsValid ? "block" : "none";
    const inputFormDisplay = !allFieldsValid ? "block" : "none";
//const renderEmailValidationError = email.valid ? 
       // "" : 
        //<ErrorValidationLabel txtLbl={email.typeMismatch ? email.formatErrorTxt : email.requiredTxt} />;
    const renderDateValidationError = username.valid ? "" : <ErrorValidationLabel txtLbl={username.requiredTxt} />;
    const renderFnameValidationError = password.valid ? "" : <ErrorValidationLabel txtLbl={password.requiredTxt} />;
return (
  <div className="wrapper">
        <div className="form-wrapper">
            <div>
                <img src="http://cdn.shopify.com/s/files/1/1756/9559/products/pokeball_coaster_photo_33c69500-8564-4842-a2a7-3803975a2d3b_1024x1024.jpg?v=1557064432" alt="pokeball"/>
            </div>
          <h1>Login</h1>

        <>
            <div style={{display: successFormDisplay}}>
                <h1 style={{ textAlign: "center" }}>Success!</h1>
                <p style={{ textAlign: "center" }}>
                    You have successfully Login.
                </p>
            </div>
            <div className="form-input" style={{display: inputFormDisplay}}>
                
                <form
                    className="form-inside-input"
                    onSubmit={this.onSubmit}
                    noValidate
                >
                    <input className='username' type="text" name="username" placeholder="Username" required />
                    <br />
                    {renderDateValidationError}
                    <br />
                    <input className='password' type="password" name="password" placeholder="Password" required />
                    <br />
                    {renderFnameValidationError}
                    <br />
                    
                    <div>
                    <input className='button' type="submit" value="Submit"></input>
                    </div>
                </form>
            </div>
        </>
        </div>
        </div>
    );
}
}

export default App;
