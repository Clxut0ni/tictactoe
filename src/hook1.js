import React, {useState, useEffect, useReducer} from "react";

function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

const Board = ({squares, onClick}) => {
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
const initialState = {
    history: [{
        squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true
};
const reducer = (state, action) => {

    switch (action.type) {

        case 'setHistory':
            return {
            ...state,
            history: action.history
        };
        case 'setStepNumber': return {
            ...state,
            stepNumber: action.stepNumber
        };
        case 'setXIsNext': return {
            ...state,
            xIsNext: action.xIsNext
        };
    }
};

const Game = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClick = (i) => {

        const current2 = state.history[state.history.length - 1];
        const squares2 = current2.squares.slice();

        if (calculateWinner(squares2) || squares2[i]) {
            return;
        }
        const newHistory = state.history.concat([{
            squares: squares2
        }]);

        squares2[i] = state.xIsNext ? 'X' : 'O';
        dispatch({
            type: 'setHistory',
            history: newHistory
        });
        dispatch({
            type: 'setStepNumber',
            stepNumber: newHistory.length-1
        });
        dispatch({
            type: 'setXIsNext',
            xIsNext:!state.xIsNext
        });

    }

    function jumpTo(step) {
        dispatch({
            type: 'setStepNumber',
            stepNumber: step


        });
        dispatch({
            type: 'setXIsNext',
            xIsNext: (step % 2) === 0


        });
    }

    const [current, setCurrent] = useState(state.history[state.stepNumber]);


    useEffect(() => {
        setCurrent(state.history[state.stepNumber]);
    }, [state.history, state.xIsNext]);


        const winner = calculateWinner(current.squares);

        const moves = state.history.map((step, move) => {
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
            status = 'Следующий ход: ' + (state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={handleClick}

                    />
                </div>
                <div>сейчас: {state.stepNumber}</div>
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
