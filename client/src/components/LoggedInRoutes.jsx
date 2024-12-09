import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const LoggedInRoutes = ({ children }) => {

    const navigate = useNavigate();
    const { token, user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!token || !user) {
            navigate('/home')
            return
        }
    }, [token])

    return (
        <div className='px-4'>
            <Navbar />
            {children}
        </div>
    )
}

export default LoggedInRoutes