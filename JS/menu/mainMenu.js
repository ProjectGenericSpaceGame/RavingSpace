// tämä on päävalikko josta siirrytään sovelluksen eri osiin.
var mainMenu = function(game){

};

mainMenu.prototype = {
    
    init:function(playerData,globalScores,playerWaves,buttonGroup,surroundings){
        this.playerData = playerData;
        this.globalScores = globalScores;
        this.playerWaves = playerWaves;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
        
    },
    
    create: function(){
        var self = this;
        //do some murdering
        this.buttonGroup.removeAll();
        var textStyle = { font: '30px cyber'};

        //otsikko
        this.surroundings.menuLabel.text = "Main Menu";
       
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);

        // tästä painikkeesta päästään peliin
        this.playButton = this.game.add.button(425, 200, 'buttonSprite', this.loadoutStart, this, 0, 1, 2);
        var playLabel = this.game.add.text(0,20,"Play", textStyle);
		playLabel.x = this.playButton.width/2-playLabel.width/2;
        this.playButton.addChild(playLabel);
        //tästä asetuksiin 
        this.settingsButton = this.game.add.button(425, 300, 'buttonSprite', this.settingsStart, this, 0, 1, 2);
        var settingsLabel = this.game.add.text(0,20,"Settings", textStyle);
		settingsLabel.x = this.playButton.width/2-settingsLabel.width/2;
        this.settingsButton.addChild(settingsLabel);
        // tästä pistetaulukkoon
        this.scoresButton = this.game.add.button(425, 400, 'buttonSprite', this.scoresStart, this, 0, 1, 2);
        var scoreLabel = this.game.add.text(0,20,"High Scores", textStyle);
		scoreLabel.x = this.playButton.width/2-scoreLabel.width/2;
        this.scoresButton.addChild(scoreLabel);
        // tästä kustomointi -valikkoon
        this.customButton = this.game.add.button(425, 500, 'buttonSprite', this.customStart, this, 0, 1, 2);
        var customLabel = this.game.add.text(0,20,"Customize", textStyle);
		customLabel.x = this.playButton.width/2-customLabel.width/2;
        this.customButton.addChild(customLabel);

        this.buttonGroup.add(this.playButton);
        this.buttonGroup.add(this.settingsButton);
        this.buttonGroup.add(this.scoresButton);
        this.buttonGroup.add(this.customButton);
    },
    
    loadoutStart: function(){
        // kutsutaan loadout -tilaa
        this.game.state.start('loadoutMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    },
    settingsStart: function(){
        this.game.state.start('settings',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    },
    scoresStart: function(){
        this.game.state.start('scores',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    },
    customStart: function(){
        this.game.state.start('custom',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    }

};

