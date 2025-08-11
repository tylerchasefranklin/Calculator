import React, { useState } from "react";


import Calculator from "./components/Calculator.jsx";
import Container from "./components/Container.jsx";
import Display from "./components/Display.jsx";
import Button from "./components/Button.jsx";

// Sets the values for the buttons in arrays to be mapped through and rendered
const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

// takes number and converts it to a string, which allows commas to be inserted for bigger numbers
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

// takes converted string and removes commas to for it to be converted back into a number
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

//  initializes the app
const App = () => {

    // Set states to empty and 0 for sign operation, number, and result
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });

    // Click Functions

    // handles clicks for buttons that are numbers
    const numberClick = (e) => {
        // prevents from running until being clicked
        e.preventDefault();
        // targets the value of the HTML element clicked
        const value = e.target.innerHTML;

        if (removeSpaces(calc.num).length < 16) {
            setCalc({
              ...calc,
              num:
                calc.num === 0 && value === "0"
                  ? "0"
                  : removeSpaces(calc.num) % 1 === 0
                  ? toLocaleString(Number(removeSpaces(calc.num + value)))
                  : toLocaleString(calc.num + value),
              res: !calc.sign ? 0 : calc.res,
            });
          }
    };

    // handles decimal points
    const decimalClick = (e) => {
        // prevents from running until being clicked
        e.preventDefault();
        // targets the value of the HTML element clicked
        const value = e.target.innerHTML;

        // adds decimal point to the value and makes sure there are no more than one per value
        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };

    // handles operations
    const operationClick = (e) => {
        // prevents from running until being clicked
        e.preventDefault();
        // targets the value of the HTML element clicked
        const value = e.target.innerHTML;

        // sets the sign of the operation selected, makes sure there are no repeats
        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    };

    // handles equals sign
    const equalsClick = () => {

        // if there is a sign and number selected run operation
        if(calc.sign && calc.num) {
            const math = (x,y,sign) =>

                // if sign is +, add two numbers
                sign === "+"
                    ? x + y
                // if sign is -, subtract two numbers
                    : sign === "-"
                    ? x - y
                // if sign is X, multiply two numbers
                    :sign === "X"
                    ? x * y
                // otherwise divide two numbers
                    : x / y;
            
            // Makes sure there are no repeated calls and numbers are divided by 0
            setCalc({
                ...calc,
                res:
                  calc.num === "0" && calc.sign === "/"
                    ? "Can't divide with 0"
                    : toLocaleString(
                        math(
                          Number(removeSpaces(calc.res)),
                          Number(removeSpaces(calc.num)),
                          calc.sign
                        )
                      ),
                sign: "",
                num: 0,
              });
        }
    };

    // handles negative values
    const negativeClick = () => {
        // checks to see if there is an entered or calculated value and multiplies it by negative 1
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
    };

    // handles percent values
    const percentClick = () => {
        // sets variables for storing numbers and calculated results
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    //  checks to see if theres an entered or calculated value and uses Math.pow() to calculate percentage 
    setCalc({
        ...calc,
        num: (num /= Math.pow(100, 1)),
        res: (res /= Math.pow(100, 1)),
        sign: "",
        });
    };

    // handles clear button
    const clearClick = () => {
        // returns all values back to 0
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return (
        // Component Rendering

        // Renders Calculator Component
        <Calculator>

            {/* Renders Display Component, receives props to display the number that is typed in or the calculated result if the equal button is pressed */}
            <Display value={calc.num ? calc.num : calc.res} />

            {/* Renders Container Component for Buttons */}
            <Container>
                {
                // maps over button values array and renders a button for each value 
                btnValues.flat().map((btn, i) => {
                    return (
                    <Button
                        key={i}
                        className={btn === "=" ? "equals" : ""}
                        value={btn}
                        onClick={
                            // if C is clicked, run clearClick function
                            btn === "C"
                            ? clearClick
                            // if +/- is clicked, run negativeClick function
                            : btn === "+-"
                            ? negativeClick
                            // if % is clicked, run percentClick function
                            : btn === "%"
                            ? percentClick
                            // if = is clicked, run equalsClick function
                            : btn === "="
                            ? equalsClick
                            // if +,-,/, or X is clicked, run operationClick function
                            : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                            ? operationClick
                            : btn === "."
                            // if . is clicked, run decimalClick function
                            ? decimalClick
                            // otherwise run numberClick function
                            : numberClick
                        }
                    />
                    );
                })}
            </Container>
        </Calculator>
    );
};

export default App;