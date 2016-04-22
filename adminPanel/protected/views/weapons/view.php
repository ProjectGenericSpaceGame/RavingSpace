<?php
/* @var $this WeaponsController */
/* @var $model Weapons */

$this->breadcrumbs=array(
	'Weapons'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Weapons', 'url'=>array('index')),
	array('label'=>'Create Weapons', 'url'=>array('create')),
	array('label'=>'Update Weapons', 'url'=>array('update', 'id'=>$model->name)),
	array('label'=>'Delete Weapons', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->name),'confirm'=>'Are you sure you want to delete this item?')),
);
?>

<h1>View Weapons #<?php echo $model->name; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'name',
		'basedmg',
		'bulletSpeed',
		'reload',
		'fireRate',
		'clip',
	),
)); ?>
