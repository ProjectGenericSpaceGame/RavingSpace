<?php
    if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
		require_once('../db-init.php');
	} else {
		require_once('../db-initDEV.php');
	}
	/** @var PDO $db */
	$db = new DBcon();
	$db = $db->returnCon();
	//alustetaan tiedot
    $playerName = $_POST['playerName'];
	$returnObject = "";
	//query
	$select =
	"SELECT waveData, attackLoot, attackState, loginAttempts.loggedIn FROM attackWaves inner join playerData on playerData.playerID = attackWaves.playerID inner join loginAttempts on loginAttempts.loginFollowID = playerData.loginFollowID WHERE attackWaves.playerID = '$playerName'"; 

	$query = $db->query($select);//tulokset ovat $query muuttujassa
    $query->execute();
	//rakennetaan returnObject muuttuja
	//aallon tiedot
	$returnObject ='{"playerWaves":[';
    $len = $query->rowCount();
    $iter = 1;
		while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $tempString = $row['waveData']."";
            $tempStruckArr = str_split($tempString,6);
            $returnObject .= '{"waveStruct":"'.$tempStruckArr[0]."'".$tempStruckArr[1]."'".$tempStruckArr[2].
            '","waveStatus":"'.$row['attackState'];
            if($iter != $len) {
                $returnObject .= '","profit":' . $row['attackLoot'] . '},';
            } else {
                $returnObject .= '","profit":' . $row['attackLoot'] . '}';
            }
            $iter++;
		}
	$returnObject .= ']}';
	if($row['loggedIn'] == "out"){
		$returnObject = true;
	} else {
	}
	$db = null;
	echo $returnObject;
?>