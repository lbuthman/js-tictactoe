var X = "https://cdn4.iconfinder.com/data/icons/heros/100/Super_Hero_1-512.png";
var O = "https://maxcdn.icons8.com/Color/PNG/512/Cinema/joker_suicide_squad-512.png";

$("#top-left").click(function() {
    $("#top-left").prepend("<img class='img-thumbnail' src='" + X + "' alt='batman' height='90' width='100'>")});

$("#top-center").click(function() {
    $("#top-center").append("<img class='img-thumbnail' src='" + O + "' alt='joker' height='90' width='100'>")});

$("#top-right").click(function() {
    $("#top-right").append("<img class='img-thumbnail' src='" + X + "' alt='batman' height='90' width='100'>")});

function renderImage() {

}