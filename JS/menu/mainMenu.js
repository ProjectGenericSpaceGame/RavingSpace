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
        var self = this;
        //do some murdering
        this.buttonGroup.removeAll();
        // tästä painikkeesta päästään peliin
        this.playButton = this.game.add.button(400, 100, 'menuButton', this.startGame, this, 1, 0, 2);
        //tästä asetuksiin 
        this.settingsButton = this.game.add.button(400, 250, 'menuButton', this.settingsStart, this, 1, 0, 2);
        // tästä pistetaulukkoon
        this.scoresButton = this.game.add.button(400, 400, 'menuButton', this.start, this, 1, 0, 2);
        // tästä kustomointi -valikkoon
        this.customButton = this.game.add.button(400, 550, 'menuButton', this.start, this, 1, 0, 2);

        this.buttonGroup.add(this.playButton);
        this.buttonGroup.add(this.settingsButton);
        this.buttonGroup.add(this.scoresButton);
        this.buttonGroup.add(this.customButton);
    },
    
    startGame: function(){
        // kutsutaan gameLoad -tilaa
        this.game.state.start('gameLoad');
    },
    settingsStart: function(){
        this.game.state.start('settings',false,false,
            this.playerData,
            this.buttonGroup,
            this.surroundings
        );
    }

};

