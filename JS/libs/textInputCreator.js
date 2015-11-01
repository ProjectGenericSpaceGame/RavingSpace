var createInput = function createInput(game,style,width,height){
    this.game = game;
    this.style = style;
    this.width = width;
    this.height = height;
    this.keydownTrack = 0;
    this.flasherLocation = 1;
    this.inputField = this.game.add.button(0,0,'textFieldBG',this.giveFocus,this);
    this.inputField.width = this.width;
    this.inputField.height = this.height;
    this.text = this.game.add.text(10,5,"",style);
    this.field = this.game.add.group();
    this.field.addChild(this.inputField);
    this.field.addChild(this.text);
    $("body").append('<input type="text" id="userInput" name="userInput"/>');
    this.backgroundField = $("#userInput");
    var self = this;
    this.backgroundField.keydown(function(event){
        self.keydownTrack++;
        if(event.which == 8) {
            self.updateText(self);
        }
        else if(self.keydownTrack > 2){
            self.updateText(self,event);
            self.keydownTrack = 0;
        }
    });
    this.backgroundField.keyup(function(event){
        self.updateText(self,event);
    });
    this.inputField.inputEnabled = true;
    this.inputField.events.onInputDown.add(this.active,this);
    function remove(){
        self.field.destroy();
        $("#userInput").remove();
    }
};
createInput.prototype.active = function(){
    if(this.activeFlasher == null) {
        this.activeFlasher = this.game.add.sprite(this.text.width+10, 5, 'flasher');
        this.activeFlasher.height = this.inputField.height-10;
        this.activeFlasher.width = 1;
        this.field.addChild(this.activeFlasher);
    }
};
createInput.prototype.removeActive = function(){
    this.field.removeChildAt(this.field.length);
};
createInput.prototype.updateText = function(self,e){
    var newWidth = self.backgroundField.val().substring(0,self.backgroundField.val().length-self.flasherLocation);
    var charWidthString = self.game.add.text(-200,200,newWidth,self.style);
    if(e.which != 37 && e.which != 39) {
        var value = self.backgroundField.val();
        self.text.text = value;
        self.activeFlasher.x = self.text.width+10;
        self.flasherLocation = 1;
    } else if(e.which == 37){
        self.activeFlasher.x = charWidthString.width+10;
        self.flasherLocation++;
    } else if(e.which == 39 && self.activeFlasher.x != self.text.width + 5){
        self.activeFlasher.x += self.text.width/self.backgroundField.val().length-1;
    }
    charWidthString.destroy();
};
createInput.prototype.giveFocus = function(){
    $("#userInput").focus();
};