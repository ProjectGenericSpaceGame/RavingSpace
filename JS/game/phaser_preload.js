var preload = function(game){

};
preload.prototype = {
    init:function(loadout,playerRelatedData,surroundings){
        this.loadout = loadout;
        this.playerRelatedData = playerRelatedData;
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
            this.playerRelatedData,
            this.loader,
            this.surroundings
        );
    }
};