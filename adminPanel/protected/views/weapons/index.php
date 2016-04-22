<?php
/* @var $this WeaponsController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Weapons',
);

$this->menu=array(
	array('label'=>'Create Weapons', 'url'=>array('create')),
	array('label'=>'Manage Weapons', 'url'=>array('admin')),
);
?>

<h1>Weapons</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
