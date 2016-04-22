<?php
/* @var $this WeaponsController */
/* @var $model Weapons */

$this->breadcrumbs=array(
	'Weapons'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Weapons', 'url'=>array('index')),
	array('label'=>'Manage Weapons', 'url'=>array('admin')),
);
?>

<h1>Create Weapons</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>