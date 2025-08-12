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

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });
    // NEW: Expression state
    let [expression, setExpression] = useState("");

    // handles clicks for buttons that are numbers
    const numberClick = (e) => {
        e.preventDefault();
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
            // Update expression if not after equals
            setExpression(prev =>
                (calc.sign && calc.num === 0)
                    ? prev + value
                    : prev === "" && value === "0"
                        ? "0"
                        : prev + value
            );
        }
    };

    const decimalClick = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (!calc.num.toString().includes(".")) {
            setCalc({
                ...calc,
                num: calc.num + value,
            });
            setExpression(prev => prev + value);
        }
    };

    const operationClick = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });

        // Only add operation if last char isn't already an operator
        setExpression(prev => {
            if (!prev) return "";
            const lastChar = prev.slice(-1);
            if (["/", "X", "-", "+"].includes(lastChar)) {
                return prev.slice(0, -1) + value;
            }
            return prev + value;
        });
    };

    const equalsClick = () => {
        if (calc.sign && calc.num) {
            const math = (x, y, sign) =>
                sign === "+"
                    ? x + y
                    : sign === "-"
                    ? x - y
                    : sign === "X"
                    ? x * y
                    : x / y;

            const result =
                calc.num === "0" && calc.sign === "/"
                    ? "Can't divide with 0"
                    : toLocaleString(
                        math(
                            Number(removeSpaces(calc.res)),
                            Number(removeSpaces(calc.num)),
                            calc.sign
                        )
                    );

            setCalc({
                ...calc,
                res: result,
                sign: "",
                num: 0,
            });
            // Expression: show full evaluation
            setExpression(
                prev => prev + "=" + result
            );
        }
    };

    const negativeClick = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
        // Not updating expression for sign flip (could be enhanced)
    };

    const percentClick = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
        setExpression(prev => prev + "%");
    };

    const clearClick = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
        setExpression("");
    };

    return (
        <Calculator>
            {/* Pass expression as prop */}
            <Display
                value={calc.num ? calc.num : calc.res}
                expression={expression}
            />
            <Container>
                {btnValues.flat().map((btn, i) => {
                    return (
                        <Button
                            key={i}
                            className={btn === "=" ? "equals" : ""}
                            value={btn}
                            onClick={
                                btn === "C"
                                ? clearClick
                                : btn === "+-"
                                ? negativeClick
                                : btn === "%"
                                ? percentClick
                                : btn === "="
                                ? equalsClick
                                : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                ? operationClick
                                : btn === "."
                                ? decimalClick
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