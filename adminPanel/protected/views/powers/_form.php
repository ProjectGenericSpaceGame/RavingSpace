<?php
/* @var $this PowersController */
/* @var $model Powers */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'powers-form',
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
		<?php echo $form->labelEx($model,'reload'); ?>
		<?php echo $form->textField($model,'reload'); ?>
		<?php echo $form->error($model,'reload'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'returnTo'); ?>
		<?php
		if($model->attributes['returnTo'] == ""){/*jos tyhjä, ei anneta muokata tätä*/
			$disable = "disabled";

		} else {
			$disable = "";
		}
		echo $form->textField($model,'returnTo',array('size'=>45,'maxlength'=>45,$disable=>'true'));
		?>
		<?php echo $form->error($model,'returnTo'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,$model->attributes['abilitySpecificName1']); ?>
		<?php echo $form->textField($model,'abilitySpecificStat1',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'abilitySpecificStat1'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,$model->attributes['abilitySpecificName2']);  ?>
		<?php
		if($model->attributes['abilitySpecificStat2'] == ""){/*jos tyhjä, ei anneta muokata tätä*/
			$disable = "disabled";

		} else {
			$disable = "";
		}
		echo $form->textField($model,'abilitySpecificStat2',array('size'=>45,'maxlength'=>45, $disable=>"true"));
		?>
		<?php echo $form->error($model,'abilitySpecificStat2'); ?>
	</div>


	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->