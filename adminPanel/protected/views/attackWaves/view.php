<?php
/* @var $this AttackWavesController */
/* @var $model AttackWaves */

$this->breadcrumbs=array(
	'Attack Waves'=>array('index'),
	$model->attackID,
);

$this->menu=array(
	array('label'=>'List AttackWaves', 'url'=>array('index')),
	array('label'=>'Create AttackWaves', 'url'=>array('create')),
	array('label'=>'Update AttackWaves', 'url'=>array('update', 'id'=>$model->attackID)),
	array('label'=>'Delete AttackWaves', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->attackID),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage AttackWaves', 'url'=>array('admin')),
);
?>

<h1>View AttackWaves #<?php echo $model->attackID; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'attackID',
		'waveData',
		'attackLoot',
		'attackState',
		'playerID',
	),
)); ?>
