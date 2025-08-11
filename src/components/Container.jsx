import React from "react";
import "./Container.css";

// Container that holds buttons for calculator
const Container = ({ children }) => {
    return <div className="container">{children}</div>;
};

export default Container;