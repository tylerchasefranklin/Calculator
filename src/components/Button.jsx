import React from "react";
import "./Button.css";

// Component for buttons that receive a class name, value, and onClick method as props from Container component
const Button = ({ className, value, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
};

export default Button;