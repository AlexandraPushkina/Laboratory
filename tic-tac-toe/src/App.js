import { useState } from 'react';

import './App.css';

function Square({ value, onSquareClick }) // value и onSquareClick - это props(свойства этого Square)
{
  return (
    <button className='square' onClick={onSquareClick}>{ value }</button>  
  );
}

function Board({ xIsNext, squares, onPlay, restartGame }){
  const [gameStatus, setGameStatus] = useState(true); // Хук, который меняет состояние строки вывода игры

  function onSquareClick(i){

    const nextSquares = squares.slice();
    if (squares[i] === null){
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
    }
   afterClick(nextSquares);
  }

  function afterClick(nextSquares){
    let winner = calculateWinner(squares);
    if (winner) {
      setGameStatus(winner + ' is win this game');
      setGameStatus('');
      restartGame();
      return;
    }

    if (!winner) {
      setGameStatus('Next turn is: ' + (xIsNext ? 'O' : 'X'));
    }
    onPlay(nextSquares);  
  }

  return (
    <>
      <div className='row'>
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)}/>
      </div>
      <div className='row'>
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)}/>
      </div>
      <div className='row'>
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)}/>
      </div>
      <h5 className='status'>{ gameStatus }</h5>
      <button onClick={restartGame}>Restart!</button>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]); // Сброс истории
    setCurrentMove(0); // Сброс текущего хода
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          restartGame={restartGame} />
      </div>
      <div className="game-info">
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
      return squares[a];
    }
  }
  console.log(squares.includes(null));

  if (!squares.includes(null)){
      return 'Nobody';
  }

  return null;
}

