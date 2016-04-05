<?php
/* @var $this AssetsController */
/* @var $data Assets */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('name')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->name), array('view', 'id'=>$data->name)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('asset')); ?>:</b>
	<?php echo CHtml::encode($data->asset); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('cacheKey')); ?>:</b>
	<?php echo CHtml::encode($data->cacheKey); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('usedFor')); ?>:</b>
	<?php echo CHtml::encode($data->usedFor); ?>
	<br />


</div>