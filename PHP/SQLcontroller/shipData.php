<?php
/**
 * Created by PhpStorm.
 * User: RAndom MC
 * Date: 25/03/2016
 * Time: 19:01
 */
session_start();
if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
    require_once('../db-init.php');
} else {
    require_once('../db-initDEV.php');
}
$playerName = $_SESSION['playerName'];
//$playerName = 'testi1';
/** @var PDO $db */
$db = new DBcon();
$db = $db->returnCon();
$query = "SELECT * FROM shipstates WHERE playerID=:name";
$prepared = $db->prepare($query);
$prepared->execute(array(":name"=>$playerName));
$row = $prepared->fetch(PDO::FETCH_ASSOC);
foreach($row as $key=>$value){
    if($value == null){
        $row[$key] = -999;
    }
}
//shipData
$shipHull = '"hull": {';
$shipHull .= '"color":"'.$row["color"].'",';
$shipHull .= '"speed":'.$row["speed"].',';
$shipHull .= '"HP":'.$row["hp"].',';
$shipHull .= '"model":"'.$row["model"].'"}';

$shipGunsStats = '"guns": {';
$shipGunsStats .= '"gunDmgBoost":'.$row["gunDmgBonus"].',';
$shipGunsStats .= '"gunSpeedBoost":'.$row["gunBltSpeedBonus"].',';
$shipGunsStats .= '"gunReloadBoost":'.$row["gunReloadBonus"].'}';

$shipPowersStats = '"powers": {';
$shipPowersStats .= '"powerReloadBonus":'.$row["powerReloadBonus"].',';
$shipPowersStats .= '"powerAOEBonus":'.$row["powerAOEBonus"].',';
$shipPowersStats .= '"powerEffectTime":'.$row["powerEffectTimeBonus"].'}';


//shipGunData
$query = "SELECT * FROM weapons";
$result = $db->query($query);
$gunData = '"attachments":{';
while($row = $result->fetch(PDO::FETCH_ASSOC)){
    $gunData .= '"'.$row["name"].'":{';
    foreach($row as $key => $value){
        if($key != "name"){
            $gunData .= '"'.$key.'":'.$value.',';
        }
    }
    $gunData = substr_replace($gunData,"",-1,1);
    $gunData .= "},";
}
$gunData = substr_replace($gunData,"",-1,1)."}";

$db = null;
echo "{".$shipHull.",".$shipGunsStats.",".$shipPowersStats."}§{".$gunData."}";