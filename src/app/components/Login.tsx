// pages/login.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HandleLogin from './HandleLogin';

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
        <div style={styles.container}>
                <>
                    <h2>Login</h2>
                    <form onSubmit={onLoginClick}>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                        <button type="submit" style={styles.button}>Login</button>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    input: {
        width: '300px',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Login;
