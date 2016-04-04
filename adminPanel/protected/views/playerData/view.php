<?php
/* @var $this PlayerDataController */
/* @var $model PlayerData */

$this->breadcrumbs=array(
	'Player Datas'=>array('index'),
	$model->playerID,
);

$this->menu=array(
	array('label'=>'List PlayerData', 'url'=>array('index')),
	array('label'=>'Create PlayerData', 'url'=>array('create')),
	array('label'=>'Update PlayerData', 'url'=>array('update', 'id'=>$model->playerID)),
	array('label'=>'Delete PlayerData', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->playerID),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage PlayerData', 'url'=>array('admin')),
);
?>

<h1>View PlayerData #<?php echo $model->playerID; ?></h1>



<?php 

$this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'playerID',
		'passHash',
		'email',
		'money',
		'points',
		'loginFollowID',
	),
)); 

echo "<h1 class='shipHeader'>ShipData</h1>";

$name = $model->playerID;
$shipdata=$this->getShipData($name);
$this->widget('zii.widgets.CDetailView', array(
    'data'=>$shipdata,
        'attributes'=>array(
            'Color',
            'Speed',
            'gunReloadBonus',
            'gunBltSpeedBonus',
            'powerReloadBonus',
            'powerAOEbonus',
            'powerEffectDurationTimeBonus',
            'HP',
            'Model',
            'weaponDamageBonus',
            'shipID',
        ),
)); 

?>