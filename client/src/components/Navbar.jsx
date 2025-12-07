import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex flex-col sm:flex-row items-center justify-between py-3 px-4 sm:px-6'>
            <Link to={"/"} className='text-xl sm:text-3xl font-bold font-mono'>
            Electronica 22.0
            </Link>
            
            <div className='flex gap-3 sm:gap-5 mt-2 sm:mt-0'>
                <NavLink to={"/"} className={({ isActive }) => isActive ? "text-green-600" : "text-white"}>
                    Home
                </NavLink>
                <NavLink to={"/dashboard"} className={({ isActive }) => isActive ? "text-green-600" : "text-white"}>
                    Dashboard
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
