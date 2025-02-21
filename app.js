new Vue({
    el:'#app',
    data:{
        monsterLife: 100,
        playerLife: 100,
        giveUp: false,
        startGame: false,
        logs: [],
    },
    methods:{
        heal(){
          let heal = this.playerLife + this.probabilityValue(10);
          this.playerLife =  heal > 100 ? 100 : heal;
        },
        especialAttack(){
            this.attackMonster(true);
            this.attackPlayer();
        },
        attack(){
            this.attackMonster();
            this.attackPlayer();
        },
        attackMonster(isEspecial){
            let especial = isEspecial ? 30 : 15;
            let attack = this.probabilityValue(especial);
            let remainingLife = this.monsterLife - attack;
            this.monsterLife = this.roundToZero(remainingLife);
            this.logs.push("JOGADOR ATINGIU MONSTRO COM " + attack);
        },
        attackPlayer(){
            let attack = this.probabilityValue(20);
            let remainingLife = this.playerLife - attack;
            this.playerLife = this.roundToZero(remainingLife)
            this.logs.push("MONSTRO ATINGIU JOGADOR COM " + attack);
        },
        probabilityValue(probability){
            return Math.floor(Math.random() * probability);
        },
        roundToZero(value){
            return value < 0 ? 0 : value;
        },
        newGame(){
            this.monsterLife = 100;
            this.playerLife = 100;
            this.giveUp = false;
        }, 
        colorLife(life){
            if(life > 60){
                return "green";
            }else if(life <= 60 && life > 20){
                return "orange";
            }else{
                return "red";
            }
        },
        isEven(value){
            return value % 2 == 0;
        }
    },
    computed:{
        isEndGame(){
            return this.monsterLife == 0 || this.playerLife == 0;
        },
        isPlayerWin(){
            if(this.monsterLife == 0) return true;
            if(this.playerLife == 0) return false; 
        },
        isPlaying(){
            return !this.isEndGame && !this.giveUp && this.startGame;
        },
        hasLog(){
            return this.logs.length > 0;
        }
    }
})