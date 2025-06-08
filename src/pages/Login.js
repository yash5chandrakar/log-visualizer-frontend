import { Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isLoggedIn } from '../common/commonMethods';

export const Login = (props) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const isUserLoggedIn = isLoggedIn();

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle login logic here
        const confirmEmail = 'test1234@gmail.com';
        const confirmPassword = 'test1234';
        setLoading(true)
        if (email?.trim() === confirmEmail && password === confirmPassword) {
            setTimeout(() => {
                toast.success("Login Successful!")
                const userData = {
                    email: email,
                    isLoggedIn: true,
                    questionsRead: [],
                    topicsRead: [],
                }
                localStorage.setItem("userData", JSON.stringify(userData))
                navigate("/dashboard")
            }, 1000)
        } else {
            toast.error("Invalid Credentials! Please try again.")
            setLoading(false)
            return;
        }
    };

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/dashboard")
        }
    }, [isUserLoggedIn])

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                {loading ? (
                    <div><Spin /></div>
                ) : (
                    <button type="submit" style={styles.button} disabled={loading}>
                        Login
                    </button>
                )}
            </form>
            <div className='mt-4'>
                <Tooltip title="Email: test1234@gmail.com Password: test1234" >ⓘ</Tooltip>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        width: '400px',
        margin: '100px auto',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderTop: '4px solid rgba(22, 156, 223)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        padding: '10px',
        fontSize: '16px'
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};
