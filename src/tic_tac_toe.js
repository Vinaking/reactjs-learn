import React from "react";
import ReactDOM from 'react-dom/client';
import './tic_tac_toe.css';
import { useState } from "react";

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Board(props) {
    function renderSquare(props, i) {
        return <Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
        />;
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(props, 0)}
                {renderSquare(props, 1)}
                {renderSquare(props, 2)}
            </div>
            <div className="board-row">
                {renderSquare(props, 3)}
                {renderSquare(props, 4)}
                {renderSquare(props, 5)}
            </div>
            <div className="board-row">
                {renderSquare(props, 6)}
                {renderSquare(props, 7)}
                {renderSquare(props, 8)}
            </div>
        </div>
    );
}

const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null)
    }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    function handleClick(i) {
        console.log('current: ' + history);

        const historyCoppy = history.slice(0, stepNumber + 1);
        const current = historyCoppy[historyCoppy.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history.concat([{
            squares: squares
        }]));
        setXIsNext(!xIsNext);
        setStepNumber(history.length);
    }

    function jumpTo(step) {
        setStepNumber(step)
        setXIsNext(step % 2 === 0)
    }

    const historyCoppy = history.slice(0, stepNumber + 1);

    const moves = historyCoppy.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const current = historyCoppy[historyCoppy.length - 1];
    const squares = current.squares;
    const winner = calculateWinner(squares);

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null;
}

export default Game;
