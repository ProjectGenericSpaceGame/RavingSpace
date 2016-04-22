<?php
/* @var $this PlayerDataController */
/* @var $model PlayerData */
Yii::app()->getClientScript()->registerCoreScript('yii');
Yii::app()->getClientScript()->registerCoreScript('yiitab');
$this->breadcrumbs=array(
	'Player Datas'=>array('index'),
	$model->playerID,
);

$this->menu=array(
	array('label'=>'List PlayerData', 'url'=>array('index')),
	array('label'=>'Create PlayerData', 'url'=>array('create')),
	array('label'=>'Update PlayerData', 'url'=>array('update', 'id'=>$model->playerID)),
	array('label'=>'Delete PlayerData', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->playerID),'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>'Manage PlayerData', 'url'=>array('admin')),
);
?>

<h2>View PlayerData #<?php echo $model->playerID; ?></h2>



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

echo "<h2 class='shipHeader'>ShipData</h2>";

$name = $model->playerID;
$shipdata = $this->getShipData($name);
$this->widget('zii.widgets.CDetailView', array(
    'data'=>$shipdata,
        'attributes'=>array(
            'Color',
            'Speed',
            'gunReloadBonus',
            'gunBltSpeedBonus',
            'powerReloadBonus',
            'powerAOEBonus',
            'powerEffectTimeBonus',
            'HP',
            'Model',
            'weaponDamageBonus',
            'shipID',
        ),
));
echo "<h2 class='shipHeader'>ShipPowers</h2>";
$this->widget('zii.widgets.CDetailView', array(
    'data'=>$shipdata,
        'attributes'=>array(
           'Power0',
           'Power1',
           'Power2',
           'Power3',
        ),
));
echo "<h2 class='shipHeader'>ShipWeapons</h2>";
$this->widget('zii.widgets.CDetailView', array(
    'data'=>$shipdata,
        'attributes'=>array(
           'Weapon0',
           'Weapon1',
           'Weapon2',
           'Weapon3',
           
        ),
));
$songs = $this->getSongs($model);
echo "<h2 class='shipHeader'>Owned Songs</h2>";
/*$this->widget('zii.widgets.CDetailView', array(
	'data'=>$songs,
     'attributes'=>array(
           'song0',
           'song1',
           'song2',
           'song3',
        ),
));*/
foreach($songs as $song){
	$song = $song["label"];
	echo "<p>$song</p><br>";
}
?>
