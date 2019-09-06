new Vue({
    el: "#app",  
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        // CONSTANTES
        playerMin:5,
        playerMax:12,
        monsterMin:3,
        monsterMax:10,
        monsterSpecialMin:10,
        monsterSpecialMax:20,
        health:10,
        // Constantes x objetos
        turnos:[]
    },

    methods:{
        atacar: function(){
            let danioPlayer=this.calcularDanio(this.playerMin,this.playerMax);
            let danioMonster=this.calcularDanio(this.monsterMin,this.monsterMax);
            this.playerHealth=this.playerHealth-danioPlayer;
            this.monsterHealth=this.monsterHealth-danioMonster;
            // validación de fin de juego
            if(this.checkWin()){
                return;
            }
            // logue de transacciones
            this.turnos.unshift({
                tipo:'Monstruo',
                text:'El Monstruo lastimo al al Jugador en '+danioPlayer,
            })
            this.turnos.unshift({
                tipo:'Jugador',
                text:'El Jugador lastimo al Munstruo en '+danioMonster
            })
        },   
        special: function(){
            let danioPlayer=this.calcularDanio(this.playerMin,this.playerMax);
            let danioMonster=this.calcularDanio(this.monsterSpecialMin,this.monsterSpecialMax);
            this.playerHealth=this.playerHealth-danioPlayer;
            this.monsterHealth=this.monsterHealth-danioMonster;
            // validación de fin de juego
            if(this.checkWin()){
                return;
            }
            // logue de transacciones
            this.turnos.unshift({
                tipo:'Monstruo',
                text:'El Monstruo lastimo al al Jugador en '+danioPlayer,
            })
            this.turnos.unshift({
                tipo:'Jugador',
                text:'El Jugador lastimo al Munstruo en '+danioMonster
            })
        },   
        sanar: function(){
            // this.playerHealth=this.playerHealth+this.health;
            this.monsterHealth=this.monsterHealth-this.calcularDanio(this.monsterMin,this.monsterMax);

            if (this.playerHealth <= 90) {
                this.playerHealth+=10;
            } else {
                this.playerHealth=100;
            }

            // validación de fin de juego
            if(this.checkWin()){
                return;
            }
            // logue de transacciones
            this.turnos.unshift({
                tipo:'Monstruo',
                text:'El Monstruo lastimo al al Jugador en '+danioPlayer,
            })
            this.turnos.unshift({
                tipo:'Jugador',
                text:'El Jugador lastimo al Munstruo en '+danioMonster
            })
        },   
        rendirse: function(){
            this.gameIsRunning=false;
            this.turnos=[]
        },   
        startGame: function(){
            this.gameIsRunning=true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.turnos = []
        }, 

        calcularDanio: function(min,max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
         },

         checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('Ganaste! Jugar de nuevo?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.playerHealth = 0;
                    this.monsterHealth = 0;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('Perdiste! Jugar de nuevo?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                    this.playerHealth = 0;
                    this.monsterHealth = 0;
                }
                return true;
            }
            return false;
        }
    }

});


