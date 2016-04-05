<?php
/* @var $this AssetsController */
/* @var $model Assets */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'assets-form',
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
		<?php echo $form->textField($model,'name',array('size'=>60,'maxlength'=>100)); ?>
		<?php echo $form->error($model,'name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'asset'); ?>
		<?php echo $form->textField($model,'asset',array('size'=>60,'maxlength'=>100)); ?>
		<?php echo $form->error($model,'asset'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'cacheKey'); ?>
		<?php echo $form->textField($model,'cacheKey',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'cacheKey'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'usedFor'); ?>
		<?php echo $form->textField($model,'usedFor',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'usedFor'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->