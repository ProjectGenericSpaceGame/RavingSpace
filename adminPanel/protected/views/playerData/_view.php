<?php
/* @var $this PlayerDataController */
/* @var $data PlayerData */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('playerID')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->playerID), array('view', 'id'=>$data->playerID)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('passHash')); ?>:</b>
	<?php echo CHtml::encode($data->passHash); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('email')); ?>:</b>
	<?php echo CHtml::encode($data->email); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('money')); ?>:</b>
	<?php echo CHtml::encode($data->money); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('points')); ?>:</b>
	<?php echo CHtml::encode($data->points); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('loginFollowID')); ?>:</b>
	<?php echo CHtml::encode($data->loginFollowID); ?>
	<br />


</div>