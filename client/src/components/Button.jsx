import React from 'react';

const Button = ({
    type = 'button',
    className = '',
    disabled = false,
    children,
    active = true,
    onClick = () => { }
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full min-w-[100px] sm:w-auto ${active ? "bg-green-700 hover:bg-green-800 focus:bg-green-80" : "bg-red-700 hover:bg-red-800 focus:bg-red-800"} transition-all duration-300 py-2 px-4 rounded-lg text-sm sm:text-base ${className}`}
            type={type}>
            {children}
        </button>
    );
}

export default Button;
