<?php
/* @var $this AssetsController */
/* @var $model Assets */

$this->breadcrumbs=array(
	'Assets'=>array('index'),
	'Create',
);
$this->serverImages = $imageList;
$this->assetList = $imageListNOHTML;
$this->menu=array(
	array('label'=>'List Assets', 'url'=>array('index')),
	array('label'=>'Manage Assets', 'url'=>array('admin')),
);
?>

<h1>Create Assets</h1>
<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/'">Back</button>
<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/imageManager'">Manage server files</button>
<?php $this->renderPartial('_form', array('model'=>$model)); ?>
<script>
	document.addEventListener("DOMContentLoaded", function() {
		var wrapper = document.getElementsByClassName("content-wrapper")[0];
		wrapper.classList.add("extraWide");
	});

</script>
