import { useState } from 'react';

import './App.css';

// function App() {
//   return(
//     <div className="App">
//       <Board/>
//     </div>
//   );
// }

function Square({ value, onSquareClick }) // value и onSquareClick - это props(свойства этого Square)
{
  return (
    <button className='square' onClick={onSquareClick}>{ value }</button>  
  );
}

function Board({ xIsNext, squares, onPlay }){
  //const [onPlay, setOnPlay] = useState(true); // Хук, который меняет значение состояния возможности игры
  const [gameStatus, setGameStatus] = useState(true); // Хук, который меняет состояние строки вывода игры
  // function checkWinner(squares)
  // {
  //   const winLines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6]
  //   ];

  //   for(let i = 0; i < winLines.length; i++)
  //   {
  //      const [a, b, c] = winLines[i];
  //      if(squares[a] === squares[b] && squares[a] === squares[c] && squares[a] !== '')
  //         return squares[a];
  //   }

  //   if (!squares.includes(''))
  //   {
  //      restartGame();
  //      return 'Nobody';
  //   }
  //   return null;
  // }
  

  function onSquareClick(i){
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    onPlay = false;
    setGameStatus(winner + ' is win this game');
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
    //if (squares[i] === '' && onPlay)
    //{
      // if (xIsNext){
      //   squares[i] = 'X';
      //   setXIsNext(false);
      // }
      // else{
      //   squares[i] = 'O';
      //   setXIsNext(true);
      // }
    //}
    
    //onPlay(nextSquares);
    //afterClick();
  //}

  // function afterClick()
  // {
  //   const winner = checkWinner(squares);
  //   if (winner !== null && winner !== 'Nobody')
  //   {
  //     setOnPlay(false);
  //     setGameStatus(winner + ' is win this game');
  //   }
  //   else
  //     setGameStatus('Next turn is: ' + (xIsNext ? 'O' : 'X'));
  // }

  function restartGame()
  {
    onPlay = true;
    //squares = useState([Array(9).fill(null)]);
    setGameStatus('');
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
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
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
  return null;
}


//export default App;