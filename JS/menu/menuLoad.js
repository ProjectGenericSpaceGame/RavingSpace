// Tämä tiedosto lataa valikon elementit.
var menuLoad = function(game){
};

menuLoad.prototype = {
        
    preload: function(){
        

            // ladataan valikon elementit
            this.game.load.image('menuHeader', 'assets/placeholders/header3.png'); 
            this.game.load.image('menuHeaderDeco', 'assets/placeholders/header3deco.png');
            this.game.load.spritesheet('buttonSprite', 'assets/placeholders/menuButtonSpriteEmpty2.png', 400, 70);
            this.game.load.image('menuBG', 'assets/sprites/VS_background_orange.png');    
            this.game.load.image('menuButtonBG', 'assets/placeholders/menubgplaceholder.png');
            this.game.load.image('menuBack', 'assets/placeholders/back.png');
            this.game.load.image('menuNext', 'assets/placeholders/next.png');
        
            this.game.load.image('playerShip', 'assets/sprites/VS_peli_ship_Old.png');
            // loadouttiin
            this.game.load.image('availableTray', 'assets/placeholders/availableTray.png');
            // aseet
            this.game.load.image('weapon0', 'assets/placeholders/weapon0.png');
            this.game.load.image('weapon1', 'assets/placeholders/weapon1.png');
            this.game.load.image('weapon2', 'assets/placeholders/weapon2.png');
            this.game.load.image('weapon3', 'assets/placeholders/weapon3.png');
            // tehosteet
            this.game.load.image('ability0', 'assets/placeholders/ability0.png');
            this.game.load.image('ability1', 'assets/placeholders/ability1.png');
            this.game.load.image('ability2', 'assets/placeholders/ability2.png');
            this.game.load.image('ability3', 'assets/placeholders/ability3.png');
            
            this.game.load.image('slot', 'assets/placeholders/slot.png');
            //this.game.load.audio('testi', 'assets/sounds/testi.mp3');
			 this.game.load.image('minus', 'assets/menuelements/minus.png');
			 this.game.load.image('plus', 'assets/menuelements/plus.png');
            this.game.load.image('needle', 'assets/menuelements/needle.png');
            this.game.load.image('slider', 'assets/menuelements/slider.png');
			 
			 this.game.load.image('hunter', 'assets/sprites/playerHunter.png');
			 this.game.load.image('commander', 'assets/sprites/hunterFinal.png');

        this.game.load.image('textFieldBG', 'assets/placeholders/textFieldBG.png');
        this.game.load.image('flasher', 'assets/placeholders/flasher.png');

        //this.game.load.audio('dustsucker', 'assets/sounds/dustsucker.mp3');
        //this.game.load.audio('dystopia', 'assets/sounds/dystopia.mp3');
          
        },
  
        create: function(){
            var self = this;
            var textStyle = { font: "20px cyber"};
             var nameStyle = { font: "20px Calibri", fill:"blue"};
            var headingStyle = { font: "35px cyber", fill:"white"};
            
            //this.music = game.sound.play('testi');
            this.menubg = this.game.add.sprite(0, 0,  "menuBG");
           
            this.menuheader = this.game.add.sprite(0,0, "menuHeader");
            var decos = this.game.add.sprite(0,0, "menuHeaderDeco");
            decos.y = this.menuheader.height-decos.height;
            var logotext = this.game.add.text(550, 20, "Raving Space");
            this.menuheader.addChild(logotext);
            this.menuheader.addChild(decos);

            
            this.menubbg = this.game.add.sprite(150, 100,  "menuButtonBG");
            this.menubbg.tint = 0x858585;
            //alustetaan valikon otsikko ja viiva
            this.menuLabel = this.game.add.text(this.game.width/2, 120, '', headingStyle);
            
            this.headUnder = this.game.add.sprite(180, 170,  "menuHeader");
            this.headUnder.scale.setTo(0.7, 0.03);
            
            // logout -painiket
            this.logoutBtn = this.game.add.button(1160, 20, "menuHeader", this.logout, this, 1, 0, 2);
            this.logoutBtn.scale.setTo(0.08, 0.5);
            this.logoutBtn.tint = 0xf0f0f0;
            var logText = this.game.add.text(0,22.5,"Logout",{font:"18px cyber"});
            logText.x = (this.logoutBtn.width/2)*(1/0.08)-(logText.width*(1/0.08)/2);
            this.logoutBtn.addChild(logText);
            this.menuheader.addChild(this.logoutBtn);
            this.logoutBtn.getChildAt(0).scale.setTo((1/0.08), 1.5);

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
                "shipData":[1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
                "playerScores":[
                    25000,21566,20145,19563,18054,12056,11753,10654,9236,4067
                ]
            };//demo
            this.globalScores = {"highScores":[["testi1",25000],["testi1",21566],["testi1",20145],["testi1",19563],["testi1",18054],["testi1",12056],["testi1",11753],["testi1",10654],["testi1",9236],["testi1",4067],["testi2",100],["testi2",0],["testi2",0],["testi2",0],["testi2",0],["testi2",0],["testi2",0],["testi2",0],["testi2",0],["testi2",0],["testi3",0],["testi3",0],["testi3",0],["testi3",0],["testi3",0],["testi3",0],["testi3",0],["testi3",0],["testi3",0],["testi3",0],["testi4",0],["testi4",22798],["testi4",0],["testi4",0],["testi4",0],["testi4",0],["testi4",0],["testi4",0],["testi4",0],["testi4",0],["testi5",0],["testi5",0],["testi5",0],["testi5",0],["testi5",0],["testi5",0],["testi5",0],["testi5",0],["testi5",0],["testi5",0],["testi6",0],["testi6",0],["testi6",0],["testi6",0],["testi6",0],["testi6",0],["testi6",0],["testi6",0],["testi6",0],["testi6",0],["testi7",30000],["testi7",0],["testi7",0],["testi7",0],["testi7",0],["testi7",0],["testi7",0],["testi7",0],["testi7",0],["testi7",0],["testi8",0],["testi8",0],["testi8",0],["testi8",0],["testi8",0],["testi8",0],["testi8",0],["testi8",0],["testi8",0],["testi8",0],["testi9",0],["testi9",0],["testi9",0],["testi9",0],["testi9",0],["testi9",0],["testi9",0],["testi9",0],["testi9",0],["testi9",0],["testi10",0],["testi10",0],["testi10",0],["testi10",0],["testi10",0],["testi10",0],["testi10",0],["testi10",0],["testi10",0],["testi10",0],["testi11",0],["testi11",0],["testi11",0],["testi11",0],["testi11",0],["testi11",0],["testi11",0],["testi11",0],["testi11",0],["testi11",0],["test12",0],["test12",0],["test12",0],["test12",0],["test12",0],["test12",0],["test12",0],["test12",0],["test12",0],["test12",0],["test13",0],["test13",0],["test13",0],["test13",0],["test13",0],["test13",0],["test13",0],["test13",0],["test13",0],["test13",0],["test14",0],["test14",0],["test14",0],["test14",0],["test14",0],["test14",0],["test14",0],["test14",0],["test14",0],["test14",0],["test15",0],["test15",0],["test15",0],["test15",0],["test15",0],["test15",0],["test15",0],["test15",0],["test15",0],["test15",0]]};//demo
            var scoreSort = [];
            for(var i = 0;i < this.globalScores.highScores.length;i++) {
                scoreSort.push(this.globalScores.highScores[i]);
            }
            scoreSort.sort(this.compare);
            this.globalScores = scoreSort;
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
                backButton:this.backButton,
                musics:["dustsucker","dystopia"]
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
