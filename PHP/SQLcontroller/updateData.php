<?php
	//alustetaan tiedot
	$returnObject = "";
	$usage = $_POST['usage'];
    // $usage memory list:    
    // 2 newWave
    // 3 shoppingEvent
    // 4 finishedGame
    // 5 loggOff
    $playerName = $_POST['playerName'];
    //$playerName = "testi1";
    

    if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
		require_once('../db-init.php');
	} else {
		require_once('../db-initDEV.php');
	}
    $db = new DBcon();
    $db = $db->returnCon();

	function updateAccountInfo(){
	
	}
	function newWave($playerName,$db){
        $loginFollowID = $_POST['loginFollowID'];
        //$loginFollowID = 1;
        $waveData = $_POST['wave'];
        //$waveData = "101104151207231009";
        $points = $_POST['points'];
        //$points = "40000";
        $select = "SELECT loggedIn FROM loginAttempts WHERE loginFollowID = $loginFollowID";
        $query = $db->prepare($select);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        if($row['loggedIn'] == "in") {
            $select = "INSERT INTO attackWaves (waveData,attackLoot,attackState, playerID) VALUES (".$waveData.",0,'Unused','$playerName')";
            $query = $db->prepare($select);
            $query->execute();

            $select = "UPDATE playerData SET points = $points WHERE playerID = '$playerName'";//päivitetään pelaajan pisteet
            echo $select;
            $query = $db->prepare($select);
            $query->execute();
        }
	}
	function shoppingEvent($playerName,$db){
        $echoobject = "";
		$loginFollowID = $_POST['loginFollowID'];//tätä voidaan käyttää myös shipIDnä sillä sama luku
        $weapons = $_POST['weapons'];
        $abilities = $_POST['abilities'];
        $playerMoney = $_POST['money'];
		$select = "SELECT loggedIn FROM loginAttempts WHERE loginFollowID = $loginFollowID";
		$query = $db->prepare($select);
        $query->execute();
		$row = $query->fetch(PDO::FETCH_ASSOC);
		if($row['loggedIn'] == "in") {
            for($i = 0; $i <= count($weapons)-1; $i++){
                if($weapons[$i] != 'undefined' && $weapons[$i] != null){
                    $select = "SELECT * FROM shipGuns WHERE shipID = $loginFollowID AND has = '$weapons[$i]';";
                    $query = $db->prepare($select);
                    $query->execute();
                    $amount = $query->rowCount();
                    if($amount == 0){
                        $select = "INSERT INTO shipGuns (shipID, has) VALUES ($loginFollowID,'$weapons[$i]');";
                        $query = $db->prepare($select);
                        $query->execute();
                    }
                }
            }
           for($i = 0; $i <= count($abilities)-1; $i++){
                if($abilities[$i] != 'undefined' && $abilities[$i] != null){
                    $select = "SELECT * FROM shipPowers WHERE shipID = $loginFollowID AND has = '$abilities[$i]';";
                    $query = $db->prepare($select);
                    $query->execute();
                    $amount = $query->rowCount();
                    $echoobject .= $abilities[$i];
                    if($amount == 0){
                        $select = "INSERT INTO shipPowers (shipID, has) VALUES ($loginFollowID,'$abilities[$i]');";
                        $query = $db->prepare($select);
                        $query->execute();
                    }
                }
            }
            echo $echoobject;
            $select = "UPDATE playerData set money = $playerMoney WHERE playerData.playerID = '$playerName'";
            $query = $db->prepare($select);
            $query->execute();
        }
    }
	
	function finishedGame($playerName,$db){
		$attackID = $_POST['attackID'];
		$attackLoot = $_POST['attackLoot'];
		$points = (integer)$_POST['points'];
		$scoreID = $_POST['scoreID'];
		$scoreToUpdate = $_POST['scoreToUpdate'];
        //haetaan aallon omistajan rahat päivitystä varten
        $select = "SELECT playerData.playerID, playerData.money FROM playersAttacks
        inner join playerData
        on playerData.playerID = playersAttacks.playerID
        WHERE playersAttacks.attackID = $attackID";
        $query = $db->prepare($select);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        $attackOwnerMoney = $row['money'];
        $attackOwnerMoney += $attackLoot;
        $attackOwner = $row['playerID'];
		echo $attackOwner;
		//tässä päivitetään aallon tiedot
        
        // POISTETAAN vvvvvv
        $wasTester = false;
        for($i = 0;$i<15;$i++){//kannassa on 15 testikäyttäjää, katsotaan ettei ollut heidän aaltonsa
			echo "testi".($i+1)."ja tulos: ".$attackOwner == "testi".($i+1);
            if($attackOwner == "testi".($i+1) || $attackOwner == "test".($i+1)){
                $wasTester = true;
            }
        }
        // POISTETAAN ^^^^^^
        
        if(!$wasTester) {
            $select = "UPDATE attackWaves SET attackState = 'Destroyed', attackLoot = $attackLoot WHERE attackID = $attackID";
            $DBcon->query($select);
        }
		//päivitetään käytetyn aallon omistajan tiedot
        $select = "UPDATE playerData SET money = $attackOwnerMoney WHERE playerID = '$attackOwner'";
        echo $select;
		$db->prepare($select);
        $db->execute();
		//tässä taas pelaajan tiedot
		$select = "update playerData set points = $points where playerID = '".$playerName."'";//päivitetään pelaajan pisteet
        echo $select;
		$db->prepare($select);
        $db->execute();
		if($scoreToUpdate != -1){
			$select = "UPDATE highScores SET
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
						WHERE scoreID = $scoreID";
						$db->prepare($select);
                        $db->execute();
		}
		
	}
	function logOff($returnObject,$db){
		$loginFollowID = intval($_POST['loginFollowID']);
		$select = "UPDATE loginAttempts SET loggedIn = 'out' WHERE loginFollowID = $loginFollowID";
		$db->prepare($select);
        $db->execute();
	}

	if($usage == 1){
		updateAccountInfo();
	} 
	else if($usage == 2){
		newWave($playerName,$db);
	} 
	else if($usage == 3){
		shoppingEvent($playerName,$db);
	} 
	else if($usage == 4){
		finishedGame($playerName,$db);
	}
	else if($usage == 5){
		logOff($returnObject,$db);
	}
	//suljetaan yhteys
    $db = null;
?>