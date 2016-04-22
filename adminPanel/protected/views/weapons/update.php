<?php
/* @var $this WeaponsController */
/* @var $model Weapons */

$this->breadcrumbs=array(
	'Weapons'=>array('index'),
	$model->name=>array('view','id'=>$model->name),
	'Update',
);

$this->menu=array(
	array('label'=>'List Weapons', 'url'=>array('index')),
	array('label'=>'Create Weapons', 'url'=>array('create')),
	array('label'=>'View Weapons', 'url'=>array('view', 'id'=>$model->name)),
);
?>

<h1>Update Weapons <?php echo $model->name; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>