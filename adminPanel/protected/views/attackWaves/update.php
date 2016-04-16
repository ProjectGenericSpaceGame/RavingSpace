<?php
/* @var $this AttackWavesController */
/* @var $model AttackWaves */

$this->breadcrumbs=array(
	'Attack Waves'=>array('index'),
	$model->attackID=>array('view','id'=>$model->attackID),
	'Update',
);

$this->menu=array(
	array('label'=>'List AttackWaves', 'url'=>array('index')),
	array('label'=>'Create AttackWaves', 'url'=>array('create')),
	array('label'=>'View AttackWaves', 'url'=>array('view', 'id'=>$model->attackID)),
	//array('label'=>'Manage AttackWaves', 'url'=>array('admin')),
);
?>

<h1>Update AttackWaves <?php echo $model->attackID; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>