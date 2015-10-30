// tästä valitaan aseet ja tehosteet mukaan

var loadoutMenu = function(game){
   
};

loadoutMenu.prototype = {
    
        init:function(playerData,globalScores,playerWaves,buttonGroup,surroundings){
        this.playerData = playerData;
        this.globalScores = globalScores;
        this.playerWaves = playerWaves;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
        
    },
    
        preload:function(){
        //do some murdering here
        this.buttonGroup.removeAll();

    },
    
    create:function(){
        
        this.thingsGroup = this.game.add.group();
        // valitut aseet ja tehosteet
       this.selectedLoadout = [];
        // valittujen aseiden lukumäärä
        this.wC = 0;
        // valittujen tehosteiden lukumäärä
        this.aC = 4;
        // onko asevalikko olemassa
        this.am = false;
        // onko tehostevalikko olemassa
        this.im = false;
        this.x = 450;
        this.ax = 450;
        
        // Sivun otsake
        this.surroundings.menuLabel.text = 'Loadout';
        var style = { font:'25px calibri', fill:'black'};
        // Go -painike. Sitä painamalla aloitetaan peli
        this.goButton = this.game.add.button(975, 680, 'buttonSprite', this.gameStart, this, 0, 1, 2);
        this.goButton.scale.setTo(0.3, 0.9);
        var goLabel = this.game.add.text(120,20,"Go!");
        this.goButton.addChild(goLabel);
        this.goButton.getChildAt(0).scale.setTo(3, 1);
        
        // Back -nappula. Sitä painamalla päästään takaisin päävalikkoon
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20, 'Back',style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);

        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.goButton);
       
        // weapon slots/ aseitten paikat
        for (var i = 0; i <= 2; i++){
            this.button = this.game.add.button(this.x, 250, 'slot', this.selectWeapon,this);
            this.button.name = 'wepslot' + i;
            this.buttonGroup.add(this.button);
            this.x += 150;
        }
        
        
        // ability slots / tehosteiden paikat
        for (var i = 0; i <= 2; i++){
            this.button = this.game.add.button(this.ax, 600, 'slot', this.selectAbility,this);
            this.button.name = 'abslot' + i;
            this.buttonGroup.add(this.button);
            this.ax += 150;
        }
        
       
        

        
    },
    
    selectWeapon: function(button){
        // console.log("onko tehosteet olemassa "+this.im+" onko aseet olemassa "+this.am);
        this.prewep = button;
        this.x = 905;
        this.y = 205;
        
        // Mikäli toinen tehostevalikko on auki se suljetaan
        if(this.im == true){
            this.thingsGroup.removeAll();
            this.im = false;
        }
         // Mikäli asevalikko ei ole auki se avataan
        if (this.am == false){
            this.sweapon = this.game.add.sprite(900, 200, 'availableTray');
            this.thingsGroup.add(this.sweapon);
            for ( var i = 0; i <= 3; i++){
                if (this.playerData.shipData[i] == 1){
                    if(this.x > 905 + (92.5 * 2)){
                        this.y += 95;
                        this.x = 905;
                    }
                    if(this.selectedLoadout[i] == null){
                    this.button = this.game.add.button(this.x, this.y, 'weapon1', this.weppressed, this);
                    this.button.name = 'weapon' + i;
                    this.thingsGroup.add(this.button);
                    this.x += 92.5;
                } }
            }
            
            this.am = true;
        } else {
            this.thingsGroup.removeAll();
            this.am = false;
        }
        
    },
    
    selectAbility: function(button){
        //console.log("onko tehosteet olemassa "+this.im+" onko aseet olemassa "+this.am);
        this.preab = button;
    
        this.x = 905;
        this.y = 405;
        // Mikäli toinen asevalikko on auki se suljetaan
        if(this.am == true){
            this.thingsGroup.removeAll();
            this.am = false;
        }
        // Mikäli tehostevalikko ei ole auki se avataan
        if (this.im == false){
            this.sweapon = this.game.add.sprite(900, 400, 'availableTray');
            this.thingsGroup.add(this.sweapon);
            for ( var i = 4; i <= 7; i++){
                // tarkistetaan pelaajan datasta onko pelaaja avannut aseita.
                if (this.playerData.shipData[i] == 1){
                    // mikäli aseita on 3 vierekkäin niin 4. ase laitetaan toiselle riville. purkkakoodia.
                    if(this.x > 905 + (92.5 * 2)){
                        this.y += 95;
                        this.x = 905;
                    }
                    if (this.selectedLoadout[i] == null){
                    // jos on niin lisätään ne aseet valittavien aseiden listaan.
                    this.button = this.game.add.button(this.x, this.y, 'ability1', this.abpressed, this);
                    this.button.name = 'ability' + i;
                    this.thingsGroup.add(this.button);
                    this.x += 92.5;
                    }
                
            } }
            this.im = true;
        // jos se olikin jo auki se suljetaan. 
        //Kun esim tuplaklikkaa samaa tehostepaikkaa niin valikko avautuu ja sulkeutuu    
        } else {
            this.thingsGroup.removeAll();
            this.im = false;
        }
    },
    
    weppressed: function(button){
        var p = button;
        if(this.wC <= 2){
            this.selectedLoadout[this.wC] = button.name;
            console.log(this.selectedLoadout[this.wC]);
            this.wC += 1;
        } else {
            console.log("liikaa aseita, et voi valita enää");
        }
        // Lisätään sen aseen kuvake paikkaan josta pelaaja painoi.
        var icon = this.game.add.sprite(3,3, p.key);
        this.prewep.addChild(icon);
        p.kill();
        this.thingsGroup.remove(p);
     }, 
    
    abpressed: function(button){
        var p = button;
        
        if(this.aC <= 7){
            this.selectedLoadout[this.aC] = button.name;
            console.log(this.selectedLoadout[this.aC]);
            this.aC += 1;
        } else {
            console.log("liikaa tehosteita, et voi valita enää");
        }
         // Lisätään sen tehosteen kuvake paikkaan josta pelaaja painoi.
        var icon = this.game.add.sprite(3,3, p.key);
        this.preab.addChild(icon);
        p.kill();
        this.thingsGroup.remove(p);
    },
    
   
    
    gameStart: function(){
        // kutsutaan gameLoad -tilaa
        this.game.state.start('gameLoad');
    
    },
 
    back:function(){
        
        this.thingsGroup.removeAll();
        // palataan takaisin päävalikkoon
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );

    }
}