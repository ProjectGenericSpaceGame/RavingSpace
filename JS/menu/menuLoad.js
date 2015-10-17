// Tämä tiedosto lataa valikon elementit.
var menuLoad = function(game){
};

menuLoad.prototype = {
        
    preload: function(){
        
           
            //Luodaan ryhmä painikkeille
            this.buttonGroup = game.add.group();

            // ladataan valikon elementit
            this.game.load.image('menuHeader', 'assets/placeholders/header3.png'); 
            this.game.load.image('menuButton', 'assets/placeholders/buttonplaceholder.png'); 
            this.game.load.image('menuBG', 'assets/sprites/VS_background_purple.png');    
            this.game.load.image('menuButtonBG', 'assets/placeholders/menubgplaceholder.png');
            this.game.load.image('menuBack', 'assets/placeholders/back.png');
            this.game.load.image('menuNext', 'assets/placeholders/next.png');
        },
  
        create: function(){
            
            this.menubg = this.game.add.sprite(0, 0,  'menuBG');
            this.menuheader = this.game.add.sprite(0,0, 'menuHeader');
            this.menubbg = this.game.add.sprite(150, 100,  'menuButtonBG');
            //tänne tulee ajaxia
            this.playerData = {};//demo
            //tässä kasataan jutut
            var surroundings = {
                menubg:this.menubg,
                menuheader:this.menuheader,
                menubbg:this.menubbg
            };//demo
           /* this.surroundings.menubg = this.menubg;
            this.surroundings.menuheader = this.menuheader;
            this.surroundings.menubbg = this.menubbg;
            */
            this.buttonGroup = this.game.add.group();
            //kutsutaan menua
            this.game.state.start('mainMenu',false,false,
                this.playerData,
                this.buttonGroup,
                surroundings
            );
        }

};
