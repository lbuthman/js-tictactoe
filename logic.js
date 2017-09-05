$(function() {
  
  var model = {
    X: "https://cdn4.iconfinder.com/data/icons/heros/100/Super_Hero_1-512.png",
    O: "https://maxcdn.icons8.com/Color/PNG/512/Cinema/joker_suicide_squad-512.png",
    
    showSpeed: 500,
    hideSpeed: 1000,
    
    numOfPlayers: 1,
    playerToken: "X",
    tokenTurn: "X",
    firstTurn: "X",
    
    topLeft: "",
    topCenter: "",
    topRight: "",
    middleLeft: "",
    middleCenter: "",
    middleRight: "",
    bottomLeft: "",
    bottomCenter: "",
    bottomRight: ""
  }
  
  var octopus = {
    
    init: function() {
      viewBoard.init();
      viewMode.init();
      viewToken.init();
      viewReset.init();
      viewMode.show();
    },
    
    setNumOfPlayers: function(num) {
      model.numOfPlayers = num;
      viewMode.hide();
      viewToken.show();
    },
    
    setToken: function(token) {
      if (token == "batman") {
        model.playerToken = model.X;
        model.tokenTurn = "X";
      }
      else {
        model.playerToken = model.O;
        model.tokenTurn = "O";
      }
      viewToken.hide();
      viewBoard.show();
    },
    
    resetGame: function() {
      model.topLeft = "";
      model.topCenter = "";
      model.topRight = "";
      model.middleLeft = "";
      model.middleCenter = "";
      model.middleRight = "";
      model.bottomLeft = "";
      model.bottomCenter = "";
      model.bottomRight = "";
      viewBoard.clearBoard();
      viewBoard.initButtons();
    },
    
    startOver: function() {
      octopus.resetGame();
      viewBoard.hide(model.hideSpeed);
      viewMode.show(model.showSpeed);
    },
    
    getTurnToken: function() {
      if (model.tokenTurn == "X") {
        return model.X;
      }
      else {
        return model.O;
      }
    },
    
    changeTurn: function() {
      if (model.tokenTurn == "X") {
        model.tokenTurn = "O";
      }
      else {
        model.tokenTurn = "X";
      }
    }
    
  }
  
  var viewBoard = {
    
    renderTurn: function(id) {
      var token = octopus.getTurnToken();
      $(id).html("<img class='img-thumbnail' src='" + token + "' alt='batman' height='90' width='100'>");
      $(id).off('click');
      octopus.changeTurn();
    },
    
    init: function() {
      $('#board').hide(0);
      viewBoard.initButtons();
    },
    
    initButtons: function() {
      $('#top-left').click(function() {
        viewBoard.renderTurn('#top-left');
      });
      $('#top-center').click(function() {
        viewBoard.renderTurn('#top-center');
      });
      $('#top-right').click(function() {
        viewBoard.renderTurn('#top-right')
      });
      $('#middle-left').click(function() {
        viewBoard.renderTurn('#middle-left');
      });
      $('#middle-center').click(function() {
        viewBoard.renderTurn('#middle-center');
      });
      $('#middle-right').click(function() {
        viewBoard.renderTurn('#middle-right')
      });
      $('#bottom-left').click(function() {
        viewBoard.renderTurn('#bottom-left');
      });
      $('#bottom-center').click(function() {
        viewBoard.renderTurn('#bottom-center');
      });
      $('#bottom-right').click(function() {
        viewBoard.renderTurn('#bottom-right')
      });
    },
    
    clearBoard: function() {
      $('#top-left').html("");
      $('#top-center').html("");
      $('#top-right').html("");
      $('#middle-left').html("");
      $('#middle-center').html("");
      $('#middle-right').html("");
      $('#bottom-left').html("");
      $('#bottom-center').html("");
      $('#bottom-right').html("");
    },
    
    show: function() {
      $("#board").show(model.showSpeed);
    },
    
    hide: function() {
      $("#board").hide(model.hideSpeed);
    }
    
  }
  
  var viewReset = {
    init: function() {
      $('#reset-game').click(function() {
        octopus.resetGame();
      });
      $('#reset-all').click(function() {
        octopus.startOver();
      });
    }
  }
  
  var viewMode = {
    init: function() {
      $('#one-player').click(function() {
        octopus.setNumOfPlayers(1);
      });
      
      $('#two-players').click(function() {
        octopus.setNumOfPlayers(2);
      });
    },
    
    show: function() {
      $("#choose-players").show(model.showSpeed);
    },
    
    hide: function() {
      $("#choose-players").hide(model.hideSpeed);
    }
  }
  
  var viewToken = {
    init: function() {
      $("#choose-token").hide(0);
      $("#batman-token").click(function() {
        octopus.setToken("batman");
      });
      $("#joker-token").click(function() {
        octopus.setToken("joker");
      });
    },
    
    show: function() {
      $("#choose-token").show(model.showSpeed);
    },
    
    hide: function() {
      $("#choose-token").hide(model.hideSpeed);
    }
  }
  
  octopus.init();
});
