<?php
	//alustetaan tiedot
	$returnObject = "";
	$usage = $_POST['usage'];
	if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/"){
		$playerName = $_POST['playerName'];
		$servername = "mysql.labranet.jamk.fi";
		$user = "H3492";
		$pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
		$DBcon = new mysqli($servername,$user,$pass, "H3492_3");
		if ($DBcon->connect_error) {
			die("Connection failed: " . $DBcon->connect_error);
		}
	} else {
		$playerName = "testi1";
		$servername = "localhost";
		$user = "root";
		$pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
		$DBcon = new mysqli($servername,$user,$pass, "H3492_3");
		if ($DBcon->connect_error) {
			die("Connection failed: " . $DBcon->connect_error);
		}
	}
	//query
	
	function updateAccountInfo(){
	
	}
	function newWave(){
		
	}
	function shoppingEvent(){
		
	}
	function finishedGame(){
		$attackID = $_POST['attackID'];
		$attackLoot = $_POST['attackLoot'];
		$points = $_POST['points'];
		$scoreID = $_POST['scoreID'];
		$scoreToUpdate = $_POST['scoreToUpdate'];
		
		$select = 'update attackWaves set attackState = "Destroyed", attackLoot = $attackLoot where attackID = $attackID';//päivitetään käytetyn aallon tiedot
		$DBcon->query($select);
		$select = 'update playerData set points = $points, where playerID = $playerName';//päivitetään pelaajan pisteet
		$DBcon->query($select);
		if($scoreToUpdate != -1){
			$select = "update highScores set
											score1 = $scoreToUpdate[9],
											score2 = $scoreToUpdate[8],
											score3 = $scoreToUpdate[7],
											score4 = $scoreToUpdate[6],
											score5 = $scoreToUpdate[5],
											score6 = $scoreToUpdate[4],
											score7 = $scoreToUpdate[3],
											score8 = $scoreToUpdate[2],
											score9 = $scoreToUpdate[1],
											score10 = $scoreToUpdate[0]
						where scoreID = $scoreID";
						$DBcon->query($select);
		}
		
	}
	function logOff($returnObject,$DBcon){
		$loginFollowID = intval($_POST['loginFollowID']);
		$select = "update loginAttempts set fail2 = 'out' where loginFollowID = $loginFollowID";
		$DBcon->query($select);
	}

	if($usage == 1){
		updateAccountInfo();
	} 
	else if($usage == 2){
		newWave();
	} 
	else if($usage == 3){
		shoppingEvent();
	} 
	else if($usage == 4){
		finishedGame();
	}
	else if($usage == 5){
		logOff($returnObject,$DBcon);
	}
	//suljetaan yhteys
	//$query->close();
	$DBcon->close();
	//echo $returnObject;
?>