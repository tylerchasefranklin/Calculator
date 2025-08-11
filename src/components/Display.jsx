import React from "react";
import { Textfit } from "react-textfit";
import "./Display.css";

const Display = ({ value }) => {
    return (
        // Display output resize, longer values shrink in size
        <Textfit className="display" mode="single" max={70}>
            {value}
        </Textfit>
    );
};

export default Display;