import React, {useRef, useState} from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data: string[] = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {

    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef<null | HTMLHeadingElement>(null);

    const toggle = (e: React.MouseEvent, num: number): void | number => {
        if (lock || data[num] !== "") {
            return 0;
        }
        if (count%2 === 0) {
            e.currentTarget.innerHTML = `<img alt="cross" src="${cross_icon}">`;
            data[num] = "x";
            setCount(++count);
        } else {
            e.currentTarget.innerHTML = `<img alt="cross" src="${circle_icon}">`;
            data[num] = "o";
            setCount(++count);
        }
        checkWin();
    }

    const resetHandler = (): void => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        const allBoxes = document.querySelectorAll(".boxes");
        allBoxes.forEach((box: Element): void => {
            box.innerHTML = "";
        });
        setCount(0);
        if (titleRef.current) {
            titleRef.current.innerHTML = `Tic Tac Toe Game In <span>React</span>`;
        }
    }

    const checkWin = (): void => {
        if (data[8] !== "" && (
            (data[6] === data[7] && data[7] === data[8]) ||
            (data[2] === data[5] && data[5] === data[8]) ||
            (data[0] === data[4] && data[4] === data[8])
        )) {
            won(data[8]);
        } else if (data[6] !== "" && (
            (data[0] === data[3] && data[3] === data[6]) ||
            (data[2] === data[4] && data[4] === data[6])
        )) {
            won(data[6]);
        } else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2]);
        } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[5]);
        }
    }

    const won = (winner: string): void => {
        setLock(true);
        if (winner !== "" && titleRef.current) {
            titleRef.current.innerHTML = `Congratulations: <img alt="x" src=${winner === "x" ? cross_icon : circle_icon}> wins!`
        }
    }

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                <div className="row">
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 0)}}></div>
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 1)}}></div>
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 2)}}></div>
                </div>
                <div className="row">
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 3)}}></div>
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 4)}}></div>
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 5)}}></div>
                </div>
                <div className="row">
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 6)}}></div>
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 7)}}></div>
                    <div className="boxes" onClick={(e: React.MouseEvent) => {toggle(e, 8)}}></div>
                </div>
            </div>
            <button className="reset" onClick={resetHandler}>Reset</button>
        </div>
    );
};

export default TicTacToe;