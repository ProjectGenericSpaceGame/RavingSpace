<?php
    if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
		require_once('../db-init.php');
	} else {
		require_once('../db-initDEV.php');
	}
	//alustetaan tiedot
	$returnObject = "";
	$select =
	"SELECT playerData.playerID,score, date FROM highScores
    inner join playerData
    on playerData.playerID = highScores.playerID;";

	$query = $db->prepare($select);//tulokset ovat $query muuttujassa
    $query->execute();
	//rakennetaan returnObject muuttuja
	//aallon tiedot
	$returnObject ='{"highScores":[';
    $len = $query->rowCount();
		while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $tempString = $row['playerID']."";
            //$tempStruckArr = str_split($tempString,6);
            $iter = 1;
			while($iter < count($row)/2){
                if($iter == $len) {
                    $returnObject .= '["' . $tempString . '",' . $row[$iter] . ']';
                } else {
                    $returnObject .= '["' . $tempString .'",'.$row['score'].'],';
                }
                $iter++;
            }
		}
	$returnObject = substr($returnObject,0,-1).']}';
	echo $returnObject;
?>