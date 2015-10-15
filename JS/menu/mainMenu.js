// tämä on päävalikko josta siirrytään sovelluksen eri osiin.
var mainMenu = function(game){

};

mainMenu.prototype = {
    
    init:function(playerData,buttonGroup,surroundings){
        this.playerData = playerData;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
    },
    
    create: function(){
        
        // tästä painikkeesta päästään peliin
        this.playButton = this.game.add.button(400, 100, 'menuButton', this.startGame, this, 1, 0, 2);
        //tästä asetuksiin 
        this.settingsButton = this.game.add.button(400, 250, 'menuButton', this.start, this, 1, 0, 2);
        // tästä pistetaulukkoon
        this.scoresButton = this.game.add.button(400, 400, 'menuButton', this.start, this, 1, 0, 2);
        // tästä kustomointi -valikkoon
        this.customButton = this.game.add.button(400, 550, 'menuButton', this.start, this, 1, 0, 2);
    },
    
    startGame: function(){
        // kutsutaan gameLoad -tilaa
        this.game.state.start('gameLoad');
    }
};

