// Tämä tiedosto lataa valikon elementit.
var menuLoad = function(game){
   
};

menuLoad.prototype = {
        
    preload: function(){
        

            // ladataan valikon elementit
            this.game.load.image('menuHeader', 'assets/placeholders/header3.png'); 
            this.game.load.image('menuButton', 'assets/placeholders/menuButton.png'); 
            this.game.load.spritesheet('buttonSprite', 'assets/placeholders/menuButtonSpriteEmpty.png', 400, 70);
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
            var self = this;

            this.menubg = this.game.add.sprite(0, 0,  'menuBG');
           
            this.menuheader = this.game.add.sprite(0,0, 'menuHeader');
            var logotext = this.game.add.text(550, 20, "Raving Space");
            this.menuheader.addChild(logotext);
            
            this.menubbg = this.game.add.sprite(150, 100,  'menuButtonBG');
             this.menubbg.tint = 0x858585;
            //alustetaan valikon otsikko ja viiva
            this.menuLabel = this.game.add.text(this.game.width/2, 120, '');
            this.menuLabel.fill = 'white';
            this.headUnder = this.game.add.sprite(180, 170,  'menuHeader');
            this.headUnder.scale.setTo(0.7, 0.03);

            //tänne tulee ajaxia
            //var demoname = "testi1";
            /* ------>TESTATTU JA TOIMII<------
            var getFromDB = $.ajax({
                method:"POST",
                async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                url:"PHP/SQLcontroller/playerData.php",
                data:demoname
            });
            getFromDB.done(function(returnValue){
                self.playerData = JSON.parse(returnValue);
            });
            getFromDB.fail(function(){alert("database unreachable!")});
            //
            getFromDB = $.ajax({
                method:"POST",
                async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                url:"PHP/SQLcontroller/playerWaves.php",
                data:demoname
            });
            getFromDB.done(function(returnValue){
                self.playerWaves = JSON.parse(returnValue);
            });
            getFromDB.fail(function(){alert("database unreachable!")});
            */
            this.playerData = {};//demo
            this.globalScores = {};//demo
            this.playerWaves = {}; //demo
            //tässä kasataan jutut
            var surroundings = {
                menubg:this.menubg,
                menuheader:this.menuheader,
                menubbg:this.menubbg,
                menuLabel:this.menuLabel,
                headUnder:this.headUnder,
                backButton:this.backButton
            };//demo
            
            // luodaan ryhmä painikkeille. 
            this.buttonGroup = this.game.add.group();
            //kutsutaan menua
            this.game.state.start('mainMenu',false,false,
                this.playerData,
                this.globalScores,
                this.playerWaves,
                this.buttonGroup,
                surroundings
            );
        }

};
