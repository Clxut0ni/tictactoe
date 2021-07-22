import React, {useState, useEffect} from "react";

function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

const Board = ({squares, onClick}) => {
    // const [renderSquares,setRenderSquare ] = useState([]);
    // const [onClicks,setOnClick ] = useState([]);
    //
    // useEffect(() => {
    //     setRenderSquare([
    //         ...renderSquares,
    //         square
    //     ]);
    // }, [square]);
    console.log('squares', squares)
    console.log('onClick', onClick)
    const renderSquare = i =>
        <Square
            value={squares[i]}
            onClick={() => {
                onClick(i)
            }}
        />;

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

const Game = () => {
        const [history, setHistory] = useState([{
            squares: Array(9).fill(null),
        }]);
    const [stepNumber, setStepNumbers] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [] = useState([]);


    const handleClick = (i) => {
        console.log('i', i)
        const history2 = history.slice(0, stepNumber + 1);
        const current2 = history[history.length - 1];
        const squares2 = current2.squares.slice();
        if (calculateWinner(squares2) || squares2[i]) {
            return;
        }
        squares2[i] = xIsNext ? 'X' : 'O';
        setHistory(history.concat([{
            squares: squares2
        }]));
        setStepNumbers(history2.length);
        setXIsNext(!xIsNext);

    }

    function jumpTo(step) {
        setStepNumbers(step);
        setXIsNext((step % 2) === 0);
    }

        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Перейти к ходу #' +move :
                'К началу игры';
            return (
                <li key={move}>
                    <button onClick={() =>
                        jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Выйграл ' + winner;
        } else {
            status = 'Следующий ход: ' + (xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
}

// ========================================

// ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
// );
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
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

export default Game;
