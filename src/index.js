import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Status(props) {
  return (
    <section className="col-xs-12 text-center">
      <h5 className="batman-wins game-status">Batman's Wins: {props.batmanWins} </h5>
      <h5 className="joker-wins game-status">Joker's Wins: {props.jokerWins} </h5>
      <h5 className="turn game-status">Batman's<br/>Turn</h5>
    </section>
  );
}

function Controls(props) {
  return (
    <section className="col-xs-6 text-center">
      <button className="btn btn-primary reset">
        Reset Game</button>
      <button className="btn btn-primary reset">
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

  render(props) {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <section className="col-xs-12 text-center background">
            <table >
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
        </section>
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

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: "singlePlayer",
      showModeDialog: true,
      token: "",
      showTokenDialog: false,
      showBoard: false,
      showStatus: false,
      showControls: false,
      batmanWins: 0,
      jokerWins: 0,
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
  renderModeDialog() {
    return (
      <ModeDialog
        onClickSingleMode={() => this.handleSingleMode()}
        onClickDualMode={() => this.handleDualMode()}
      />
    );
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
  renderTokenDialog() {
    return (
      <TokenDialog
        onClickTokenBatman={() => this.handleTokenBatman()}
        onClickTokenJoker={() => this.handleTokenJoker()}
      />
    )
  }
  renderBoard() {
    return (
      <Board/>
    );
  }
  renderStatus() {
    return (
      <Status
        batmanWins={this.state.batmanWins}
        jokerWins={this.state.jokerWins}
      />
    );
  }
  renderControls() {
    return (
      <Controls

      />
    );
  }
  render() {
    return (
      <div>
        <Header />
        { this.state.showModeDialog ? this.renderModeDialog() : null }
        { this.state.showTokenDialog ? this.renderTokenDialog() : null }
        { this.state.showStatus ? this.renderStatus() : null }
        { this.state.showBoard ? this.renderBoard() : null }
        { this.state.showControls ? this.renderControls() : null }
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <Game />,
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