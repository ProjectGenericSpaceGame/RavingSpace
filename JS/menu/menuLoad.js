// Tämä tiedosto lataa valikon elementit.
var menuLoad = function(game){
   
};

menuLoad.prototype = {
        
    preload: function(){
        

            // ladataan valikon elementit
            this.game.load.image('menuHeader', 'assets/placeholders/header3.png'); 
            this.game.load.spritesheet('buttonSprite', 'assets/placeholders/menuButtonSpriteEmpty.png', 400, 70);
            this.game.load.image('menuBG', 'assets/sprites/VS_background_purple.png');    
            this.game.load.image('menuButtonBG', 'assets/placeholders/menubgplaceholder.png');
            this.game.load.image('menuBack', 'assets/placeholders/back.png');
            this.game.load.image('menuNext', 'assets/placeholders/next.png');
            // loadouttiin
            this.game.load.image('availableTray', 'assets/placeholders/availableTray.png');
            this.game.load.image('weapon1', 'assets/placeholders/weapon1.png');
            this.game.load.image('slot', 'assets/placeholders/slot.png');
            
          
        },
  
        create: function(){
            var self = this;
            var textStyle = { font: "20px Calibri"};
             var nameStyle = { font: "20px Calibri", fill:"blue"};
            var headingStyle = { font: "35px Calibri", fill:"white"};
            

            this.menubg = this.game.add.sprite(0, 0,  "menuBG");
           
            this.menuheader = this.game.add.sprite(0,0, "menuHeader");
            var logotext = this.game.add.text(550, 20, "Raving Space");
            this.menuheader.addChild(logotext);
            
            
            this.menubbg = this.game.add.sprite(150, 100,  "menuButtonBG");
            this.menubbg.tint = 0x858585;
            //alustetaan valikon otsikko ja viiva
            this.menuLabel = this.game.add.text(this.game.width/2, 120, '', headingStyle);
            
            this.headUnder = this.game.add.sprite(180, 170,  "menuHeader");
            this.headUnder.scale.setTo(0.7, 0.03);
            
            // logout -painiket
            this.logout = this.game.add.button(1160, 20, "menuHeader", this.logout, this, 1, 0, 2);
            this.logout.scale.setTo(0.08, 0.5);
            this.logout.tint = 0xf0f0f0;
            var logText = this.game.add.text(400,20,"Logout",textStyle);
            this.logout.addChild(logText);
            this.menuheader.addChild(this.logout);
            this.logout.getChildAt(0).scale.setTo(10, 1.5);

            //tänne tulee ajaxia ja kissoja
            var demoname = "testi1";
            /*// ------>TESTATTU JA TOIMII<------
            var getFromDB = $.ajax({
                method:"POST",
                async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
                url:"PHP/SQLcontroller/playerData.php",
                data:{playerName:demoname}
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
                data:{playerName:demoname}
            });
            getFromDB.done(function(returnValue){
                self.playerWaves = JSON.parse(returnValue);
            });
            getFromDB.fail(function(){alert("database unreachable!")});
            //

             getFromDB = $.ajax({
             method:"POST",
             async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
             url:"PHP/SQLcontroller/highScores.php"
             });
             getFromDB.done(function(returnValue){
             //self.globalScores = returnValue;});
                self.globalScores = JSON.parse(returnValue);});
            getFromDB.fail(function(){alert("database unreachable!")});
            //Nyt tehdään pistelistasta array vertailua varten
            var scoreSort = [];
            for(var i = 0;i < this.globalScores.highScores.length;i++) {
                scoreSort.push(this.globalScores.highScores[i]);
            }
            scoreSort.sort(this.compare);
            this.globalScores = scoreSort;*/
            this.playerData = {
                "playerData":{
                    "playerName":"testi1",
                    "email":"test1@testmail.io",
                    "money":14034,
                    "points":16045
                },
                "shipData":[1,1,1,1,1,1,0],
                "playerScores":[
                    25000,21566,20145,19563,18054,12056,11753,10654,9236,4067
                ]
            };//demo
            this.globalScores = {};//demo
            this.playerWaves = {"playerWaves":[
                {
                    "waveStruct":"101104'151207'231009",
                    "waveStatus":"Unused",
                    "profit":0
                },
                {
                    "waveStruct":"151221'262239'322517",
                    "waveStatus":"Unused",
                    "profit":0
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                },
                {
                    "waveStruct":"103521'223459'424617",
                    "waveStatus":"Destroyed",
                    "profit":400
                }
                ]}; //demo
            //this.playerWaves = JSON.parse(this.playerWaves);
            //tässä kasataan jutut
            var surroundings = {
                menubg:this.menubg,
                menuheader:this.menuheader,
                menubbg:this.menubbg,
                menuLabel:this.menuLabel,
                headUnder:this.headUnder,
                backButton:this.backButton
            };//demo
            
           // lisätään pelaajan pisteet sekä rahat yläpalkkiin
            var  playerDisplayPoints = this.game.add.text(10, 15, "Points: "+this.playerData.playerData.points, textStyle);
            var  playerDisplayMoney = this.game.add.text(10, 40, "Money: "+this.playerData.playerData.money, textStyle);
            // lisätään pelaajan nimi yläpälkkiin
            var  playerDisplayName = this.game.add.text(1100, 30, this.playerData.playerData.playerName, nameStyle);
           
            
             this.menuheader.addChild(playerDisplayMoney);
             this.menuheader.addChild(playerDisplayPoints);
             this.menuheader.addChild(playerDisplayName);
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
        },
        compare:function(a,b){
            if(a[1] == b[1]){
                return 0;
            } else if(a[1] < b[1]){
                return 1;
            }
            return -1;
        },
        logout:function(){
            // funktio uloskirjaukselle
            console.log("Logged out");
        }

};
