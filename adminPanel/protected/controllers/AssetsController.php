<?php

class AssetsController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/assetLayout';
	public $serverImages=array();
	public $assetList=array();

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
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view','ajaxUpdateSingle'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete','ajaxUpdateSingle','imageManager','ajaxUpdateImage','imageUploader'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
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
		$model=new Assets;
		$noHTML = array();
		$serverRoot = $_SERVER["DOCUMENT_ROOT"];
		if(substr($serverRoot,-1) == "/"){
			$dir = "/home/H3492/public_html/RavingSpace/assets";
		} else{
			$dir = "R:/RavingSpace/public_html/RavingSpace/assets";
		}
		$jutska = $this->dirToArray($dir,null,$noHTML);
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Assets']))
		{
			$model->attributes=$_POST['Assets'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->name));
		}

		$this->render('create',array(
			'model'=>$model,
			'imageListNOHTML'=>$noHTML,
			'imageList'=>$jutska
		));
	}
	/*
	 Renders server image manager
	If image was set to be removed, removes image
	*/
	public function actionImageManager(){
		
		if(isset($_POST["nukeImg"])){
			unlink("../".$_POST["imageName"]);
		}

		$noHTML = array();
		$serverRoot = $_SERVER["DOCUMENT_ROOT"];
		if(substr($serverRoot,-1) == "/"){
			$dir = "/home/H3492/public_html/RavingSpace/assets";
		} else{
			$dir = "R:/RavingSpace/public_html/RavingSpace/assets";
		}
		$jutska = $this->dirToArray($dir,null,$noHTML);
		$dataProvider=new CArrayDataProvider($noHTML,array(
			'id'=>'serverImages',
			'keyField'=>false,
			'pagination'=>false
		));
		$this->render('imageManager',array(
			'imageList'=>$noHTML,
			'dataProvider'=>$dataProvider
		));
	}
	/*
	 * Renders uploading subview
	 * Uploads image to server if such image is given
	 */
	public function actionImageUploader(){
		$error = "";
		$success = "";
		if(isset($_FILES["fileToUpload"]) && isset($_POST["directory"])){
			if(count($_FILES) == 1){
				$fileNameParts = pathinfo($_FILES['fileToUpload']['name']);
				if($fileNameParts["extension"] == "jpg" || $fileNameParts["extension"] == "png"){
					$serverRoot = $_SERVER["DOCUMENT_ROOT"];
					if(substr($serverRoot,-1) == "/"){
						$dir = "/home/H3492/public_html/RavingSpace/assets/";
					} else{
						$dir = "R:/RavingSpace/public_html/RavingSpace/assets/";
					}
					$imagename = $dir.$_POST["directory"]."/".$fileNameParts["filename"].".".$fileNameParts["extension"];
					if(!file_exists($imagename)){
						if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $imagename)) {
							$success = "success";
						} else {
							$error = "Something went wrong while uploading";
						}
					} else {
						$error = "File with this name already exists!";
					}

				} else {
					$error = "Wrong format in picture";
				}
			} else {
				$error = "Too many files, only one allowed";
			}

		} else {
			$error = "";
		}
		$serverRoot = $_SERVER["DOCUMENT_ROOT"];
		if(substr($serverRoot,-1) == "/"){
			$dir = "/home/H3492/public_html/RavingSpace/assets";
		} else{
			$dir = "R:/RavingSpace/public_html/RavingSpace/assets";
		}
		$dirs = $this->mapDirs($dir);
		$htmlized = "<ul>";/*form is build in view*/
		/*array_shift($dirs);*/
		function HTMLize($dir,$htmlized){
			if(count($dir)> 0){
				$htmlized .= "<ul>";
			}
			foreach($dir as $key => $value){
				$htmlized .= "<input type='radio' name='directory' value='$key'>$key<br>";
				$htmlized = HTMLize($value,$htmlized);
			}
			if(count($dir)> 0){
				$htmlized .= "</ul>";
			}
			return $htmlized;
		}
		foreach($dirs as $key => $value){
			$htmlized .= "<input type='radio' name='directory' value='$key'>$key<br>";
			$htmlized = HTMLize($value,$htmlized);
		}
		$htmlized .= "</ul>";
		/*for($i = 0;$i<substr_count($htmlized,"<ul>");$i++){
			$htmlized .= "</ul>";
		}*/
		/*foreach($dirs as $key=>$val){
			$htmlized .= $key."-JA-";
		}*/

		$this->render('imageUploader',array(
			'dirList'=>$htmlized,
			'error'=>$error,
			'success'=>$success,
		));
	}
	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Assets']))
		{
			print_r($_POST['Assets']);
			$model->attributes=$_POST['Assets'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->name));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}
	/*Renames a picture*/
	public function actionajaxUpdateImage(){
		if(isset($_POST["imageName"]) && isset($_POST["fileName"])){
			$path = explode("/",$_POST["imageName"]);
			$oldName = array_pop($path);
			$fixedFileName = implode("/",$path).'/'.$_POST["fileName"];
			if(!(file_exists("../".$fixedFileName))){
				if(rename("../".implode('/',$path).'/'.$oldName,"../".$fixedFileName)){/*TODO päivitä kentät formissa*/
					echo "true";
				} else {echo "../".implode("/",$path).'/'.$oldName."../".$fixedFileName;}
			} else {
				echo "exists";
			}
		} else {
			echo "something is not right";
		}
	}
	/*Saves asset block data*/
	public function actionajaxUpdateSingle(){

		$model=$this->loadModel($_POST["Name"]);
		if(isset($_POST['Assets']))
		{
			/*print_r($_POST['Assets']);*/
			$model->attributes=$_POST['Assets'];
			if($model->save())
				$result = "success";
		} else {
			$result = "fail";
		}
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
	 * Lists all models. Also list all pics in assets folder
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Assets');
		$noHTML = array();
		//get all images in assets folder and build HTML element
		$serverRoot = $_SERVER["DOCUMENT_ROOT"];
		if(substr($serverRoot,-1) == "/"){
			$dir = "/home/H3492/public_html/RavingSpace/assets";
		} else{
			$dir = "R:/RavingSpace/public_html/RavingSpace/assets";
		}
		/*$dir = "../../".dirname(__FILE__);*/
		$jutska = $this->dirToArray($dir,null,$noHTML);

		$this->render('index',array(
			'dataProvider'=>$dataProvider,
			'jutska'=>$jutska,
			'assetList'=>$noHTML
		));
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Assets('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Assets']))
			$model->attributes=$_GET['Assets'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Assets the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Assets::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}
	public function dirToArray($dir,$subdir,&$noHTML) {

		$result = array();

		$re = "/.png$|.gif$|.GIF$|.jpg$|.jpeg$|.JPG$|.JPEG$|.SVG$|.svg$|.BMP$|.bmp$|.tiff$|.TIFF$/";

		$cdir = scandir($dir);
		foreach ($cdir as $key => $value)
		{
			if (!in_array($value,array(".","..")))
			{
				if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
				{
					$result[$value] = $this->dirToArray($dir . DIRECTORY_SEPARATOR . $value,$value,$noHTML);
				}
				else if(preg_match($re,$value))
				{
					$elem = "<li class='folderScanResult'><img src='../";
					if($subdir != null){
						$imgname = "assets/$subdir/".$value;
						array_push($noHTML,"assets/$subdir/".$value);
					} else {
						$imgname = "assets/".$value;
						array_push($noHTML,"assets/".$value);
					}
					$elem .= $imgname."' alt='".$imgname."' /><p>$imgname</p></li>";
					$result[] = $elem;
				}
			}
		}/*array_push($result,$noHTML);*/

		return $result;
	}
	/*Similar to one above but maps only directories*/
	public function mapDirs($dir){
		$result = array();
		$cdir = scandir($dir);
		foreach ($cdir as $key => $value)
		{
			if (!in_array($value,array(".","..")))
			{
				if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
				{
					$result[$value] = array();
					$result[$value] = $this->mapDirs($dir . DIRECTORY_SEPARATOR . $value);
				}
				else
				{
					/*Do nothing as we don't wan't files*/
				}
			}
		}/*array_push($result,$noHTML);*/

		return $result;
	}
	/**
	 * Performs the AJAX validation.
	 * @param Assets $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='assets-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
