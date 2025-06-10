import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/userReducer';
import { useNavigate } from 'react-router-dom';

const SessionTimeout = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timeoutDuration = 15 * 60 * 1000; 

    useEffect(() => {
        const checkSession = () => {
            if (user && user.loginTime) {
                const currentTime = new Date().getTime();
                if (currentTime - user.loginTime > timeoutDuration) {
                    dispatch(logout());
                    navigate('/login');
                    alert('Your session has expired. Please log in again.');
                }
            }
        };

        const intervalId = setInterval(checkSession, 1000); 
        return () => clearInterval(intervalId);
    }, [user, dispatch, navigate, timeoutDuration]);

    return null;
};

export default SessionTimeout;