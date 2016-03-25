<?php
    session_start();
    if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
		require_once('../db-init.php');
	} else {
		require_once('../db-initDEV.php');
	}
	$returnObject = "";
    $playerName = $_SESSION['playerName'];
    //$playerName = 'testi1';
    /** @var PDO $db */
    $db = new DBcon();
    $db = $db->returnCon();
	//query
	$select =
	"select * from playerData
	inner join shipStates
	on shipStates.playerID = playerData.playerID
	inner join loginAttempts
	on loginAttempts.loginfollowID = playerData.loginfollowID
	WHERE playerData.playerID = '$playerName';";

	$query = $db->prepare($select);//tulokset ovat $query muuttujassa
	$query->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);
	if($row['loggedIn'] == "in") {
        $shipID = $row['shipID'];
        $loginFollowID = $row['loginFollowID'];
		//rakennetaan returnObject muuttuja
		//pelaajan tiedot
		$returnObject = '{"playerData":{"playerName":"' . $row['playerID'] .
			'","email":"' . $row['email'] .
			'","money":' . $row['money'] .
			',"points":' . $row['points'] . '},';
		//pelaajan aluksen tiedot
        $returnObject .= '"shipPowers":[';
        $selectPowers = "SELECT has FROM shipPowers
                         WHERE shipID = '$shipID'";
        $query = $db->prepare($selectPowers);
	    $query->execute();
        $amount = $query->rowCount();
        $i = 0;
        while($rowPower = $query->fetch(PDO::FETCH_ASSOC)){
            if($i+1 == $amount){
               $returnObject .= '"'.$rowPower['has'].'"'; 
            }else if ($i <= $amount){
               $returnObject .= '"'.$rowPower['has'].'"'.",";      
            }
		    $i++;    
        }
        $returnObject .= '],';
        $returnObject .= '"shipGuns":[';
        $selectGuns = "SELECT has FROM shipGuns
                        WHERE shipID = '$shipID'";
        $query = $db->prepare($selectGuns);
	    $query->execute();
        $amount = $query->rowCount();
        $i = 0;
        while($rowGun = $query->fetch(PDO::FETCH_ASSOC)){
            if($i+1 == $amount){
               $returnObject .= '"'.$rowGun['has'].'"'; 
            }else if ($i <= $amount){
               $returnObject .= '"'.$rowGun['has'].'"'.",";      
            }
		    $i++;    
        }
        $returnObject .= '],';
		$playerID = $row['playerID'];
		$select = "SELECT * FROM highScores where playerID = '$playerID';";
		$query = $db->prepare($select);
        $query->execute();
        $a = $query->rowCount();
        $i = 0;
        $returnObject .= '"playerScores":[';
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            if($i+1 == $a){
               $returnObject .= $row['score']; 
            }else if($i <= $a){
                $returnObject .= $row['score'].",";
            }
		  $i++;
        }
		$returnObject .= '],';
       /* $returnObject .= '"scoreID":' . $scoreID . ","; */
		$returnObject .= '"ship":' . $shipID . ",";
		$returnObject .= '"loginFollowID":' . $loginFollowID;
		$returnObject .= '}';
	}
    else {
        $returnObject = true;
    }
    $db = null;
	echo $returnObject;
?>