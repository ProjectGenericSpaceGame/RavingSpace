/**
 * Created by RAndom MC on 14/10/2015.
 */
var settingsSubMenu = {

};
settingsSubMenu.prototype = {
    init:function(playerData, buttonGroup,surroundings){
        this.playerData = playerData;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
    },
    preload:function(){
        //do some killing here
        buttonGroup.kill();
    },
    create:function(){

    }

};