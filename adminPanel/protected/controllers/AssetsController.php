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
				'actions'=>array('admin','delete','ajaxUpdateSingle'),
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
		function dirToArray($dir,$subdir,&$noHTML) {

			$result = array();

			$re = "/.png$|.gif$|.GIF$|.jpg$|.jpeg$|.JPG$|.JPEG$|.SVG$|.svg$|.BMP$|.bmp$|.tiff$|.TIFF$/";

			$cdir = scandir($dir);
			foreach ($cdir as $key => $value)
			{
				if (!in_array($value,array(".","..")))
				{
					if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
					{
						$result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value,$value,$noHTML);
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
		$jutska = dirToArray($_SERVER["DOCUMENT_ROOT"]."/RavingSpace/assets",null,$noHTML);

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
