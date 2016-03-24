<?php
/* @var $this AttackWavesController */
/* @var $data AttackWaves */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('attackID')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->attackID), array('view', 'id'=>$data->attackID)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('waveData')); ?>:</b>
	<?php echo CHtml::encode($data->waveData); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('attackLoot')); ?>:</b>
	<?php echo CHtml::encode($data->attackLoot); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('attackState')); ?>:</b>
	<?php echo CHtml::encode($data->attackState); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('playerID')); ?>:</b>
	<?php echo CHtml::encode($data->playerID); ?>
	<br />


</div>