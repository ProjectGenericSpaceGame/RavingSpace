// Tämä tiedosto lataa valikon elementit.
var menuLoad = function(game){
   
};

menuLoad.prototype = {
        
    preload: function(){
        
           
            
            //Luodaan ryhmä painikkeille
          
            
        

            // ladataan valikon elementit
            this.game.load.image('menuHeader', 'assets/placeholders/header3.png'); 
            this.game.load.image('menuButton', 'assets/placeholders/buttonplaceholder.png'); 
            this.game.load.image('menuBG', 'assets/sprites/VS_background_purple.png');    
            this.game.load.image('menuButtonBG', 'assets/placeholders/menubgplaceholder.png');
            this.game.load.image('menuBack', 'assets/placeholders/back.png');
            this.game.load.image('menuNext', 'assets/placeholders/next.png');
            // loadouttiin 
            this.game.load.image('itemSelector', 'assets/placeholders/selector.png');
            this.game.load.image('item', 'assets/placeholders/slot.png');
        
            this.game.load.image('weaponTray', 'assets/placeholders/weaponTray.png');
        },
  
        create: function(){
            
            this.menubg = this.game.add.sprite(0, 0,  'menuBG');
           
            this.menuheader = this.game.add.sprite(0,0, 'menuHeader');
            var logotext = this.game.add.text(550, 20, "Raving Space");
            this.menuheader.addChild(logotext);
            
            this.menubbg = this.game.add.sprite(150, 100,  'menuButtonBG');
             this.menubbg.tint = 0x858585;
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
                this.surroundings
            );
        }

};
