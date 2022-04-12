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


function playerChoice(clicked_id){
    if(clicked_id == "guerrier"){
        //au click sur un des perso on créé une instanciation selon l'index correspondant
        var player = new Player(players[0]);
    }else if(clicked_id == "magicien"){
        var player = new Player(players[1]);
        
    }
    
    console.log("Vous avez choisi de jouer avec un " + player.name);
    
    //On créé un 1er monstre aléatoire
    var index = Math.floor(Math.random() * (Object.keys(monsters).length));
    var monster = new Monster(monsters[index]);
    console.log("\n****************************************\nUn " + monster.name + " vous attaque !\n****************************************")
    
    
    var gameOver = false;
    var killedMonsters = [];

    while(gameOver == false){

        if(player.name == "Magicien"){
            var choice = prompt("Que souhaitez vous faire ? \n\nF : Frapper \nC : utiliser sa Compétence \nS : se Soigner \nQ : Quitter").toUpperCase();
        }else{
            var choice = prompt("Que souhaitez vous faire ? \n\nF : Frapper \nS : se Soigner \nQ : Quitter").toUpperCase();
        }

        console.log("\n<<<<< Tour du joueur >>>>>");

        //On définit un nombre random entre 1 et 10 pour faire un risque d'échec critique de 10% (on décide plus bas de définir le chiffre qui génère l'echec critique)
        var critic = Math.floor(Math.random() * (10 ));

        switch (choice) {
            case "F":
                if(critic != 2){
                    player.attack(monster);
                }else{
                    player.criticalFail();
                    // console.log("Le " + player.name + " a perdu");
                    player.life = 0;
                    gameOver = true;
                }
                break;
            case "C":
                if(critic != 2){
                    player.useCompetence(monster);
                }else{
                    player.criticalFail();
                    // console.log("Le " + player.name + " a perdu");
                    player.life = 0;
                    gameOver = true;
                }
                break;
            case "S":
                if(critic != 2){
                    player.healPlayer();
                    console.log("Le " + player.name + " se soigne. Ses points de vie sont maintenant à " + player.life);
                }else{
                    player.criticalFail();
                    // console.log("Le " + player.name + " a perdu");
                    player.life = 0;
                    gameOver = true;
                }
                break;
            case "Q":
                gameOver = true;
                console.log("Le " + player.name + " a mis fin à la partie");
                break;
        }

        
        //Mettre code ci dessous dans classe du mosnter, function killedByPlayer (idem si player killedByMonster)
        if(monster.life <= 0){
            console.log(monster.name + " est mort !!!");

            //Lorsque le monstre est tué, on enregistre son nom dans un tableau
            killedMonsters.push(monster.name);
            
            
            //On ajoute l'expérience au joueur
            player.exp = player.exp + monster.exp;
            console.log("L'expérience de " + player.name + " passe à " + player.exp);
            
            if(player.exp >= 50 && player.exp < 100){
                console.log(player.name + " passe au niveau 1");
            }else if(player.exp >= 100 && player.exp < 150){
                console.log(player.name + " passe au niveau 2");
            }else if(player.exp >= 150 && player.exp < 200){
                console.log(player.name + " passe au niveau 3");
            }else if(player.exp >= 200 && player.exp < 250){
                console.log(player.name + " passe au niveau 4");
            }else if(player.exp >= 250){
                console.log(player.name + " passe au niveau 5");
            }

            // On affiche la liste des monstres tués
            if(killedMonsters.length > 0){
                console.log("Voici la liste des monstres tués : " + killedMonsters);
            }


            //On créé un nouveau monstre aléatoire qui attaque
            var index = Math.floor(Math.random() * (Object.keys(monsters).length));
            var monster = new Monster(monsters[index]);
            console.log("\n******************************\nUn " + monster.name + " vous attaque !\n******************************");
        }
        

        
        if(player.life > 0 && monster.life > 0){
            console.log("\n<<<<< Tour du monster >>>>>");
            
            if(critic != 2){
                monster.attack(player);
            }else{
                console.log("Le " + monster.name + " a subi un echec critique");
                console.log("Le " + player.name + " a gagné !");
        
                //On créé un nouveau monstre qui attaque
                var monster = new Monster(monsters[index]);
                console.log("\n******************************\nUn " + monster.name + " vous attaque !\n******************************");
            }

            if(player.life <=0){
                gameOver = true;
                player.killedByMonster();
            }
        }

    }    
               

}