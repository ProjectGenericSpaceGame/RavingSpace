<?php
	//alustetaan tiedot
	$returnObject = "";
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
		$playerName = "testi1";
		$servername = "localhost";
		$user = "root";
		$pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
		$DBcon = new mysqli($servername,$user,$pass, "H3492_3");
		if ($DBcon->connect_error) {
			die("Connection failed: " . $DBcon->connect_error);
		}
	}
	//avataan yhteys
	//query
	$select =
	"select * from playerData
	inner join shipStates
	on shipStates.shipID = playerData.shipID
	inner join loginAttempts
	on loginAttempts.loginFollowID = playerData.loginFollowID
	WHERE playerData.playerID = '$playerName'";

	$query = $DBcon->query($select);//tulokset ovat $query muuttujassa
	$row = $query->fetch_assoc();
	if($row['fail2'] == "in") {
        $scoreID = $row['scoreID'];
        $shipID = $row['shipID'];
        $loginFollowID = $row['loginFollowID'];
		//rakennetaan returnObject muuttuja
		//pelaajan tiedot
		$returnObject = '{"playerData":{"playerName":"' . $row['playerID'] .
			'","email":"' . $row['email'] .
			'","money":' . $row['money'] .
			',"points":' . $row['points'] . '},';
		//pelaajan aluksen tiedot
		$returnObject .= '"shipData":[' .
			$row['wep1'] . ',' . $row['wep2'] . ',' . $row['wep3'] . ',' . $row['wep4'] . ',' . $row['wep5'] . ',' . $row['wep6'] . ',' . $row['wep7'] . ',' . $row['wep8'] . ',' . $row['wep9'] . ',' . $row['wep10'] . ',' .
			$row['pwer1'] . ',' . $row['pwer2'] . ',' . $row['pwer3'] . ',' . $row['pwer4'] . ',' . $row['pwer5'] . ',' . $row['pwer6'] . ',' . $row['pwer7'] . ',' . $row['pwer8'] . ',' . $row['pwer9'] . ',' . $row['pwer10'] . '],';
		$scoreID = $row['scoreID'];
		$select = "select * from highScores where scoreID = $scoreID";
		$query = $DBcon->query($select);
		$lenght = $query->field_count;
		$row = $query->fetch_array();
		$k = 0;
		$returnObject .= '"playerScores":[';
		while ($k < $lenght) {
			if ($k != 0) {
				if ($row[$k] != null && $k != 1) {
					$returnObject .= ',' . $row[$k];
				} else if ($row[$k] != null && $k == 1) {
					$returnObject .= $row[$k];
				} else if ($row[$k] == null && $k == 1) {
					$returnObject .= '0';
				} else {
					$returnObject .= ',0';
				}
			}
			$k++;
		}
		$returnObject .= '],';
		$returnObject .= '"scoreID":' . $scoreID . ",";
		$returnObject .= '"ship":' . $shipID . ",";
		$returnObject .= '"loginFollowID":' . $loginFollowID;
		$returnObject .= '}';
	}
    else {
        $returnObject = true;
    }
	//suljetaan yhteys
	$query->close();
	$DBcon->close();
	echo $returnObject;
?>