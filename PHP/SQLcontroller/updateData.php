<?php
	//alustetaan tiedot
    session_start();
    include('../CryptoHandler/cryptoClass.php');
    $bcrypt = new Bcrypt(15);
	$returnObject = "";
	$usage = $_POST['usage'];
    // $usage memory list:    
    // 2 newWave
    // 3 shoppingEvent
    // 4 finishedGame
    // 5 loggOff
    // 6 updateShipGuns
    $playerName = $_POST['playerName'];

    if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
		require_once('../db-init.php');
	} else {
		require_once('../db-initDEV.php');
	}
    /** @var $db PDO */
    $db = new DBcon();
    $db = $db->returnCon();

	function updateAccountInfo(){
	
	}
	function newWave($playerName,$db){
        /** @var $db PDO */
        $loginFollowID = $_POST['loginFollowID'];
        $waveData = $_POST['wave'];
        $points = $_POST['points'];
        $isIn = getFromDB("SELECT loggedIn FROM loginAttempts WHERE loginFollowID = $loginFollowID","loggedIn",$db);
        if($isIn == "in") {
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
        /** @var $db PDO */
        $echoobject = "";
		$loginFollowID = $_POST['loginFollowID'];
        $weapons = $_POST['weapons'];
        $abilities = $_POST['abilities'];
        $playerMoney = $_POST['money'];
        $isIn = getFromDB("SELECT loggedIn FROM loginAttempts WHERE loginFollowID = $loginFollowID","loggedIn",$db);
        if($isIn == "in") {
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
        /** @var $db PDO */
        date_default_timezone_set('Europe/Helsinki');
        $date = date('m-d-Y h:i:s a');
        $score = $_POST['score'];
		$attackID = $_POST['attackID'];
		$attackLoot = $_POST['attackLoot'];
		$points = (integer)$_POST['points'];
        //haetaan aallon omistajan rahat päivitystä varten
        $select = "SELECT playerID FROM attackWaves WHERE attackID = '$attackID'";
        $query = $db->prepare($select);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        $attackOwner = $row['playerID'];
        
        $attackOwnerMoney = getFromDB("SELECT money FROM playerData WHERE playerID = '$attackOwner'","money",$db);
        $attackOwnerMoney += $attackLoot;
        $wasTester = false;
        for($i = 0;$i<15;$i++){//kannassa on 15 testikäyttäjää, katsotaan ettei ollut heidän aaltonsa
			echo "testi".($i+1)."ja tulos: ".$attackOwner == "testi".($i+1);
            if($attackOwner == "testi".($i+1) || $attackOwner == "test".($i+1)){
                $wasTester = true;
            }
        }
        if(!$wasTester) {
            $select = "UPDATE attackWaves SET attackState = 'Destroyed', attackLoot = $attackLoot WHERE playerID = '$attackOwner'";
            $query = $db->prepare($select);
            $query->execute();
            
        }
		//päivitetään käytetyn aallon omistajan tiedot
        $select = "UPDATE playerData SET money = $attackOwnerMoney WHERE playerID = '$playerName'";
        echo $select;
		$query = $db->prepare($select);
        $query->execute();
		//tässä taas pelaajan tiedot
		$select = "UPDATE playerData SET points = $points where playerID = '$playerName'";//päivitetään pelaajan pisteet
        echo $select;
		$query = $db->prepare($select);
        $query->execute();
		/*if($scoreToUpdate != -1){*/
        $select = "INSERT INTO highScores (score, date, playerID) VALUES ($score, '$date', '$playerName');";
        $query = $db->prepare($select);
        $query->execute();
    }
	function logOff($returnObject,$db){
        /** @var $db PDO */
		$loginFollowID = intval($_POST['loginFollowID']);
		$select = "UPDATE loginAttempts SET loggedIn = 'out' WHERE loginFollowID = $loginFollowID";
		$query = $db->prepare($select);
        $query->execute();
	}
    function updateShipGuns($playerName, $db, $shipStates,$money){
        /** @var $db PDO */
        $loginFollowID = $_POST['loginFollowID'];
        $isIn = getFromDB("SELECT loggedIn FROM loginAttempts WHERE loginFollowID = $loginFollowID","loggedIn",$db);
        if($isIn == "in") {
            $correlationTable = array("gunDmgBoost"=>"gunDmgBonus","gunSpeedBoost"=>"gunBltSpeedBonus","gunReloadBoost"=>"gunReloadBonus");
            $shipStates = json_decode($shipStates);
            //selvitetään ensiksi shipID
            $shipID = getFromDB("SELECT shipID FROM shipStates WHERE playerID = '$playerName'","shipID",$db);
            //Ja nyt päivitetään
            $toUpdate = "";

            foreach($shipStates as $state => $value){
                // prepare must inside loop because column name changes...
                $query = $db->prepare("UPDATE shipStates SET $correlationTable[$state]=? WHERE shipID=?");
                $query->execute(array($value, $shipID));
            }
            $select = "UPDATE playerData set money = $money WHERE playerData.playerID = '$playerName'";
            $query = $db->prepare($select);
            $query->execute();
        }
    }
    function updateShipPowers($playerName, $db, $shipStates, $money){
        $loginFollowID = $_POST['loginFollowID'];
        $loggedIn = getFromDB("SELECT loggedIn FROM loginAttempts WHERE loginFollowID = $loginFollowID","loggedIn",$db);
        if($loggedIn == "in") {
            //tietokannan kenttien ja pelin muuttujat ovat eri nimellä, joka korjataan alla olevalla.  
            $correlationTable = array("powerReloadBonus"=>"powerReloadBonus","powerAOEBonus"=>"powerAOEBonus","powerEffectTime"=>"powerEffectTimeBonus");
            $shipStates = json_decode($shipStates);
            //selvitetään ensiksi shipID
            $shipID = getFromDB("SELECT shipID FROM shipStates WHERE playerID = '$playerName'","shipID",$db);
            //Ja nyt päivitetään
            $toUpdate = "";

            foreach($shipStates as $state => $value){
                // prepare must inside loop because column name changes...
                $query = $db->prepare("UPDATE shipStates SET $correlationTable[$state]=? WHERE shipID=?");
                $query->execute(array($value, $shipID));
            }
            $select = "UPDATE playerData set money = $money WHERE playerData.playerID = '$playerName'";
            $query = $db->prepare($select);
            $query->execute();
        }
        
        /*$shipPowersStats = '"powers": {';
            powerReloadBonus":'.$row["powerReloadBonus"].',';
            powerAOEBonus":'.$row["powerAOEbonus"].',';
            powerEffectTime":'.$row["powerEffectTimeBonus"].'}';
            */
        
        
    }
    //tällä voimme varmistua käytön mukaan mitkä parametrin on asetettu, samalla voimme toteuttaa injektiotarkistukset näissä
    if($playerName == $_SESSION["playerName"]){
        $loginFollowID = $_POST['loginFollowID'];
        $isIn = getFromDB("SELECT loggedIn FROM loginAttempts WHERE loginFollowID = $loginFollowID","loggedIn",$db);
        $IP = getFromDB("SELECT lastKnownIP FROM loginAttempts WHERE loginFollowID = $loginFollowID","lastKnownIP",$db);
        if($isIn == "in" && $bcrypt->verify($_SERVER["REMOTE_ADDR"],$IP)){
            //funcktiot eri käyttötarkoituksen mukaan
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
            } else if($usage == 6){
                $shipStates = $_POST["shipStats"];
                $money = $_POST["money"];
                updateShipGuns($playerName,$db,$shipStates, $money);
            } else if($usage == 7){
                $shipStates = $_POST["shipStats"];
                $money = $_POST["money"];
                updateShipPowers($playerName,$db,$shipStates, $money);
            }
        }
        else {
            $db = null;
            echo "IPchange";
            die();
        }

    }
    //tällä säästetään saman prepare->query->fetch rimpsun kirjoittelu
    function getFromDB($query,$toGet,$db){
        /** @var $db PDO */
        $prepared = $db->prepare($query);
        $prepared->execute();
        $row = $prepared->fetch(PDO::FETCH_ASSOC);
        return $row[$toGet];
    }

	//suljetaan yhteys
    $db = null;
?>