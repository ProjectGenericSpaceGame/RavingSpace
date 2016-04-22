<?php
/* @var $this PowersController */
/* @var $data Powers */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('name')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->name), array('update', 'id'=>$data->name)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('reload')); ?>:</b>
	<?php echo CHtml::encode($data->reload); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('returnTo')); ?>:</b>
	<?php echo CHtml::encode($data->returnTo); ?>
	<br />

	<b><?php echo CHtml::encode($data->abilitySpecificName1); ?>:</b>
	<?php echo CHtml::encode($data->abilitySpecificStat1); ?>
	<br />

	<b><?php
		if($data->abilitySpecificName2 == ""){/*jos tyhjä, ei echoteta*/
			echo "</b>";
		} else {
		echo CHtml::encode($data->abilitySpecificName2); echo ":</b>";
			echo CHtml::encode($data->abilitySpecificStat2);
		}
?>

	<br />


</div>