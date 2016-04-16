<?php
/* @var $this AttackWavesController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Attack Waves',
);

$this->menu=array(
	array('label'=>'Create AttackWaves', 'url'=>array('create')),
	//array('label'=>'Manage AttackWaves', 'url'=>array('admin')),
);
?>

<h1>Attack Waves</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
