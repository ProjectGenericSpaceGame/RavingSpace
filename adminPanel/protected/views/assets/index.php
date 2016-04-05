<?php
/* @var $this AssetsController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Assets',
);
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

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
));
?>
<script>
	document.addEventListener("DOMContentLoaded", function() {
		var wrapper = document.getElementsByClassName("content-wrapper")[0];
		wrapper.classList.add("extraWide");
	});

</script>
