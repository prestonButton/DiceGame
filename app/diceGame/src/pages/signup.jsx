import react from 'react'
import RegisterForm from '../components/RegisterForm';



const Signup = () => {
    
    return (
      <div>
        <div className="h-screen bg-gradient-to-br from-blue-400 via-purple-600 to-pink-500 flex items-center justify-center text-white">
          <RegisterForm />
        </div>
      </div>
    );
}

export default Signup