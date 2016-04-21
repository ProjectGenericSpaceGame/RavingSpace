<?php
$userName;
$return;



if($_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/index.php" || $_POST['location'] == "http://student.labranet.jamk.fi/~H3492/RavingSpace/" ){
    require_once('../db-init.php');
} else {
    require_once('../db-initDEV.php');
}
$playerName = $_POST['playerName'];
/** @var PDO $db */
    $db = new DBcon();
    $db = $db->returnCon();
    $select = "select passHash from playerData where playerID = '$playerName'";
  /*  try{*/
        $query = $db->prepare($select);//tulokset ovat $query muuttujassa
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        $return = substr($row['passHash'],-10);

   /* } catch(PDOException $exception){
        $return = "#!#!#!#!";
    }*/
    $db = null;
    echo $return;
?>