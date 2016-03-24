<?php
/* @var $this AttackWavesController */
/* @var $model AttackWaves */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'attack-waves-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'waveData'); ?>
		<?php echo $form->textField($model,'waveData',array('size'=>18,'maxlength'=>18)); ?>
		<?php echo $form->error($model,'waveData'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'attackLoot'); ?>
		<?php echo $form->textField($model,'attackLoot'); ?>
		<?php echo $form->error($model,'attackLoot'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'attackState'); ?>
		<?php echo $form->textField($model,'attackState',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'attackState'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'playerID'); ?>
		<?php echo $form->textField($model,'playerID',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'playerID'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->