import { useLocation } from 'react-router-dom'
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { logout } from '../services/operations/AuthAPIs'
import { useDispatch, useSelector } from 'react-redux'

const DashboardLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.auth);

    return (
        <section className='px-4 sm:px-6'>
            <div className='flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 py-3 px-4 my-3 text-lg bg-slate-900 rounded-lg border border-slate-600'>
                {/* Navigation Links */}
                <span className='flex flex-wrap justify-center space-x-1 md:space-x-3 text-sm md:text-base'>
                    <NavLink to="/dashboard" 
                        className={`hover:bg-slate-700 transition-all duration-300 px-3 py-1 rounded-full ${location.pathname === "/dashboard" && "bg-slate-600"}`}>
                        Profile
                    </NavLink>
                    {user.role === "admin" ? (
                        <>
                            <Link to="/dashboard/create-quiz" 
                                className={`hover:bg-slate-700 transition-all duration-300 px-3 py-1 rounded-full ${location.pathname.includes("create") && "bg-slate-600"}`}>
                                Create
                            </Link>
                            <Link to="/dashboard/quizes" 
                                className={`hover:bg-slate-700 transition-all duration-300 px-3 py-1 rounded-full ${location.pathname.includes("quizes") && "bg-slate-600"}`}>
                                Quizes
                            </Link>
                        </>
                    ) : (
                        <Link to="/dashboard/history" 
                            className={`hover:bg-slate-700 transition-all duration-300 px-3 py-1 rounded-full ${location.pathname.includes("history") && "bg-slate-600"}`}>
                            History
                        </Link>
                    )}
                </span>

                {/* Logout Button */}
                <span className="mt-2 md:mt-0">
                    <Button active={false} onClick={() => logout(dispatch, navigate)}>
                        Logout
                    </Button>
                </span>
            </div>

            {children}
        </section>
    );
};

export default DashboardLayout;
