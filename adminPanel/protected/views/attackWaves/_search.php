<?php
/* @var $this AttackWavesController */
/* @var $model AttackWaves */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'attackID'); ?>
		<?php echo $form->textField($model,'attackID'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'waveData'); ?>
		<?php echo $form->textField($model,'waveData',array('size'=>18,'maxlength'=>18)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'attackLoot'); ?>
		<?php echo $form->textField($model,'attackLoot'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'attackState'); ?>
		<?php echo $form->textField($model,'attackState',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'playerID'); ?>
		<?php echo $form->textField($model,'playerID',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->