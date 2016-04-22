<?php
/* @var $this PowersController */
/* @var $model Powers */

$this->breadcrumbs=array(
	'Powers'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Powers', 'url'=>array('index')),
	array('label'=>'Manage Powers', 'url'=>array('admin')),
);
?>

<h1>Create Powers</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>