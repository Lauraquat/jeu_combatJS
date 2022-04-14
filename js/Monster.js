'use strict';

class Monster{
    constructor(monster){
        this.name = monster.name;
        this.damage = monster.damage;
        this.life = monster.life;
        this.exp = monster.exp;
        blockText = document.getElementById('infoJeu');
    }


    attack(player){
        player.life -= this.damage - player.defense;
        audio = new Audio('./asset/criPlayer.mp3'); 
        audio.play();

        blockText.innerHTML = "<h3>" + player.name + " a perdu " + this.damage + " points de vie mais a " + player.defense + " points de défense<h3/>";
        
        if(player.life > 0){
            blockText.innerHTML = "<h3>Il reste " + player.life + " points de vie à " + player.name + "<h3/>";
        }else{
            blockText.innerHTML = "<h3>" + player.name + " n'a plus de point de vie</h3>";
        }
    };

    killedByPlayer(player){ 
        blockText.innerHTML = "<h3>" + this.name + " est mort !!!</h3>";
        
        //On ajoute l'expérience au joueur
        player.exp = player.exp + this.exp;
        blockText.innerHTML = "<h3>L'expérience de " + player.name + " passe à " + player.exp + "<h3/>";
        
        if(player.exp >= 50 && player.exp < 100){
            blockText.innerHTML = "<h3>" + player.name + " passe au niveau 1</h3>";
        }else if(player.exp >= 100 && player.exp < 150){
            blockText.innerHTML = "<h3>" + player.name + " passe au niveau 2</h3>";
        }else if(player.exp >= 150 && player.exp < 200){
            blockText.innerHTML = "<h3>" + player.name + " passe au niveau 3</h3>";
        }else if(player.exp >= 200 && player.exp < 250){
            blockText.innerHTML = "<h3>" + player.name + " passe au niveau 4</h3>";
        }else if(player.exp >= 250){
            blockText.innerHTML = "<h3>" + player.name + " passe au niveau 5</h3>";
        }
    }

    monsterTurn(player){
        if (player.life > 0 && this.life > 0) {
            blockText.firstChild.data = "Tour du " + this.name;
            blockMonster.classList.add('monstermove');

            if (!criticity()) {
                this.attack(player);
            } else {
                blockText.firstChild.data = "Le " + this.name + " a subi un echec critique";
                blockText.innerHTML = "<h3>Le " + player.name + " a gagné !</h3>";

                //On créé un nouveau monstre qui attaque
                index = Math.floor(Math.random() * (Object.keys(monsters).length));
                monster = new Monster(monsters[index]);
                blockText.firstChild.data = "Un " + this.name + " vous attaque !";
                blockMonster.innerHTML = '<img src="./asset/images/' + this.name + '.png" alt="monter"/>';
                
            }

            if (player.life <= 0) {
                player.killedByMonster();
            }else {
                blockText.firstChild.data = "Votre tour";
                blockMonster.classList.remove('monstermove')
            }
        }
    }
}

