<?php
/* @var $this PowersController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Powers',
);

$this->menu=array(
	array('label'=>'Create Powers', 'url'=>array('create')),
	array('label'=>'Manage Powers', 'url'=>array('admin')),
);
?>

<h1>Powers</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
