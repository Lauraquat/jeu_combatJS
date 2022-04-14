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
        blockText.innerHTML += "<h4>"+monster.name + " a perdu " + this.damage + " points de vie</h4>";

        if(monster.life > 0){
            blockText.innerHTML += "<h4>Il reste " + monster.life + " points de vie à " + monster.name + "<h4/>";
        }else{
            blockText.innerHTML += "<h4>" + monster.name + " n'a plus de point de vie<h4/>";
        }
    };


    useCompetence(monster){
        monster.life -= this.competence;
        audio = new Audio('./asset/criMonstre.mp3'); 
        audio.play();
        blockText.innerHTML += "<h4>" + monster.name + " a perdu " + this.competence + " points de vie </h4>";

        if(monster.life > 0){
            blockText.innerHTML += "<h4>Il reste " + monster.life + " points de vie à " + monster.name + "<h4/>";
        }else{
            blockText.innerHTML += "<h4>" + monster.name + " n'a plus de point de vie<h4/>";
        }
    }

    
    healPlayer(){
        this.life += 10;
        blockText.innerHTML += "<h4>Le " + player.name + " se soigne. Ses points de vie sont maintenant à " + player.life + "</h4>";
        if(this.life <= this.maxLife){
            this.life = this.life;
        }else{
            this.life = this.maxLife;
        }
    }


    killedByMonster(){
            blockText.innerHTML += "<h4>" + this.name + " n'a plus de point de vie<h4/>";
            blockText.innerHTML += "<h4>" + this.name + " est mort<h4/>";
            blockText.innerHTML += "<h4>Les monstres ont gagné !!!</h4>";
            document.getElementById('divBtn').style.display = 'block';
            document.getElementById('ring').style.display = 'none';
            document.getElementById('btnChoices').style.display = 'none';
    }


    criticalFail(){
        blockText.innerHTML += "<h4>" + this.name + " a subi un échec critique<h4/>";
        blockText.innerHTML += "<h4>" + this.name + " est mort<h4/>";
        blockText.innerHTML += "<h4>Les monstres ont gagné !!!</h4>";
        document.getElementById('divBtn').style.display = 'block';
        document.getElementById('ring').style.display = 'none';
        document.getElementById('btnChoices').style.display = 'none';
    }
}