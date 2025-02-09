import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex flex-col sm:flex-row items-center justify-between py-4 px-5 sm:px-8 bg-gray-900 text-white w-full'>
            <Link to={'/'} className='text-2xl sm:text-4xl font-bold font-mono'>
                MindQuest
            </Link>
            
            <div className='flex gap-4 sm:gap-6 mt-3 sm:mt-0 text-lg sm:text-xl'>
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-green-500 font-semibold' : 'text-gray-300 hover:text-green-400'}>
                    Home
                </NavLink>
                <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'text-green-500 font-semibold' : 'text-gray-300 hover:text-green-400'}>
                    Dashboard
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;