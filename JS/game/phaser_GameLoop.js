function update(){
	ship.body.mass = 0.7;
	ship.body.damping = 0.7;
	
	var suunta = 0;
	asteroids.forEach(function(item){
		if (suunta == 0){
			item.body.rotateLeft(0.6);
			suunta = 1;
		} else if (suunta == 1){
			item.body.rotateRight(0.7);
			suunta = 2;
		} else {
			item.body.rotateLeft(0.8);
			suunta = 0;
		}
		
	});
	
	//calculate deg
	if(ship.body.y <= 400){
		Ycoord = (ship.body.y)-game.input.mousePointer.y;
	} 
	else {
		Ycoord = (ship.body.y-game.camera.y)-game.input.mousePointer.y;
	}
	if (ship.body.x <= 600){
		Xcoord = game.input.mousePointer.x-(ship.body.x);
	}
	else {
		Xcoord = game.input.mousePointer.x-(ship.body.x-game.camera.x);
	}
	console.log(Ycoord+"ja X:"+Xcoord);
	console.log(ship.body.y+"ja hiiri:"+game.input.mousePointer.y);
	console.log(game.camera.width);
    var X2 = Xcoord*Xcoord;
    var Y2 = Ycoord*Ycoord;
    var YX2 = X2+Y2;
    switch(true){
    case (Xcoord > 0 && Ycoord > 0):
        deg = Math.atan(Ycoord/Xcoord);
        break;
    case (Xcoord < 0 && Ycoord > 0):
        deg = (Math.atan(((Xcoord/Ycoord)*(0-1))))+(pi/2);
        break;
    case (Xcoord < 0 && Ycoord < 0):
        deg = (Math.atan(Ycoord/Xcoord))+pi;
        break;
    case (Xcoord > 0 && Ycoord < 0):
        deg = (Math.atan((Xcoord/Ycoord)*(0-1)))+((3*pi)/2);
        break;
    default:
        console.log("lol");
    }
	console.log(ship.body.rotation);
	//rotation arvo yli ~7.8 tai alle ~-7.8
	if(ship.body.rotation > 2*pi+(pi/2) || ship.body.rotation < -1*((2*pi)+(pi/2))){
		ship.body.rotation = pi/2;
		flipped = true;
		console.log("nollattu"+(2*pi));
	}//mikäli raja-arvojen sisällä mutta negatiivinen 
	else if(ship.body.rotation < pi/2){
		ship.body.rotation = 2*pi-(ship.body.rotation*-1); 
		flipped = true;
	}
	shipRot = ship.body.rotation;
	console.log(ship.body.rotation);
	//ship.body.rotation = (2*pi-deg)+(pi/2);
	console.log(shipRot+"####"+deg+"###"+(2*pi-deg));
	corDeg = Math.round(((2*pi-deg)+(pi/2))*10)/10;
	corRot = Math.round(ship.body.rotation*10)/10;
	if(corDeg == 7.9){
		corDeg -= 0.1;
	}
	
	//tutkitaan hiiren liikkeen suuntaa
	if(((corDeg < degWas && direct == "right")||(corDeg > degWas && direct == "left"))&& !((degWas > 7.5 && corDeg < 2)||(degWas < 2 && corDeg > 7.5))){
			IntMouseTrack = corDeg; //Tallennetaan se kulma missä hiiren liike vaihtaa suuntaa
	}
	
	//if(!((corDeg > corRot+(pi/2)||corDeg < corRot-(pi/2)) && moving == true)){
		//if(!(direct == "left" && corRot < 3 && corDeg > corRot+1 && corDeg > degWas)){
		if(corDeg > degWas && !(degWas < 2 && corDeg > 7.5 )){
			direct = "right";
		}
		else if (corDeg < degWas && !(degWas > 7.5 && corDeg < 2)){
			direct = "left";
		} 
		
		if(IntMouseTrack != -1 && corDeg > corRot && corDeg <= IntMouseTrack){
			direct = "right";
		} else if(IntMouseTrack != -1 && corDeg < corRot && corDeg >= IntMouseTrack){
			direct = "left";
		} 
	
	//mikäli aluksen kulma on tavoitellussa pisteessä
	if(corRot == corDeg){
		ship.body.setZeroRotation();
		moving = false;
	}
	//Mikäli hiiri ei ole liikkeessä mutta ei myöskään tavoitteessa
	else if(corRot != corDeg){
		if(direct == "right"){
			for(var i = 0;i<=3;i++){
				if(corRot != corDeg){
					console.log("runned"+i);
					ship.body.rotation = corRot+0.1;
				}
				else {
					break;
				}
			}
		} 
		else if (direct == "left"){
			for(var i = 0;i<=3;i++){
				if(corRot != corDeg){
					console.log("runned"+i);
					ship.body.rotation = corRot-0.1;
				}
				else {
					break;
				}
			}
		}
	}
	
	console.log(corRot+"...."+corDeg);
	degWas = corDeg;
	lastRot = Math.round(ship.body.rotation*100)/100;
	
	text.text = String(IntMouseTrack+"+"+direct+"+"+corDeg+"+"+flipped);
	
	//cursors
    if (cursors.up.isDown)
    {
        ship.body.thrust(250);
    }
    else if (cursors.down.isDown)
    {
        ship.body.reverse(250);
    }
	if(cursors.left.isDown){
		//tämä kohdistaa alukseen voimavektorin joka lasketaan aluksen kulman perusteella
		ship.body.applyForce([Math.cos(ship.body.rotation)*10,Math.sin(ship.body.rotation)*10],0,0);
	}
	else if(cursors.right.isDown){
		ship.body.applyForce([-Math.cos(ship.body.rotation)*10,-Math.sin(ship.body.rotation)*10],0,0);
	}

}