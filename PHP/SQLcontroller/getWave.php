<?php
	//alustetaan tiedot
	$returnObject = "";
	$playerName = (string)$_POST['playername'];
    $loginFollowID = (integer)$_POST['loginFollow'];
	$isIn = false;
	//avataan yhteys
if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php") {
		$servername = "mysql.labranet.jamk.fi";
		$user = "H3492";
		$pass = "cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
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
	$select = "select fail2 from loginAttempts where loginFollowID = $loginFollowID";
	$query = $DBcon->query($select);//tulokset ovat $query muuttujassa
    $row = $query->fetch_array(MYSQLI_BOTH);
    if($row['fail2'] == "in"){
        $select =
            "SELECT attackID, waveData from attackWaves where attackState = 'Unused'";
        //haluamme vain yhden aallon vaikka query palauttaa kaikki, tutkimme siis rivien määrää ja valitsemme sattuman varaisesti yhden (tulossetti on array)
        $query = $DBcon->query($select);//tulokset ovat $query muuttujassa
        $len = $query->num_rows;
        $rand = rand(1,$len);
        //rakennetaan returnObject muuttuja
        //aallon tiedot
        for($i = 0;$i<$rand;$i++){
            $row = $query->fetch_array(MYSQLI_BOTH);
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
	//suljetaan yhteys
	$query->close();
	$DBcon->close();

	echo $returnObject;
?>