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
        this.bourse = 0;
        blockText = document.getElementById('infoJeu');
        this.gameOver = false;
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
            deadMonster();
        }
        scrollBot();

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
            deadMonster();
        }
        scrollBot();

    }

    
    healPlayer(){
        this.life += 10;
        blockText.innerHTML += "<h4>Le " + player.name + " se soigne. Ses points de vie sont maintenant à " + player.life + "</h4>";
        if(this.life <= this.maxLife){
            this.life = this.life;
        }else{
            this.life = this.maxLife;
        }
        scrollBot();

    }


    killedByMonster(){
            blockText.innerHTML += "<h4>" + this.name + " n'a plus de point de vie<h4/>";
            blockText.innerHTML += "<h4>*****" + this.name + " est mort*****<h4/>";
            blockText.innerHTML += "<h4>Les monstres ont gagné !!!</h4>";
            document.getElementById('divBtn').style.display = 'flex';
            document.getElementById('ring').style.display = 'none';
            document.getElementById('btnChoices').style.display = 'none';
            scrollBot();

    }

    criticalFail(){
        blockText.innerHTML += "<h4>" + this.name + " a subi un échec critique<h4/>";
        blockText.innerHTML += "<h4>*****" + this.name + " est mort*****<h4/>";
        blockText.innerHTML += "<h4>Les monstres ont gagné !!!</h4>";
        document.getElementById('divBtn').style.display = 'flex';
        document.getElementById('ring').style.display = 'none';
        document.getElementById('btnChoices').style.display = 'none';
        scrollBot();

    }

    quit(){
        blockText.innerHTML += "<h4> Le " + this.name + " a mis fin a la partie<h4/>";
        this.gameOver = true;
        document.getElementById('divBtn').style.display = 'flex';
        document.getElementById('ring').style.display = 'none';
        document.getElementById('btnChoices').style.display = 'none';
        scrollBot();

    }

}