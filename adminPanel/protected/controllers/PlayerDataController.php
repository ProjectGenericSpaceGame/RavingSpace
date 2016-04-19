<?php

class PlayerDataController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'users'=>array('admin'),
			),
			array('deny',  // allow all users to perform 'index' and 'view' actions
				'users'=>array('*'),
			),

			/*array('deny',  // deny all users
				'users'=>array('*'),
			),*/
		);
	}
    // get the ship data when viewing and/or editing a player
	public function getSongs($model){
		/*$val  = array("Song Name"=>$model->test($model->playerID));*/
		$val = array();
        $i = 0;
		foreach($model->test($model->playerID) as $row) {
			$val["song".$i] = $row["songName"];
            $i++;
		};
        /*$sql = "SELECT songName result FROM playerData WHERE playerID = '$playerName'";
        foreach($command->queryAll() as $row){
                $val['song'.$i] = $row->["songName"];
                $i += 1;
            } */
		return $val;
	}
	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}
	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
        $connection=Yii::app()->db;
		$model = new PlayerData();
        $ship = new shipStates();

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
       // $fp = fopen('debug.txt', 'w');
          // fwrite($fp, "asdasdasdasdasdasdas: ".$_POST['PlayerData']['playerID']);
           // fclose($fp);
		if(isset($_POST['PlayerData'], $_POST['shipStates']))
		{
            $playerName = $_POST['PlayerData']['playerID'];
            $sql = "SELECT COUNT(playerID) AS result FROM playerData WHERE playerID = '$playerName'";
            $command = $connection->createCommand($sql);
            $command->setFetchMode(PDO::FETCH_OBJ);
            $command->queryAll();
                $sql = "SELECT MAX(loginFollowID)+1 as nextID from loginAttempts";
                $command = $connection->createCommand($sql);
                $command->setFetchMode(PDO::FETCH_OBJ);
                foreach($command->queryAll() as $row){
                    $newID = $row->nextID;//nyt tiedämmä mikä on uusi korkein ID, tämä on sama kaikille tauluille
                }
                $sql = "INSERT INTO loginAttempts (loginFollowID, failedTries, lockTime, loggedIn, lastSuccesful) values ($newID,0,'0','out','N/A');";
                $command = $connection->createCommand($sql);
                $command->query();
            $_POST['PlayerData']['loginFollowID'] = $newID;
            $_POST['shipStates']['shipID'] = $newID;
            $_POST['shipStates']['playerID'] = $playerName;
			$model->attributes=$_POST['PlayerData'];
            $ship->attributes=$_POST['shipStates'];
            
         
            
            if($model->validate()){
                $model->save(false);
                if($ship->validate()){
                    $ship->save(false);
                }
                   //Add basic gun for ship";
                $sql = "insert into shipGuns(shipID,has) values($newID,'basic')";
                $command = $connection->createCommand($sql);
                $command->query();
                //basic songs
                for($i = 1;$i <= 4;$i++){
                    $sql = "insert into hasSongs(playerID,songID) values('$playerName', '$i')";
                    $command = $connection->createCommand($sql);
                    $command->query();
                }
                 $this->redirect(array('view','id'=>$model->playerID));
            }
               
			//if($model->save())
			//	
		}

		$this->render('create',array(
			'model'=>$model,
            'ship'=>$ship
		));
	}
   
    public function getShipData($name){
        $username=$name;
        $connection=Yii::app()->db;
        $sql="SELECT * FROM shipStates WHERE playerID=:id"; 
        $command = $connection->createCommand($sql);
        $command->setFetchMode(PDO::FETCH_OBJ);
        $command->bindParam(":id",$username, PDO::PARAM_STR);
        // $fp = fopen('lidn.txt', 'w');
        foreach($command->queryAll() as $row){
            $shipID = $row->shipID;
           //  fwrite($fp, $row);
            $return = array(
                'Color' => $row->color,  
                'Speed' => $row->speed,
                'gunReloadBonus' => $row->gunReloadBonus,
                'gunBulletSpeedBonus' => $row->gunBltSpeedBonus,
                'powerReloadBonus' => $row->powerReloadBonus,
                'powerAOEBonus' => $row->powerAOEBonus,
                'powerEffectDurationTimeBonus' => $row->powerEffectTimeBonus,
                'HP' => $row->hp,
                'Model' => $row->model,
                'weaponDamageBonus' => $row->gunDmgBonus,
                'shipID' => $row->shipID
            );
        }
        //if player doesnt have shipData
        if(!(isset($return))){
            $return = array(); 
        }else{
            $sql="SELECT * FROM shipPowers WHERE shipID=:id";
            $command = $connection->createCommand($sql);
            $command->setFetchMode(PDO::FETCH_OBJ);
            $command->bindParam(":id",$shipID, PDO::PARAM_STR);
            $returnPower = array();
            $i = 0;
            foreach($command->queryAll() as $row){
                $returnPower['Power'.$i] = $row->has;
                $i += 1;
            }
            $sql="SELECT * FROM shipGuns WHERE shipID=:id";
            $command = $connection->createCommand($sql);
            $command->setFetchMode(PDO::FETCH_OBJ);
            $command->bindParam(":id",$shipID, PDO::PARAM_STR);
            $returnGun = array();
            $i = 0;
            foreach($command->queryAll() as $row){
                $returnGun['Weapon'.$i] = $row->has;
                $i += 1;
            }
            $return = array_merge($return, $returnPower, $returnGun);
        }
       // fclose($fp);
        return $return;
    }
	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
        
		$model = $this->loadModel($id);
        $post = shipStates::model()->find('playerID=:playerID', array(':playerID'=>$id));
       /* $fp = fopen('lidn.txt', 'w');
        fwrite($fp, $id);
       fclose($fp); */
        $ship = $this->loadShipModel($post->shipID);
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

       if(isset($_POST['PlayerData'], $_POST['shipStates']))
		{
			$model->attributes=$_POST['PlayerData'];
            $ship->attributes=$_POST['shipStates'];
            
            $valid=$model->validate();
            $valid=$ship->validate() && $valid;            

            if($valid){
                $model->save(false);
                $ship->save(false);
                $this->redirect(array('view','id'=>$model->playerID));
            }
			//if($model->save())
			//	
		}

		$this->render('update',array(
			'model'=>$model,
            'ship'=>$ship
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('PlayerData');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new PlayerData('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['PlayerData']))
			$model->attributes=$_GET['PlayerData'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}
    
	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return PlayerData the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model = PlayerData::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}
    public function loadShipModel($id){
        $ship = shipStates::model()->findByPk($id);
		if($ship===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $ship;
    }
	/**
	 * Performs the AJAX validation.
	 * @param PlayerData $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='player-data-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
