<?php
/* @var $this AssetsController */
/* @var $model Assets */

$this->breadcrumbs=array(
	'Assets'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Assets', 'url'=>array('index')),
	array('label'=>'Manage Assets', 'url'=>array('admin')),
);
?>

<h1>Create Assets</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>