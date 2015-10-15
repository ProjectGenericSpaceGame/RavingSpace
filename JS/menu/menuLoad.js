// Tämä tiedosto lataa valikon elementit.
var menuLoad = function(game){

};

menuLoad.prototype = {
        
    preload: function(){
        
           
            //Luodaan ryhmä painikkeille
            this.buttonGroup = game.add.group();

            // ladataan valikon elementit
            this.game.load.image('menuButton', 'assets/placeholders/buttonplaceholder.png'); 
            this.game.load.image('menuBG', 'assets/sprites/VS_background_purple.png');    
            this.game.load.image('menuButtonBG', 'assets/placeholders/menubgplaceholder.png');
            this.game.load.image('menuBack', 'assets/placeholders/back.png');
            game.load.image('menuNext', 'assets/placeholders/next.png');
            
            //tänne tulee ajaxia
            this.playerData = {};//demo
            //tässä kasataan jutut
            this.surroundings = "";//demo
        },
  
        create: function(){
            
            this.menubg = this.game.add.sprite(0, 0,  'menuBG');
            this.menubbg = this.game.add.sprite(150, 50,  'menuButtonBG');
            //kutsutaan menua
            this.game.state.start('mainMenu',false,false,
                this.playerData,
                this.buttonGroup,
                this.surroundings
            );
        }

};
