<?php
	//alustetaan tiedot
	$servername = "mysql.labranet.jamk.fi";
	$user = "H3492";
	$pass = "cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT";//vaihdetaan myöhemmin hakemaan toisesta tiedostosta
	$returnObject = "";
	//$playerName = $_POST['playerName'];
	$playerName = "testi1";
	//avataan yhteys
	$DBcon = new mysqli($servername,$user,$pass, "H3492_3");
	if ($DBcon->connect_error) {
		die("Connection failed: " . $DBcon->connect_error);
	}
	//query
	$select =
	"Select waveData, attackLoot, attackState from attackWaves 
	inner join playersAttacks
	on playersAttacks.attackID = attackWaves.attackID
	WHERE playersAttacks.playerID = '$playerName'";

	$query = $DBcon->query($select);//tulokset ovat $query muuttujassa

	//rakennetaan returnObject muuttuja
	//aallon tiedot
	$returnObject ='{"playerWaves":[';
    $len = $query->num_rows;
    $iter = 1;
		while($row = $query->fetch_assoc()){
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

	//suljetaan yhteys
	$query->close();
	$DBcon->close();
	echo $returnObject;
?>