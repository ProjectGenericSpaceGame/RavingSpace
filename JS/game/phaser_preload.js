var preload = function(game){

};
preload.prototype = {
    init:function(loadout,playerData,surroundings){
        this.loadout = loadout;
        this.playerData = playerData;
        this.surroundings = surroundings;
    },
    preload:function(){
        //ladataan latausruutu
        this.game.load.image('loadScreen', 'assets/loader/loadscreen1.png');
    },
    create:function(){
        this.loader = this.game.add.sprite(0,0,'loadScreen');
        this.loader.bringToTop();
        this.game.state.start("gameLoad",false,false,
            this.loadout,
            this.playerData,
            this.loader,
            this.surroundings
        );
    }
};