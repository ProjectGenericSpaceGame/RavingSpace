<?php
/* @var $this WeaponsController */
/* @var $data Weapons */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('name')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->name), array('update', 'id'=>$data->name)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('basedmg')); ?>:</b>
	<?php echo CHtml::encode($data->basedmg); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('bulletSpeed')); ?>:</b>
	<?php echo CHtml::encode($data->bulletSpeed); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('reload')); ?>:</b>
	<?php echo CHtml::encode($data->reload); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('fireRate')); ?>:</b>
	<?php echo CHtml::encode($data->fireRate); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('clip')); ?>:</b>
	<?php echo CHtml::encode($data->clip); ?>
	<br />


</div>