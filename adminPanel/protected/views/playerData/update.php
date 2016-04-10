<?php
/* @var $this PlayerDataController */
/* @var $model PlayerData */

$this->breadcrumbs=array(
	'Player Datas'=>array('index'),
	$model->playerID=>array('view','id'=>$model->playerID),
	'Update',
);

$this->menu=array(
	array('label'=>'List PlayerData', 'url'=>array('index')),
	array('label'=>'Create PlayerData', 'url'=>array('create')),
	array('label'=>'View PlayerData', 'url'=>array('view', 'id'=>$model->playerID)),
	//array('label'=>'Manage PlayerData', 'url'=>array('admin')),
);
?>

<h1>Update PlayerData <?php echo $model->playerID; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model, 'ship'=>$ship)); ?>