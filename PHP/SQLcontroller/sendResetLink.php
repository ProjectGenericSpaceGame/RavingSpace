<?php
/**
 * Created by PhpStorm.
 * User: RAndom MC
 * Date: 21/04/2016
 * Time: 21:42
 */
if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/game.php"){
    require_once('../db-init.php');
} else {
    require_once('../db-initDEV.php');
}
/** @var PDO $DBcon */
$DBcon = new DBcon();
$DBcon = $DBcon->returnCon();
$email = $_POST["email"];

$prepped = $DBcon->prepare("SElECT COUNT(*) as amount , playerID FROM playerData WHERE email=?");
$prepped->execute(array($email));
$row = $prepped->fetch(PDO::FETCH_ASSOC);
if($row["amount"] > 0){
    $id = "";
    for($i = 0;$i < 50;$i++){
        $id .= mt_rand(10,99);
    }
    $select = "UPDATE loginAttempts SET resetIdentifier=?, resetRequestDate=? WHERE loginFollowID=(SELECT loginFollowID FROM playerData WHERE playerID=?)";
    $prepped = $DBcon->prepare($select);
    $prepped->execute(array($id,time(),$row["playerID"]));
    $msg = "You requested reset link for your Raving Space account. Follow the link below to reset your password:
    ";
    $msg .= "http://localhost:509/RavingSpace/resetPassword.php?id=".$id."&name=".$row["playerID"];
    /*mail($email,"Password resetting link from Raving Space",$msg);*/
    $name = "resetRequest_".$id."_".$row["playerID"].".txt";
    $out = fopen($name, "w");
    fwrite($out, "Tämä on kuvitteellinen lähtenyt sähköposti:
    ".$msg);
    fclose($out);
    $return = array("success","PHP/SQLcontroller/".$name);
    echo json_encode($return);

}