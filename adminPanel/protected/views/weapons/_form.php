<?php
/* @var $this WeaponsController */
/* @var $model Weapons */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'weapons-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'name'); ?>
		<?php echo $form->textField($model,'name',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'basedmg'); ?>
		<?php echo $form->textField($model,'basedmg'); ?>
		<?php echo $form->error($model,'basedmg'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'bulletSpeed'); ?>
		<?php echo $form->textField($model,'bulletSpeed'); ?>
		<?php echo $form->error($model,'bulletSpeed'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'reload'); ?>
		<?php echo $form->textField($model,'reload'); ?>
		<?php echo $form->error($model,'reload'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'fireRate'); ?>
		<?php echo $form->textField($model,'fireRate',array('size'=>10,'maxlength'=>10)); ?>
		<?php echo $form->error($model,'fireRate'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'clip'); ?>
		<?php echo $form->textField($model,'clip'); ?>
		<?php echo $form->error($model,'clip'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->