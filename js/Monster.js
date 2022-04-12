'use strict';

class Monster{
    constructor(monster){
        this.name = monster.name;
        this.damage = monster.damage;
        this.life = monster.life;
        this.exp = monster.exp;
    }

    attack(player){
        player.life -= this.damage - player.defense;
        console.log(player.name + " a perdu " + this.damage + " points de vie mais a " + player.defense + " points de défense");
        
        if(player.life > 0){
            console.log("Il reste " + player.life + " points de vie à " + player.name);
        }else{
            console.log(player.name + " n'a plus de point de vie");
        }
    };

    // killedByPlayer(){ 
    //     console.log(this.name + " est mort !!!");

    //     //On ajoute l'expérience au joueur
    //     player.exp = player.exp + this.exp;
    //     console.log("L'expérience de " + player.name + " passe à " + player.exp);
        
    //     if(player.exp >= 50 && player.exp < 100){
    //         console.log(player.name + " passe au niveau 1");
    //     }else if(player.exp >= 100 && player.exp < 150){
    //         console.log(player.name + " passe au niveau 2");
    //     }else if(player.exp >= 150 && player.exp < 200){
    //         console.log(player.name + " passe au niveau 3");
    //     }else if(player.exp >= 200 && player.exp < 250){
    //         console.log(player.name + " passe au niveau 4");
    //     }else if(player.exp >= 250){
    //         console.log(player.name + " passe au niveau 5");
    //     }
        
    //     //On créé un nouveau monstre qui attaque
    //     var index = Math.floor(Math.random() * (Object.keys(monsters).length));
    //     var monster = new Monster(monsters[index]);
    //     console.log("\n******************************\nUn " + this.name + " vous attaque !\n******************************\n")
    // }

    
}

