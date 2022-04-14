'use strict';
var players = {
    0 : {name : 'Guerrier', life : 150, damage : 30, competence : 40, defense : 10, exp : 0},
    1 : {name : 'Magicien', life : 120, damage : 20, competence : 40,  defense : 20, exp : 0},
};


var monsters = {
    0 : {name : 'Gobelin', life : 40, damage : 15, exp : 30},
    1 : {name : 'Squelette', life : 90, damage : 20, exp : 50},
    2 : {name : 'Troll', life : 200, damage : 30, exp : 100}
};

var blockText = document.getElementById('infoJeu');
var blockPlayer = document.getElementById('imgPlayer');
var blockMonster = document.getElementById('imgMonter');


function playerChoice(clicked_id){
    //au click sur un des perso on créé une instanciation selon l'index correspondant
    var player = new Player(players[clicked_id]);

    //console.log("Vous avez choisi de jouer avec un " + player.name);
    blockText.firstChild.data = "Vous avez choisi de jouer avec un " + player.name;
    document.getElementById('divBtn').style.display ='none';


    //On créé un 1er monstre aléatoire
    var index = Math.floor(Math.random() * (Object.keys(monsters).length));
    var monster = new Monster(monsters[index]);

    //console.log("\n****************************************\nUn " + monster.name + " vous attaque !\n****************************************")
    blockText.innerHTML = "<h3>Un " + monster.name + " vous attaque !<h3/>";
    blockMonster.innerHTML = '<img src="./asset/images/' + monster.name +'.png" alt="monter"/>';

    var gameOver = false;
    var killedMonsters = [];

    while(gameOver == false){

        if(player.name == "Magicien"){
            blockPlayer.innerHTML = '<img src="./asset/images/magicien.png" alt="magicien"/>';
            var choice = prompt("Que souhaitez vous faire ? \n\nF : Frapper \nC : utiliser sa Compétence \nS : se Soigner \nQ : Quitter").toUpperCase();
        }else{
            blockPlayer.innerHTML = '<img src="./asset/images/guerier.png" alt="guerier"/>';
            var choice = prompt("Que souhaitez vous faire ? \n\nF : Frapper \nS : se Soigner \nQ : Quitter").toUpperCase();
        }

        document.getElementById('playerPV').innerHTML='<p>'+ player.life+' PV</p>'

        //console.log("\n<<<<< Tour du joueur >>>>>");
        blockText.firstChild.data = "Votre tour";
        blockMonster.classList.remove('monstermove')

        //On définit un nombre random entre 1 et 10 pour faire un risque d'échec critique de 10% (on décide plus bas de définir le chiffre qui génère l'echec critique)
        var critic = Math.floor(Math.random() * (10 ));

        switch (choice) {
            case "F":
                if(critic != 2){
                    player.attack(monster);
                }else{
                    player.criticalFail();
                    player.life = 0;
                    gameOver = true;
                }
                break;
            case "C":
                if(critic != 2){
                    player.useCompetence(monster);
                }else{
                    player.criticalFail();
                    player.life = 0;
                    gameOver = true;
                }
                break;
            case "S":
                if(critic != 2){
                    player.healPlayer();
                    console.log("Le " + player.name + " se soigne. Ses points de vie sont maintenant à " + player.life);
                    setTimeout(heartcharge, 1000);
                }else{
                    player.criticalFail();
                    player.life = 0;
                    gameOver = true;
                }
                break;
            case "Q":
                gameOver = true;
                //console.log("Le " + player.name + " a mis fin à la partie");
                blockText.firstChild.data = "Le " + player.name + " a mis fin à la partie";

                break;
        }

        if(monster.life <= 0){

            monster.killedByPlayer(player);
            
            //Lorsque le monstre est tué, on enregistre son nom dans un tableau
            killedMonsters.push(monster.name);

            // On affiche la liste des monstres tués
            if(killedMonsters.length > 0){
                console.log("Voici la liste des monstres tués : " + killedMonsters);
                //blockText.firstChild.data = "Voici la liste des monstres tués : ";
                //blockText.innerHTML='<ul>' + killedMonsters + '<ul>';

            }

            //On créé un nouveau monstre aléatoire qui attaque
            var index = Math.floor(Math.random() * (Object.keys(monsters).length));
            var monster = new Monster(monsters[index]);
            //console.log("\n******************************\nUn " + monster.name + " vous attaque !\n******************************");
            blockText.firstChild.data = "Un " + monster.name + " vous attaque !";
        }
        
        
        if(player.life > 0 && monster.life > 0){
            //console.log("\n<<<<< Tour du monster >>>>>");
            blockText.firstChild.data = "Tour du " + monster.name ;
            blockMonster.classList.add('monstermove');

            if(critic != 2){
                monster.attack(player);
            }else{
                //console.log("Le " + monster.name + " a subi un echec critique");
                blockText.firstChild.data = "Le " + monster.name + " a subi un echec critique";

                //console.log("Le " + player.name + " a gagné !");
                blockText.innerHTML = "<h3>Le " + player.name + " a gagné !</h3>";

                //On créé un nouveau monstre qui attaque
                var index = Math.floor(Math.random() * (Object.keys(monsters).length));
                var monster = new Monster(monsters[index]);
                //console.log("\n******************************\nUn " + monster.name + " vous attaque !\n******************************");
                blockText.firstChild.data = "Un " + monster.name + " vous attaque !";
            }

            if(player.life <=0){
                gameOver = true;
                player.killedByMonster();
            }
        }

    }    
               

}
function heartcharge(){
    document.getElementById('body').innerHTML='<svg id="heartsvg" width="150" height="150" viewBox="0 0 200 200"><g transform="translate(100 100)"><path transform="translate(-50 -50)" fill="tomato" d="M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0 c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z"></path> <animateTransform attributeName="transform" type="scale" values="1; 1.5; 1.25; 1.5; 1.5; 1;" dur="1s" repeatCount="indefinite" additive="sum"></animateTransform></g></svg>'
}

