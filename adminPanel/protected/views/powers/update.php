<?php
/* @var $this PowersController */
/* @var $model Powers */

$this->breadcrumbs=array(
	'Powers'=>array('index'),
	$model->name=>array('view','id'=>$model->name),
	'Update',
);

$this->menu=array(
	array('label'=>'List Powers', 'url'=>array('index')),
	array('label'=>'Create Powers', 'url'=>array('create')),
	array('label'=>'View Powers', 'url'=>array('view', 'id'=>$model->name)),
);
?>

<h1>Update Powers <?php echo $model->name; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>