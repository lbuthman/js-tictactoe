var X = "https://cdn4.iconfinder.com/data/icons/heros/100/Super_Hero_1-512.png";
var O = "https://maxcdn.icons8.com/Color/PNG/512/Cinema/joker_suicide_squad-512.png";
var BOARD = {
    1: "empty",
    2: "empty",
    3: "empty",
    4: "empty",
    5: "empty",
    6: "empty",
    7: "empty",
    8: "empty",
    9: "empty",
}

$(document).ready(function() {
    $("#board").hide();

});

function drawBoard() {
    $("#board").show(1000);
}

function chooseNumPlayers() {

}

$("#top-left").click(function() {
    $("#top-left").html("<img class='img-thumbnail' src='" + X + "' alt='batman' height='90' width='100'>")
    BOARD[1] = "full";
    alert(BOARD[1]);
});

$("#top-center").click(function() {
    $("#top-center").html("<img class='img-thumbnail' src='" + O + "' alt='joker' height='90' width='100'>")});

$("#top-right").click(function() {
    $("#top-right").html("<img class='img-thumbnail' src='" + X + "' alt='batman' height='90' width='100'>")});

function renderImage() {

}