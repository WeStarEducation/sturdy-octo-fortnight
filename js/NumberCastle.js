var MAX_SCORE = 20;
var MAX_BLOCK = 3;
var WAIT_TIME = 10;

var round = 0;
var winner = 0;  //player = 1, ai = 2
var win = false;
var ai_input = 0;
var player_input = 0;
var ai_score;
var player_score;
var timer;
var count_down;



function start(){
    ai_score = MAX_SCORE;
    player_score = MAX_SCORE;
    round = 0;
    document.getElementById("ai-score").innerText = ai_score;
    document.getElementById("player-score").innerText = player_score;
    document.getElementById("restart").hidden = true;
    document.getElementById('record').innerHTML = "";
    insertRow(0, "-", "-", ai_score, player_score);
    win = false;
    clearInterval(timer);
    startRound();
    
}

function startRound(){
    round += 1;
    document.getElementById("round").innerText = "Round "+ round;
    document.getElementById("btn").disabled = false;
    if (ai_score >= 9){
        ai_input = getRndInteger(1,9);
    }else{
        ai_input = getRndInteger(1, ai_score);
    }
    document.getElementById("player-block").innerText = "";
    document.getElementById("block2").innerText = "";
    document.getElementById("block1").innerText = "*";

    if (player_score >= 9){
        document.getElementById("prompt").innerText = "Choose a number between 1 - 9: ";
    }else{
        document.getElementById("prompt").innerText = "Choose a number between 1 - " + player_score + ": ";
    }
    setTimer();
    
}

function setTimer(){
    count_down = WAIT_TIME+1;
    timer = setInterval(runTimer, 1000);
}

function runTimer(){
    count_down--;
    document.getElementById("player-block").innerText = count_down;
    if (count_down == 0){
        clearInterval(timer);
        setWinner(2);
        
    }
}

function readInput(){
    let userinput = parseInt(document.getElementById("input").value);
    if(isNaN(userinput) || userinput > 9 || userinput < 1 || userinput > player_score){
        return;
    }
    document.getElementById("btn").disabled = true;
    clearInterval(timer);
    player_input = userinput;
    document.getElementById("player-block").innerText = "*";
    check();
}

function check(){
    
    setTimeout(function(){
        document.getElementById("block1").innerText = ai_input;
        document.getElementById("player-block").innerText = player_input;
        document.getElementById("input").value = "";

        if(player_input + ai_input == 10){
            if(player_input > ai_input){
                player_score -= player_input;
                ai_score += player_input;
                document.getElementById("block2").innerText = "Computer win this turn";
            }else if(player_input < ai_input){
                player_score += ai_input;
                ai_score -= ai_input;
                document.getElementById("block2").innerText = "Player win this turn";
            }
        }else{
            if(player_input < ai_input){
                player_score -= player_input;
                ai_score += player_input;
                document.getElementById("block2").innerText = "Computer win this turn";
            }else if(player_input > ai_input){
                player_score += ai_input;
                ai_score -= ai_input;
                document.getElementById("block2").innerText = "Player win this turn";
            }
        }
        document.getElementById("ai-score").innerText = ai_score;
        document.getElementById("player-score").innerText = player_score;
        insertRow(round, ai_input, player_input, ai_score, player_score);
        
        if (ai_score <= 0){
            setWinner(1);
        }else if (player_score <=0){
            setWinner(2);
        }else{
            setTimeout(function(){
                startRound();
            },2000);
        }

    },1000);
    
    

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function setWinner(winner){
    win = true;
    if (winner == 1){
        document.getElementById("block2").innerText = "Player win!";
    }else if (winner == 2){
        document.getElementById("block2").innerText = "Computer wins!";

    }
    document.getElementById("btn").disabled = true;
    document.getElementById("restart").hidden = false;
}

function insertRow(round, c_input, p_input, c_score, p_score){
	var row = document.getElementById('record').insertRow(0);
	var round_number = row.insertCell(0);
    var computer_input = row.insertCell(1);
    var player_input = row.insertCell(2);
    var computer_score = row.insertCell(3);
    var player_score = row.insertCell(4);
	round_number.innerHTML = "Round "+round;
    computer_input.innerHTML = c_input;
    player_input .innerHTML =  p_input;
    computer_score .innerHTML =  c_score;
    player_score .innerHTML =  p_score;
}