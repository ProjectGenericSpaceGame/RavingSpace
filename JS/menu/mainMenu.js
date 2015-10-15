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
        
        this.button1 = this.game.add.button(50, 50, 'menuButton', this.start, this, 1, 0, 2);
    },
    
    start: function(){
        this.game.state.start('gameLoad');
    }
};

