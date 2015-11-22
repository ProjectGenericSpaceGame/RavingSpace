<?php
	//alustetaan tiedot
	$returnObject = "";
	//avataan yhteys
	if($_POST['location'] != "http://localhost:509/RavingSpace/") {
		$servername = "mysql.labranet.jamk.fi";
		$user = "H3492";
		$pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
		$DBcon = new mysqli($servername, $user, $pass, "H3492_3");
		if ($DBcon->connect_error) {
			die("Connection failed: " . $DBcon->connect_error);
		}
	} else {
		$servername = "localhost";
		$user = "root";
		$pass = "";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
		$DBcon = new mysqli($servername, $user, $pass, "H3492_3");
		if ($DBcon->connect_error) {
			die("Connection failed: " . $DBcon->connect_error);
		}
	}
	//query
	$select =
	"Select playerData.playerID,score1,score2,score3,score4,score5,score6,score7,score8,score9,score10 from highScores
    inner join playerData
    on playerData.scoreID = highScores.scoreID";

	$query = $DBcon->query($select);//tulokset ovat $query muuttujassa
	//rakennetaan returnObject muuttuja
	//aallon tiedot
	$returnObject ='{"highScores":[';
    $len = $query->num_rows;
		while($row = $query->fetch_array(MYSQLI_BOTH)){
            $tempString = $row['playerID']."";
            //$tempStruckArr = str_split($tempString,6);
            $iter = 1;
			while($iter < count($row)/2){
                if($row[$iter] != 0) {
                    $returnObject .= '["' . $tempString . '",' . $row[$iter] . '],';
                } else {
                    $returnObject .= '["' . $tempString .'",0],';
                }
                $iter++;
            }
		}
	$returnObject = substr($returnObject,0,-1).']}';
	//suljetaan yhteys
	$query->close();
	$DBcon->close();

	echo $returnObject;
?>