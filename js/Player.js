'use strict';

class Player{
    constructor(player){
        this.name = player.name;
        this.damage = player.damage;
        this.defense = player.defense;
        this.competence = player.competence;
        this.life = player.life;
        this.exp = player.exp;
        this.maxLife = player.life;
    }
    

    attack(monster) {
        monster.life -= this.damage;
        console.log(monster.name + " a perdu " + this.damage + " points de vie");

        if(monster.life > 0){
        console.log("Il reste " + monster.life + " points de vie à " + monster.name);
        }else{
            console.log(monster.name + " n'a plus de point de vie");
        }
    };


    useCompetence(monster){
        monster.life -= this.competence;
        console.log(monster.name + " a perdu " + this.competence + " points de vie");

        if(monster.life > 0){
        console.log("Il reste " + monster.life + " points de vie à " + monster.name);
        }else{
            console.log(monster.name + " n'a plus de point de vie");
        }
    }

    
    healPlayer(){
        this.life += 10;
        if(this.life <= this.maxLife){
            this.life = this.life;
        }else{
            this.life = this.maxLife;
        }
    }


    killedByMonster(){
            console.log(this.name + " n'a plus de point de vie");
            console.log(this.name + " est mort");
            console.log("Les monstres ont gagné !!!");
    }


    criticalFail(){
        console.log(this.name + " a subi un échec critique");
        console.log(this.name + " est mort");
        console.log("Les monstres ont gagné !!!");
    }
}



