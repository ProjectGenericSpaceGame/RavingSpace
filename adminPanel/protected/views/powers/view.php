<?php
/* @var $this PowersController */
/* @var $model Powers */

$this->breadcrumbs=array(
	'Powers'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Powers', 'url'=>array('index')),
	array('label'=>'Create Powers', 'url'=>array('create')),
	array('label'=>'Update Powers', 'url'=>array('update', 'id'=>$model->name)),
	array('label'=>'Delete Powers', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->name),'confirm'=>'Are you sure you want to delete this item?'))
);
?>

<h1>View Powers #<?php echo $model->name; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'name',
		'reload',
		'returnTo',
		'abilitySpecificStat1',
		'abilitySpecificStat2',
		'abilitySpecificName1',
		'abilitySpecificName2',
	),
)); ?>
