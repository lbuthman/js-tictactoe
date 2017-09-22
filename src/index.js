import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      <img className="img-thumbnail" src={props.value} alt="" height="90" width="100"/>
    </button>
  );
}

function Status(props) {
  return (
    <section className="col-xs-12 text-center">
      <h5 className="batman-wins game-status">Batman's Wins: {props.batmanWins} </h5>
      <h5 className="joker-wins game-status">Joker's Wins: {props.jokerWins} </h5>
      <h5 className="turn game-status">{props.nextTurn}</h5>
    </section>
  );
}

function Controls(props) {
  return (
    <section className="col-xs-12 text-center">
      <button className="btn btn-primary reset" onClick={props.onClickPlayAgain}>
        Play Again</button>
      <button className="btn btn-primary reset" onClick={props.onClickStartOver}>
        Start Over</button>
    </section>
  );
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      currentToken: "",
      batmanToken: "https://cdn4.iconfinder.com/data/icons/heros/100/Super_Hero_1-512.png",
      jokerToken: "https://maxcdn.icons8.com/Color/PNG/512/Cinema/joker_suicide_squad-512.png",
      batmanWins: 0,
      jokerWins: 0,
      squares: Array(9).fill(null),
      nextTurn: "Batman's Turn",
      isBatmansTurn: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderStatus() {
    return (
      <Status
        batmanWins={this.state.batmanWins}
        jokerWins={this.state.jokerWins}
        nextTurn={this.state.nextTurn}
      />
    );
  }

  render(props) {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="col-xs-12 text-center">
        {this.renderStatus()}
        <table className="background">
          <tr id="top">
            <td className="square right bottom">{this.renderSquare(0)}</td>
            <td className="square right bottom">{this.renderSquare(1)}</td>
            <td className="square bottom">{this.renderSquare(2)}</td>
          </tr>
          <tr id="middle">
            <td className="square right bottom">{this.renderSquare(3)}</td>
            <td className="square right bottom">{this.renderSquare(4)}</td>
            <td className="square bottom">{this.renderSquare(5)}</td>
          </tr>
          <tr id="bottom">
            <td className="square right">{this.renderSquare(6)}</td>
            <td className="square right">{this.renderSquare(7)}</td>
            <td className="square">{this.renderSquare(8)}</td>
          </tr>
        </table>
      </div>
    );
  }
}

function ModeDialog(props) {
  return (
    <section className="choose">
      <div className="col-xs-12 text-center">
        <h3>Why so serious?</h3>
        <button className='btn btn-default mode choose-button' onClick={props.onClickSingleMode}>
          One Player</button>
        <button className='btn btn-default mode choose-button' onClick={props.onClickDualMode}>
          Two Players</button>
      </div>
    </section>
  );
}

function TokenDialog(props) {
  return (
    <section className="choose">
      <div className="col-xs-12 text-center">
        <h3>Gotham needs you.</h3>
        <button className="btn btn-default token choose-button" onClick={props.onClickTokenBatman}>
          Play as Batman</button>
        <button className="btn btn-default token choose-button" onClick={props.onClickTokenJoker}>
          Play as Joker</button>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header>
      <div className="col-xs-12 text-center">
        <p className="title">Tic Tac Toe</p>
        <p className="description">Batman vs. Joker</p>
      </div>
    </header>
  );
}

class WindowSequence extends React.Component {
  constructor() {
    super();
    this.state = {
      showModeDialog: true,
      showTokenDialog: false,
      showBoard: false,
      showStatus: false,
      showControls: false,
      mode: "singlePlayer",
      token: "",
    }
  }

  handleSingleMode() {
    this.setState({
      mode: "singlePlayer",
      showModeDialog: false,
      showTokenDialog: true,
    });
  }
  handleDualMode() {
    this.setState({
      mode: "dualPlayer",
      showModeDialog: false,
      showTokenDialog: true,
    });
  }

  handleTokenBatman() {
    this.setState({
      token: "Batman",
      showTokenDialog: false,
      showBoard: true,
      showStatus: true,
      showControls: true,
    });
  }
  handleTokenJoker() {
    this.setState({
      token: "Joker",
      showTokenDialog: false,
      showBoard: true,
      showStatus: true,
      showControls: true,
    });
  }

  handlePlayAgain() {
    // TODO
  }
  handleStartOver() {
    //  TODO
  }

  renderTokenDialog() {
    return (
      <TokenDialog
        onClickTokenBatman={() => this.handleTokenBatman()}
        onClickTokenJoker={() => this.handleTokenJoker()}
      />
    )
  }

  renderModeDialog() {
    return (
      <ModeDialog
        onClickSingleMode={() => this.handleSingleMode()}
        onClickDualMode={() => this.handleDualMode()}
      />
    );
  }

  renderBoard() {
    return (
      <Board/>
    );
  }

  renderControls() {
    return (
      <Controls
        onClickPlayAgain={() => this.handlePlayAgain()}
        onClickStartOver={() => this.handleStartOver()}
      />
    );
  }


  render() {
    return (
      <div>
        <Header />
        { this.state.showModeDialog ? this.renderModeDialog() : null }
        { this.state.showTokenDialog ? this.renderTokenDialog() : null }
        { this.state.showBoard ? this.renderBoard() : null }
        { this.state.showControls ? this.renderControls() : null }
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <WindowSequence />,
  document.getElementById('root')
);

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