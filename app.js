new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            let damage = this.calculateDamage(3, 10);

            let sound = document.getElementById("attacko");
			sound.play();

            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits the Monster for " + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();

        },
        specialAttack: function() {
            let damage = this.calculateDamage(10, 20);

            let sound = document.getElementById("special");
			sound.play();

            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits the Monster hard for " + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();

        },
        heal: function() {
            let sound = document.getElementById("healo");
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                
                
            }else {
                this.playerHealth = 100;
            }
            sound.play();
            this.turns.unshift({
                isPlayer: true,
                text: "Player heals for 10",
            });

            this.monsterAttack();

        },
        giveUp: function() {
            this.gameIsRunning = false;

        },
        monsterAttack: function() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits the player for " + damage
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if(confirm("You won! Start new game?")) {
                    let sound = document.getElementById("win");
                    this.startGame();
                    sound.play();
                }else {
                    this.gameIsRunning = false;
                }
                
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm("You lost! Start new game?")) {
                    let sound = document.getElementById("lost");
                    this.startGame(sound.play());
                    
                }else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});