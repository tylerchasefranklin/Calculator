import React from "react";
import { Textfit } from "react-textfit";
import "./Display.css";

const Display = ({ expression, value }) => {
    return (
        <div className="display-wrapper">
            <div className="expression">{expression}</div>
            <Textfit className="display" mode="single" max={70}>
                {value}
            </Textfit>
        </div>
    );
};

export default Display;