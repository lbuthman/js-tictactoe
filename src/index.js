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

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      batmanToken: "https://cdn4.iconfinder.com/data/icons/heros/100/Super_Hero_1-512.png",
      jokerToken: "https://maxcdn.icons8.com/Color/PNG/512/Cinema/joker_suicide_squad-512.png",
      batmanWins: 0,
      jokerWins: 0,
      nextTurn: "Batman's Turn",
      isBatmansTurn: true,
      gameOver: false,
    };
  }

  handleClick(i) {

    if (this.state.squares[i] || this.state.gameOver) {
      return;
    }

    this.makeMove(i);
  }

  makeMove(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.isBatmansTurn ? this.state.batmanToken : this.state.jokerToken;
    this.setState({
      squares: squares,
      isBatmansTurn: !this.state.isBatmansTurn,
      nextTurn: this.state.isBatmansTurn ? "Joker's Turn" : "Batman's Turn",
    });
  }

  componentDidMount() {
    if (this.canComputerMove()) {
      this.makeComputersMove();
    }
  }

  componentDidUpdate() {
    this.checkWinner();

    if (this.canComputerMove()) {
      this.makeComputersMove();
    }
  }

  checkWinner() {
    const winner = calculateWinner(this.state.squares.slice());

    if (winner) {
      this.handleWinner(winner);
      return true;
    }
  }

  handleWinner(winner) {
    if (this.state.gameOver) {
      return;
    }

    let batmanWins = this.state.batmanWins;
    let jokerWins = this.state.jokerWins;

    if (winner === "Batman") {
      batmanWins += 1;
    }

    if (winner === "Joker") {
      jokerWins += 1;
    }

    this.setState({
      batmanWins: batmanWins,
      jokerWins: jokerWins,
      gameOver: true,
    })
  }

  canComputerMove() {
    if (this.props.playerMode === "dualPlayer") {
      return false;
    }

    if (this.state.nextTurn.includes(this.props.playerToken)) {
      return false;
    }

    if (calculateWinner(this.state.squares) !== null) {
      return false;
    }

    return true;
  }
  makeComputersMove() {

    let move = this.computeComputerMove();

    setTimeout(() => this.makeMove(move), 700);
  }
  computeComputerMove() {
    //take strategic center square if available
    if (!this.state.squares[4]) {
      return 4;
    }

    const squares = this.state.squares.slice();

    //play for the win
    let computer = this.props.playerToken ==="Batman" ? "joker_suicide_squad" : "Super_Hero_1";
    let move = this.playOpponent(squares, computer);
    if (move) {
      return move;
    }

    //defend to block opponent
    let opponent = this.props.playerToken === "Batman" ? "Super_Hero_1" : "joker_suicide_squad";
    move = this.playOpponent(squares, opponent);
    if (move) {
      return move;
    }

    //take next available square
    for (let i=0; i<this.state.squares.length; i++) {
      if (!this.state.squares[i]) {
        return i;
      }
    }
  }
  playOpponent(squares, player) {

    const playersMoves = this.getPlayersMoves(squares, player);

    if (playersMoves.includes(0) && playersMoves.includes(1) && !squares[2]) { return 2; }
    if (playersMoves.includes(0) && playersMoves.includes(2) && !squares[1]) { return 1; }
    if (playersMoves.includes(1) && playersMoves.includes(2) && !squares[0]) { return 0; }

    if (playersMoves.includes(3) && playersMoves.includes(4) && !squares[5]) { return 5; }
    if (playersMoves.includes(3) && playersMoves.includes(5) && !squares[4]) { return 4; }
    if (playersMoves.includes(4) && playersMoves.includes(5) && !squares[3]) { return 3; }

    if (playersMoves.includes(6) && playersMoves.includes(7) && !squares[8]) { return 8; }
    if (playersMoves.includes(6) && playersMoves.includes(8) && !squares[7]) { return 7; }
    if (playersMoves.includes(7) && playersMoves.includes(8) && !squares[6]) { return 6; }

    if (playersMoves.includes(0) && playersMoves.includes(3) && !squares[6]) { return 6; }
    if (playersMoves.includes(0) && playersMoves.includes(6) && !squares[3]) { return 3; }
    if (playersMoves.includes(3) && playersMoves.includes(6) && !squares[0]) { return 0; }

    if (playersMoves.includes(1) && playersMoves.includes(4) && !squares[7]) { return 7; }
    if (playersMoves.includes(1) && playersMoves.includes(7) && !squares[4]) { return 4; }
    if (playersMoves.includes(4) && playersMoves.includes(7) && !squares[1]) { return 1; }

    if (playersMoves.includes(2) && playersMoves.includes(5) && !squares[8]) { return 8; }
    if (playersMoves.includes(2) && playersMoves.includes(8) && !squares[5]) { return 5; }
    if (playersMoves.includes(8) && playersMoves.includes(8) && !squares[2]) { return 2; }

    if (playersMoves.includes(0) && playersMoves.includes(4) && !squares[8]) { return 8; }
    if (playersMoves.includes(0) && playersMoves.includes(8) && !squares[4]) { return 4; }
    if (playersMoves.includes(4) && playersMoves.includes(8) && !squares[0]) { return 0; }

    if (playersMoves.includes(2) && playersMoves.includes(4) && !squares[6]) { return 6; }
    if (playersMoves.includes(2) && playersMoves.includes(6) && !squares[4]) { return 4; }
    if (playersMoves.includes(4) && playersMoves.includes(6) && !squares[2]) { return 2; }

    return null;
  }
  getPlayersMoves(squares, player) {
    let opponentMoves = Array(9).fill(null);

    for (let i=0; i<squares.length; i++) {
      if (squares[i] && squares[i].includes(player)) {
        opponentMoves.push(i);
      }
    }

    return opponentMoves;
  }

  handlePlayAgain() {
    this.setState({
      squares: Array(9).fill(null),
      gameOver: false,
    })
  }
  handleStartOver() {
    this.handlePlayAgain();
    this.props.startOver();
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

  render() {

    return (
      <div className="col-xs-12 text-center">
        {this.renderStatus()}
        <table className="background">
          <tbody>
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
          </tbody>
        </table>

        <Controls
          onClickPlayAgain={() => this.handlePlayAgain()}
          onClickStartOver={() => this.handleStartOver()}
        />
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

  handleCallback = () => {
    this.setState({
      showBoard: false,
      showModeDialog: true,
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
      <GameBoard
        startOver={this.handleCallback}
        playerMode={this.state.mode}
        playerToken={this.state.token}
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
      if (squares[a].includes("Super_Hero_1")) {
        return "Batman";
      } else {
        return "Joker";
      }
    }
  }
  return null;
}