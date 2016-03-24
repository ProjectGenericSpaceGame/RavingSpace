<?php
/* @var $this AttackWavesController */
/* @var $model AttackWaves */

$this->breadcrumbs=array(
	'Attack Waves'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List AttackWaves', 'url'=>array('index')),
	array('label'=>'Manage AttackWaves', 'url'=>array('admin')),
);
?>

<h1>Create AttackWaves</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>