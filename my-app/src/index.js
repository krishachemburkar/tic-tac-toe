import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// let count_x = 0;
// let count_o = 0;
// class Square extends React.Component {
//   // constructor(props){
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//     render() {
//       return (
//         <button className="square" onClick={()=> this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }
function Square(props){
  return(
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}
  
class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true, 
        count_x: 0, 
        count_o: 0,
      };
    }
    handleClick(i){
      const squares = this.state.squares.slice();
      
      if (calculateWinner(squares)|| squares[i]){
        squares[i]=null;
        return;
      }
      
      squares[i]= this.state.xIsNext?'X':'O';
      this.setState({
        squares:squares,
        xIsNext: !this.state.xIsNext,
        // count_x: 0, 
        // count_o: 0,
      });
      
    }
    renderSquare(i) {
      return <Square 
      value  = {this.state.squares[i]}
      onClick = {() => this.handleClick(i)}
      />;
    }
  
    render() {
      // let count_x =0;
      // let count_y =0;
      const winner = calculateWinner(this.state.squares);
      const count = tie(this.state.squares);
      let status;
    
      if (winner){
        status = "Winner: "+ winner;
        reload(this.state.squares)
        if (winner==="X"){
          this.state.count_x = this.state.count_x+1;
          // console.log(this.state.count_x)
        }
        if (winner==="O"){
          this.state.count_o = this.state.count_o+1;
        }
      } else{
        status = 'Next player: '+(this.state.xIsNext? 'X':'O');
      }
      if (count===9){
        reload(this.state.squares)
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <div className='player'>
            <table>
              <tr>
                <th className='players'>Player X</th>
                <th>|</th>
                <th className='players'>Player O</th>
              </tr>
              <tr>
                <td className='players'>{this.state.count_x}</td>
                <td>|</td>
                <td className='players'>{this.state.count_o}</td>
              </tr>
            </table>
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        
        <div className="game">
          
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  // class Player extends React.Component {
  //   render() {
  //     return (
  //       <div></div>
  //     );
  //   }
  // }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (let i = 0; i<lines.length; i++){
      const [a,b,c] = lines[i];
      if (squares[a]===squares[b] && squares[a]===squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  function reload(squares){
    for (let i = 0; i<9; i++){
       squares[i]=null;
     }
  }

  function tie(squares){
    let count = 0;
    for (let i =0; i<9; i++){
      if (squares[i]!= null){
        count = count+1;
      }
    }
    return count
  }


  // function count(winner, count_o, count_x){ 
  //   if (winner === "X"){
  //     count_x = count_x + 1;
  //     return count_x;
  //   }
  //   else{
  //     count_o = count_o + 1;
  //     return count_o;
  //   }
  // }