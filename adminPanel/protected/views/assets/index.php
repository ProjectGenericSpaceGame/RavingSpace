<?php
/* @var $this AssetsController */
/* @var $dataProvider CActiveDataProvider */
/*Yii::app()->clientScript->registerCoreScript('jquery');*/
$this->breadcrumbs=array(
	'Assets',
);
$this->assetList = $assetList;
$this->serverImages = $jutska;
/*$this->menu=array(
	array('label'=>'Create Assets', 'url'=>array('create')),
	array('label'=>'Manage Assets', 'url'=>array('admin')),
);*/

?>
<ul class="scanResultWrapper">
	<?php /*print_r($jutska); */?>
</ul>

<h1>Assets</h1>
<button onclick="window.location.href='<?php echo Yii::app()->request->url;?>'">Reset All</button>
<button onclick="window.location.href='<?php echo Yii::app()->request->baseUrl;?>/index.php?r=assets/create'">Add new asset</button>
<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view'
));
?>
<script>
	document.addEventListener("DOMContentLoaded", function() {
		var wrapper = document.getElementsByClassName("content-wrapper")[0];
		wrapper.classList.add("extraWide");
	});
	/*$(".assets_savebutton").unbind().on("click",function(e) {
		e.preventDefault();
		console.log($(this));
		var data = [$(this).parent().parent().serialize()];
		console.log(data);
		var ajaxCall = $.ajax({
			url:"http://localhost:509/RavingSpace/adminPanel/index.php?r=assets/ajaxUpdateSingle",
			method:"post",
			data:{assets:data}
		});
		ajaxCall.done(function(returnData){
			console.log(returnData);
		});
		ajaxCall.fail(function(returnData,val,val2){
			console.log("fail"+returnData+" ja "+val+" ja "+val2);
		});
	});*/

</script>
