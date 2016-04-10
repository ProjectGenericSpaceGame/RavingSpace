<?php
/* @var $this PlayerDataController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Player Datas',
);

$this->menu=array(
	array('label'=>'Create PlayerData', 'url'=>array('create')),
	//array('label'=>'Manage PlayerData', 'url'=>array('admin')),
);
?>

<h1>Player Datas</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
