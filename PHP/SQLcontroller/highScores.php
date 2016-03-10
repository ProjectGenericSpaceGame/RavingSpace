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
	$returnObject = "";
	$select =
	"SELECT playerID,score, highScores.date FROM highScores";

	$query = $db->prepare($select);//tulokset ovat $query muuttujassa
    $query->execute();
	//rakennetaan returnObject muuttuja
	//Pisteet
	$returnObject ='{"highScores":[';
    $len = $query->rowCount();
		while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $tempString = $row['playerID']."";
            if($row['date'] == ""){
                $date = '"N/A"';
            } else {
                $date =  $row['playerID'];
            }
            //$tempStruckArr = str_split($tempString,6);
            $returnObject .= '["' . $tempString . '",' . $row['score'] . ",".$date.'],';
            /*$iter = 1;
			while($iter < count($row)/2){
                if($iter == $len) {
                    $returnObject .= '["' . $tempString . '",' . $row[$iter] . ']';
                } else {
<<<<<<< HEAD
                    $returnObject .= '["' . $tempString . '",' . $row['score'].'],';
=======
                    $returnObject .= '["' . $tempString .'",'.$row['score'].'],';
>>>>>>> origin/master
                }
                $iter++;
            }*/
		}
	$returnObject = substr($returnObject,0,-1).']}';
    $db = null;
	echo $returnObject;
?>