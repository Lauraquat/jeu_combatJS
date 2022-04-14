'use strict';
var players = {
    0: { name: 'Guerrier', life: 150, damage: 30, competence: 40, defense: 10, exp: 0 },
    1: { name: 'Magicien', life: 120, damage: 20, competence: 40, defense: 20, exp: 0 },
};


var monsters = {
    0: { name: 'Gobelin', life: 40, damage: 15, exp: 30 },
    1: { name: 'Squelette', life: 90, damage: 20, exp: 50 },
    2: { name: 'Troll', life: 200, damage: 30, exp: 100 }
};

var blockText = document.getElementById('infoJeu');
var blockPlayer = document.getElementById('imgPlayer');
var blockMonster = document.getElementById('imgMonter');
var btnChoice = document.getElementById('btnChoices');

var pause = true;

var player;
var monster;
var index;
var audio; 
var attackChoice;

function playerChoice(clicked_id) {
    //au click sur un des perso on créé une instanciation selon l'index correspondant
    player = new Player(players[clicked_id]);

    console.log("Vous avez choisi de jouer avec un " + player.name);
    blockText.firstChild.data = "Vous avez choisi de jouer avec un " + player.name;
    document.getElementById('divBtn').style.display = 'none';
    //On créé un 1er monstre aléatoire
    index = Math.floor(Math.random() * (Object.keys(monsters).length));
    monster = new Monster(monsters[index]);

    console.log("\n****************************************\nUn " + monster.name + " vous attaque !\n****************************************")
    blockText.innerHTML += "<h4>Un " + monster.name + " vous attaque !<h4/>";
    blockMonster.innerHTML = '<img src="./asset/images/' + monster.name + '.png" alt="monter"/>';
    document.getElementById('ring').style.display = 'grid';

    if (player.name == "Magicien") {
        btnChoice.style='block';
        blockPlayer.innerHTML = '<img src="./asset/images/magicien.png" alt="magicien"/>';
        // var choice = prompt("Que souhaitez vous faire ? \n\nF : Frapper \nC : utiliser sa Compétence \nS : se Soigner \nQ : Quitter").toUpperCase();
        btnChoice.innerHTML = '<button id="F" onclick="commandChoice(this.id)">Frapper</button><button id="C" onclick="commandChoice(this.id)">Utilise compétence</button><button id="S" onclick="commandChoice(this.id)">Se soigner</button><button id="Q" onclick="commandChoice(this.id)">Quitter</button>';
    } else {
        btnChoice.style='block';
        blockPlayer.innerHTML = '<img src="./asset/images/guerier.png" alt="guerier"/>';
        btnChoice.innerHTML = '<button id="F" onclick="commandChoice(this.id)">Frapper</button><button id="S" onclick="commandChoice(this.id)">Se soigner</button><button id="Q" onclick="commandChoice(this.id)">Quitter</button>';
        // var choice = prompt("Que souhaitez vous faire ? \n\nF : Frapper \nS : se Soigner \nQ : Quitter").toUpperCase();
    }

}


// function heartcharge(){
//     document.getElementById('body').innerHTML='<svg id="heartsvg" width="150" height="150" viewBox="0 0 200 200"><g transform="translate(100 100)"><path transform="translate(-50 -50)" fill="tomato" d="M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0 c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z"></path> <animateTransform attributeName="transform" type="scale" values="1; 1.5; 1.25; 1.5; 1.5; 1;" dur="1s" repeatCount="indefinite" additive="sum"></animateTransform></g></svg>'
// }

var gameOver = true;
var killedMonsters = [];

function boucle() {

    // if (player.name == "Magicien") {
    //     blockPlayer.innerHTML = '<img src="./asset/images/magicien.png" alt="magicien"/>';
    //     // var choice = prompt("Que souhaitez vous faire ? \n\nF : Frapper \nC : utiliser sa Compétence \nS : se Soigner \nQ : Quitter").toUpperCase();
    //     btnChoice.innerHTML = '<button id="F" onclick="commandChoice(this.id)">Frapper</button><button id="C" onclick="commandChoice(this.id)">Utilise competance</button><button id="S" onclick="commandChoice(this.id)">Se soigner</button><button id="Q" onclick="commandChoice(this.id)">Quitter</button>';
    // } else {
    //     blockPlayer.innerHTML = '<img src="./asset/images/guerier.png" alt="guerier"/>';
    //     btnChoice.innerHTML = '<button id="F" onclick="commandChoice(this.id)">Frapper</button><button id="S" onclick="commandChoice(this.id)">Se soigner</button><button id="Q" onclick="commandChoice(this.id)">Quitter</button>';
    //     // var choice = prompt("Que souhaitez vous faire ? \n\nF : Frapper \nS : se Soigner \nQ : Quitter").toUpperCase();
    // }

    // while (gameOver == false) {

    //     //document.getElementById('playerPV').innerHTML='<p>'+ player.life+' PV</p>'

        // console.log("\n<<<<< Tour du joueur >>>>>");
        // blockText.firstChild.data = "Votre tour";
        // blockMonster.classList.remove('monstermove')

        //On définit un nombre random entre 1 et 10 pour faire un risque d'échec critique de 10% (on décide plus bas de définir le chiffre qui génère l'echec critique)

    // }
}

function commandChoice(id) {
    switch (id) {
        case "F":
            if (!criticity()) {
                player.attack(monster);
            } else {
                player.criticalFail();
                player.life = 0;
                gameOver = true;
            }
            break;
        case "C":
            if (!criticity()) {
                player.useCompetence(monster);
            } else {
                player.criticalFail();
                player.life = 0;
                gameOver = true;
            }
            break;
        case "S":
            if (!criticity()) {
                player.healPlayer();
                blockText.firstChild.data = "Le " + player.name + " se soigne. Ses points de vie sont maintenant à " + player.life;
            } else {
                player.criticalFail();
                player.life = 0;
                gameOver = true;
            }
            break;
        case "Q":
            gameOver = true;
            console.log("Le " + player.name + " a mis fin à la partie");
            blockText.firstChild.data = "Le " + player.name + " a mis fin à la partie";

            break;
    }
    setTimeout(function(){
       monster.monsterTurn(player)},3000);

    deadMonster();
}

function criticity(){
    var critic = Math.floor(Math.random() * (10));
    return critic == 2;
}

function deadMonster(){
    if (monster.life <= 0) {

        monster.killedByPlayer(player);

        //Lorsque le monstre est tué, on enregistre son nom dans un tableau
        killedMonsters.push(monster.name);

        // On affiche la liste des monstres tués
        if (killedMonsters.length > 0) {
            console.log("Voici la liste des monstres tués : " + killedMonsters);
            blockText.children.innerHTML += "Voici la liste des monstres tués : ";
            blockText.children.innerHTML += '<p>' + killedMonsters + '<p>';
        }

        //On créé un nouveau monstre aléatoire qui attaque
        index = Math.floor(Math.random() * (Object.keys(monsters).length));
        monster = new Monster(monsters[index]);
        //console.log("\n******************************\nUn " + monster.name + " vous attaque !\n******************************");
        blockText.firstChild.data = "Un " + monster.name + " vous attaque !";
        blockMonster.innerHTML = '<img src="./asset/images/' + monster.name + '.png" alt="monter"/>';
    }

}