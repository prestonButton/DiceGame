import React from 'react'
import LoginForm from '../components/LoginForm';


const Login = () => {

    return (
      <div>
        <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 flex items-center justify-center text-white">
            <LoginForm />
        </div>
      </div>
    );
}

export default Login