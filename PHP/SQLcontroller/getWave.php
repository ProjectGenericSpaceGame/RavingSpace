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
	$playerName = $_POST['playername'];
    //$playerName = "testi1";
    $loginFollowID = (integer)$_POST['loginFollow'];
    //$loginFollowID = 1;
	$isIn = false;
	//query
	$select = "select loggedIn from loginAttempts where loginFollowID = $loginFollowID";
	$query = $db->prepare($select);//tulokset ovat $query muuttujassa
    $query->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);
    if($row['loggedIn'] == "in"){
        $select =
            "SELECT attackID, waveData from attackWaves where attackState = 'Unused'";
        //haluamme vain yhden aallon vaikka query palauttaa kaikki, tutkimme siis rivien määrää ja valitsemme sattuman varaisesti yhden (tulossetti on array)
        $stmt = $db->prepare($select);//tulokset ovat $query muuttujassa
        $stmt->execute();
        $len = $stmt->rowCount();
        $rand = rand(1,$len);
        //rakennetaan returnObject muuttuja
        //aallon tiedot
        for($i = 0;$i<$rand;$i++){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        $struck = (string)$row['waveData'];
        if(strlen($struck) < 18){
            $struck = "0".$struck;
        }
        $struck = substr_replace($struck,"'",6,0);
        $struck = substr_replace($struck,"'",13,0);
        $id = $row['attackID'];
        $returnObject = '{ "attackInfo":"'.$struck.'","attackID":'.$id.'}';
    }
	// tulostetaan haetut tiedot
    $db = null;
	echo $returnObject;
?>