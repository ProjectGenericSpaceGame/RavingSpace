// tämä on kauppa

var shopMenu = function(game){

};

shopMenu.prototype = {
    init:function(playerData, buttonGroup,surroundings){
        this.playerData = playerData;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
    },
    preload:function(){
        //do some murdering here
       this.buttonGroup.removeAll();
     

    },
    create:function(){
        
        this.weaponsLabel = this.game.add.text(600, 120, 'Shop');
        this.weaponsLabel.fill = 'white';
        this.headUnder = this.game.add.sprite(180, 170,  'menuHeader');
        this.headUnder.scale.setTo(0.7, 0.03);
        
        var style = { font:'25px calibri', fill:'black'};
        
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.customStart, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var text1 = this.game.add.text(227,125,"Back", style);
        
       
        
        
        // Aseet
        this.weaponsLabel = this.game.add.text(220, 260, 'Weapons');
        this.weaponsLabel.fill = 'white';
        this.weaponTray = this.game.add.sprite(250, 300,  'menuHeader');
        this.weaponTray.scale.setTo(0.6, 2);
        this.weaponTray.tint = 0x858585;
        this.weaponTray.alpha = 0.7;
        
        // Tehosteet
        this.abilityLabel = this.game.add.text(220, 460, 'Abilities')
        this.abilityLabel.fill = 'white';
        this.abilityTray = this.game.add.sprite(250, 500,  'menuHeader');
        this.abilityTray.scale.setTo(0.6, 2);
        this.abilityTray.tint = 0x858585;
        this.abilityTray.alpha = 0.7;
       
        this.buttonGroup.add(this.backButton);
         this.buttonGroup.add(this.weaponsLabel);
         this.buttonGroup.add(this.abilityLabel);
         this.buttonGroup.add(this.abilityTray);
         this.buttonGroup.add(this.weaponTray);
         this.buttonGroup.add(text1);
        },
        

        customStart: function(){
        this.game.state.start('custom',false,false, 
            this.playerData,
            this.buttonGroup,
            this.surroundings);
         
        
        }
    
    
};