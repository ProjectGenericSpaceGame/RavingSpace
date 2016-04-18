<?php
/* @var $this PlayerDataController */
/* @var $model PlayerData */

$this->breadcrumbs=array(
	'Player Datas'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List PlayerData', 'url'=>array('index')),
	//array('label'=>'Manage PlayerData', 'url'=>array('admin')),
);
?>

<h1>Create PlayerData</h1>

<?php $this->renderPartial('_form', array('model'=>$model, 'ship'=>$ship)); ?>