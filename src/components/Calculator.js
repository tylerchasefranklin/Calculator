import React from "react";
import "./Calculator.css";

// Container for Calculator 
const Calculator = ({ children }) => {
    return <div className="calculator">{children}</div>;
};

export default Calculator;