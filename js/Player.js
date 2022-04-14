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
        blockText = document.getElementById('infoJeu');
    }
    

    attack(monster) {
        monster.life -= this.damage;
        audio = new Audio('./asset/criMonstre.mp3'); 
        audio.play();
        blockText.innerHTML = "<h3>" + monster.name + " a perdu " + this.damage + " points de vie<h3/>";
        console.log(monster.name + " a perdu " + this.damage + " points de vie");

        if(monster.life > 0){
            blockText.innerHTML = "<h3>Il reste " + monster.life + " points de vie à " + monster.name + "<h3/>";
            console.log("Il reste " + monster.life + " points de vie à " + monster.name);
        }else{
            blockText.innerHTML = "<h3>" + monster.name + " n'a plus de point de vie<h3/>";
            console.log(monster.name + " n'a plus de point de vie");
        }
    };


    useCompetence(monster){
        monster.life -= this.competence;
        audio = new Audio('./asset/criMonstre.mp3'); 
        audio.play();
        blockText.innerHTML = "<h3>" + monster.name + " a perdu " + this.competence + " points de vie<h3/>";
        console.log(monster.name + " a perdu " + this.competence + " points de vie");

        if(monster.life > 0){
            blockText.innerHTML = "<h3>Il reste " + monster.life + " points de vie à " + monster.name + "<h3/>";
            console.log("Il reste " + monster.life + " points de vie à " + monster.name);
        }else{
            blockText.innerHTML = "<h3>" + monster.name + " n'a plus de point de vie<h3/>";
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
            blockText.innerHTML = "<h3>" + this.name + " n'a plus de point de vie<h3/>";
            blockText.innerHTML = "<h3>" + this.name + " est mort<h3/>";
            blockText.innerHTML = "<h3>Les monstres ont gagné !!!</h3>";
            console.log(this.name + " n'a plus de point de vie");
            console.log(this.name + " est mort");
            console.log("Les monstres ont gagné !!!");
            document.getElementById('divBtn').style.display = 'block';
            document.getElementById('ring').style.display = 'none';
            document.getElementById('btnChoices').style.display = 'none';

    }


    criticalFail(){
        blockText.innerHTML = "<h3>" + this.name + " a subi un échec critique<h3/>";
        blockText.innerHTML = "<h3>" + this.name + " est mort<h3/>";
        blockText.innerHTML = "<h3>Les monstres ont gagné !!!</h3>";
        console.log(this.name + " a subi un échec critique");
        console.log(this.name + " est mort");
        console.log("Les monstres ont gagné !!!");
        document.getElementById('divBtn').style.display = 'block';
        document.getElementById('ring').style.display = 'none';
        document.getElementById('btnChoices').style.display = 'none';
        
    }

}