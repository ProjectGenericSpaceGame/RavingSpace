// tämä on päävalikko josta siirrytään sovelluksen eri osiin.
var mainMenu = function(game){

};


mainMenu.prototype = {
    create: function(){
      
    this.game.add.sprite(0, 0, 972, 671,  'menuBackground');
    button1 = this.game.add.button(50, 50, 'menuButton', this.start, this, 1, 0, 2);
    this.playerData = playerData;
    this.buttonGroup = buttonGroup;
    this.surroundings = surroundings;
        
    },
    
    start: function(){
        this.game.state.start('gameLoad');
    }
};

