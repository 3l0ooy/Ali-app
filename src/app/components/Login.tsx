// pages/login.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HandleLogin from './HandleLogin';
import Style from './comp.module.css'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
    const router = useRouter();

    const onLoginClick = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission behavior
        const error = await HandleLogin(username, password);
        if (error) {
            setErrorMessage(error);
        } else {
            setIsLoggedIn(true); // Set login status to true
            // Optionally redirect to profile page or perform additional actions
            router.push("/Profile");
        }
    };

    return (
        <>
        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className={Style.imges} />

<div className={Style.container}>
    <div className="container1">
        <form onSubmit={onLoginClick}>
            <div className={Style.inputbox}>
                <input
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <span>Username</span>
                <i></i>
            </div>
            <div className={Style.inputbox}>
                <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Fixed
                />
                <span>Password</span>
                <i></i>
            </div>
            <button type="submit" className={Style.button1}>Login</button>
        </form>
        
        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
    </div>
    
</div>
</>

    );
};



export default Login;
