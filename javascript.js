var against = "" ;
// Sets icon (nought or cross)
var icon = "set";
// Nested arrays containng the winning tile combinations
var combo = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
//
var aiTiles = [0,1,2,3,4,5,6,7,8];
var start = document.getElementById("start");
var gameover = document.getElementById("gameover");
var gameoverText = document.getElementById("gameover-text");

function toggle(a) {
    against = a;
    console.log(a);
    d = document.getElementById("opponent");
    d.classList.add("displayOff");
    start.classList.remove("displayOff");
};
// Function to select icon at start of game
function choose(i) {
    if ( i == 0 ) {
        icon = "nought";
        console.log(icon);
    } else {
        icon = "cross";
        console.log(icon);
    };
    d = document.getElementById("start");
    d.classList.add("displayOff");
};

// Function to add nought or cross
function select(id, sq) {
    var d = document.getElementById(id);
    var get = d.getAttribute("data-icon");
    var create = document.createElement("span");
    
    if ( get == "") {
        
        
        if (icon == "cross") {
            cross = create.setAttribute("class", "cross");
            d.appendChild(create);
            d.setAttribute("data-icon", 1);
        } else {
            nought = create.setAttribute("class", "nought");
            d.appendChild(create);
            d.setAttribute("data-icon", 2);
        };
    };
        a = aiTiles.indexOf(sq);
        aiTiles.splice(a, 1);
        test();
        switchTurn();
    if (against == "c") {
        computer();
    }
};

// Computer AI
function computer() {
    create = document.createElement("span");
    box = document.getElementsByClassName("box");
    i = aiTiles.length;
    x = Math.floor(Math.random() * i);
    block = aiTiles[x];
    d = box[block];
    
        if (icon == "cross") {
            cross = create.setAttribute("class", "cross");
            d.appendChild(create);
            d.setAttribute("data-icon", 1);
        } else {
            nought = create.setAttribute("class", "nought");
            d.appendChild(create);
            d.setAttribute("data-icon", 2);
        };    

    range = aiTiles.indexOf(block);
    aiTiles.splice(range, 1)
    test();
    switchTurn();

};

// Function to switch players turn
function switchTurn() {
    if (icon == "cross") {
        icon = "nought";
    } else {
        icon = "cross";
    };
};

// Tests to check if game has finished
function test() {
    
    var get = document.getElementsByClassName("box");
    board = 0;
    // For loop to check how many tiles are already taken up
        for (i = 0; i < 8; i++) {
            if (get[i].getAttribute("data-icon") == 1 || get[i].getAttribute("data-icon") == 2) {
                board++;
            };
        };
        // Brings up game over display if all tiles are used and no winner
        if (board == 8) {
            gameover.classList.remove("displayOff");
            gameoverText.innerHTML = "No more moves!";
        };
        
        // Function to check if winning tiles have been selected
        for (i = 0; i < combo.length; i++) {
            x = combo[i][0];
            xx = combo[i][1];
            xxx = combo[i][2];
            
            // Check for crosses winning tiles
            if (get[x].getAttribute("data-icon") == 1 && get[xx].getAttribute("data-icon") == 1 && get[xxx].getAttribute("data-icon") == 1) {
                // Allows half a second before showing winner so players can see the winning board
                setTimeout(function() {
                    gameover.classList.remove("displayOff");
                }, 500)
                gameoverText.innerHTML = "Crosses Wins!";
                break;
            // Check for noughts winning tiles
            }  else if (get[x].getAttribute("data-icon") == 2 && get[xx].getAttribute("data-icon") == 2 && get[xxx].getAttribute("data-icon") == 2) {
                // Allows half a second before showing winner so players can see the winning board
                setTimeout(function() {
                    gameover.classList.remove("displayOff");
                }, 500)
                gameoverText.innerHTML = "Noughts Wins!";
                break;
            };
        };    
};

// Reset Function
function reset() {
    x = document.getElementsByClassName("box");
    for (i = 0; i < x.length; i++) {
        x[i].innerHTML = "";
        x[i].setAttribute("data-icon", "")
    }
    aiTiles = [0,1,2,3,4,5,6,7,8];
    gameover.classList.add("displayOff");
    document.getElementById("start").classList.remove("displayOff");
};

function bind() {
    d = document.getElementsByClassName("box");
    for (i = 0; i < d.length; i++) {
        d.addEventListener('mouseenter', function(){
            d[i].classList.add('hover');
        });
    };
};

bind();
