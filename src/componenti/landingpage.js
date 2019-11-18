import React from 'react';
import LoginForm from './LoginForm';
import SignIn from './SignIn';
import './LoginForm.css'

class LandingPage extends React.Component {
    render() {
        return(
            <div>
            <LoginForm />
            <SignIn />
            </div>
        )
    }
} export default LandingPage