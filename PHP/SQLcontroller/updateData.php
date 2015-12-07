<?php
	//alustetaan tiedot
	$returnObject = "";
	$usage = $_POST['usage'];
    $playerName = "";

	if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
		$playerName = $_POST['playerName'];
		$servername = "mysql.labranet.jamk.fi";
		$user = "H3492";
		$pass = "cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
		$DBcon = new mysqli($servername,$user,$pass, "H3492_3");
		if ($DBcon->connect_error) {
			die("Connection failed: " . $DBcon->connect_error);
		}
	} else {
		$playerName = $_POST['playerName'];
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
	function newWave($playerName,$DBcon){
        $loginFollowID = $_POST['loginFollowID'];
        $waveData = $_POST['wave'];
        $points = $_POST['points'];
        $select = "select fail2 from loginAttempts where loginFollowID = $loginFollowID";
        $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
        $row = $query->fetch_array(MYSQLI_BOTH);
        if($row['fail2'] == "in") {
            $select = "insert into attackWaves (waveData,attackLoot,attackState)
                      values (".$waveData.",0,'Unused')";
            $DBcon->query($select);
            $select = "insert into playersAttacks (attackID,playerID) select MAX(attackID), '".$playerName."' from attackWaves";
            $DBcon->query($select);
            $select = "update playerData set points = $points where playerID = '$playerName'";//päivitetään pelaajan pisteet
            echo $select;
            echo $waveData;
            $DBcon->query($select);
        }
	}
	function shoppingEvent($playerName,$DBcon){
		$loginFollowID = $_POST['loginFollowID'];//tätä voidaan käyttää myös shipIDnä sillä sama luku
        $shipData = $_POST['shipData'];
        $playerMoney = $_POST['money'];
		$select = "select fail2 from loginAttempts where loginFollowID = $loginFollowID";
		$query = $DBcon->query($select);//tulokset ovat $query muuttujassa
		$row = $query->fetch_array(MYSQLI_BOTH);
		if($row['fail2'] == "in") {
            $select = "update shipStates set ";
            for($i = 0;$i < count($shipData);$i++){
                if($i !=  count($shipData)-1) {
                    $select .= "wep$i = $shipData[$i],";
                } else {
                    $select .= "wep$i = $shipData[$i]";
                }
            }
            $select .= " where shipStates.shipID = '$loginFollowID')";
            $DBcon->query($select);
            $select = "update playerData set money = $playerMoney where playerData.playerID = '$playerName'";
            $DBcon->query($select);
		}
	}
	function finishedGame($playerName,$DBcon){
		$attackID = $_POST['attackID'];
		$attackLoot = $_POST['attackLoot'];
		$points = (integer)$_POST['points'];
		$scoreID = $_POST['scoreID'];
		$scoreToUpdate = $_POST['scoreToUpdate'];
		//$DBcon = "";

        echo "".$attackID." ".$attackLoot." ".$points." ".$scoreID." ".$scoreToUpdate."+ ";

		$select = "update attackWaves set attackState = 'Destroyed', attackLoot = $attackLoot where attackID = $attackID";//päivitetään käytetyn aallon tiedot
        echo $select;
		$DBcon->query($select);
		$select = "update playerData set points = $points where playerID = '".$playerName."'";//päivitetään pelaajan pisteet
        echo $select;
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
		newWave($playerName,$DBcon);
	} 
	else if($usage == 3){
		shoppingEvent($playerName,$DBcon);
	} 
	else if($usage == 4){
		finishedGame($playerName,$DBcon);
	}
	else if($usage == 5){
		logOff($returnObject,$DBcon);
	}
	//suljetaan yhteys
	//$query->close();
	$DBcon->close();
	//echo $returnObject;
?>