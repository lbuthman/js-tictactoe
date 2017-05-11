/*Constants******************************/

var X = "https://cdn4.iconfinder.com/data/icons/heros/100/Super_Hero_1-512.png";
var O = "https://maxcdn.icons8.com/Color/PNG/512/Cinema/joker_suicide_squad-512.png";
var showSpeed = 500;
var hideSpeed = 1000;

/*Variables*******************************/

//One of two: one-player, two-players
var gameMode = "";

//One of two: Batman - X, Jokeer - O
var playerToken = "";

/*Button Clicks***************************/

/*Start game with Player selection, hiding other elements*/
$(document).ready(function() {
    $("#choose-token").hide(0);
    $("#board").hide(0);
});

/*Choose number of players and transition to token screen*/
$(".mode").click(function() {
    var mode = this.id;
    switch(mode) {
        case "one-player":
            gameMode = mode;
            break;
        case "two-players":
            gameMode = mode;
            break;
        default:
            gameMode = "one-player";
    }
    $("#choose-token").show(showSpeed);
    $("#choose-players").hide(hideSpeed);
});

/*Choose player token and transition to game board*/
$(".token").click(function() {
    var token = this.id;

    switch (token) {
        case "batman-token":
            playerToken = "X";
            break;
        case "joker-token":
            playerToken = "O";
            break;
        default:
            playerToken = "X";
    }

    $("#board").show(showSpeed);
    $("#choose-token").hide(hideSpeed);
});

/*Handle reset buttons*/
$(".reset").click(function() {
    var type = this.id;
    switch (type) {
        case "reset-game":
            gameInit();
            break;
        case "reset-all":
            startOver();
            break;
        default:
    }

});

/*Functions**************************/

function startOver() {

    gameMode = "";
    playerToken = "";
    $("#board").hide(hideSpeed);
    $("#choose-players").show(showSpeed);
    gameInit();
}

function gameInit() {
    var BOARD = {
        1: "empty",
        2: "empty",
        3: "empty",
        4: "empty",
        5: "empty",
        6: "empty",
        7: "empty",
        8: "empty",
        9: "empty"
    };
}

$("#top-left").click(function() {
    $("#top-left").html("<img class='img-thumbnail' src='" + X + "' alt='batman' height='90' width='100'>");
    BOARD[1] = "full";
    alert(BOARD[1]);
});

$("#top-center").click(function() {
    $("#top-center").html("<img class='img-thumbnail' src='" + O + "' alt='joker' height='90' width='100'>")});

$("#top-right").click(function() {
    $("#top-right").html("<img class='img-thumbnail' src='" + X + "' alt='batman' height='90' width='100'>")});
