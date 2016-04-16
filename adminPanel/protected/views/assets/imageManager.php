<?php
/* @var $this AssetsController */
/* @var $dataProvider CActiveDataProvider */
/*Yii::app()->clientScript->registerCoreScript('jquery');*/
$this->breadcrumbs=array(
    'Assets',
);
$this->assetList = $imageList;
/*$this->menu=array(
	array('label'=>'Create Assets', 'url'=>array('create')),
	array('label'=>'Manage Assets', 'url'=>array('admin')),
);*/

?>
<ul class="scanResultWrapper">
    <?php /*print_r($jutska); */?>
</ul>

<h1>Assets</h1>
<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/'">Manage assets</button>
<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/create'">Add new asset</button>
<br>
<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/imageUploader'">Upload image to server</button>
<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider'=>$dataProvider,
    'itemView'=>'_images'
));
?>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        var wrapper = document.getElementsByClassName("content-wrapper")[0];
        wrapper.classList.add("extraWide");
    });
</script>
