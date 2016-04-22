<?php
/* @var $this PowersController */
/* @var $model Powers */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'name'); ?>
		<?php echo $form->textField($model,'name',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'reload'); ?>
		<?php echo $form->textField($model,'reload'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'returnTo'); ?>
		<?php echo $form->textField($model,'returnTo',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'abilitySpecificStat1'); ?>
		<?php echo $form->textField($model,'abilitySpecificStat1',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'abilitySpecificStat2'); ?>
		<?php echo $form->textField($model,'abilitySpecificStat2',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'abilitySpecificName1'); ?>
		<?php echo $form->textField($model,'abilitySpecificName1',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'abilitySpecificName2'); ?>
		<?php echo $form->textField($model,'abilitySpecificName2',array('size'=>45,'maxlength'=>45)); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->