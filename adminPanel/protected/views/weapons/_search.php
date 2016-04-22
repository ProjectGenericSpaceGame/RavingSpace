<?php
/* @var $this WeaponsController */
/* @var $model Weapons */
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
		<?php echo $form->label($model,'basedmg'); ?>
		<?php echo $form->textField($model,'basedmg'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'bulletSpeed'); ?>
		<?php echo $form->textField($model,'bulletSpeed'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'reload'); ?>
		<?php echo $form->textField($model,'reload'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'fireRate'); ?>
		<?php echo $form->textField($model,'fireRate',array('size'=>10,'maxlength'=>10)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'clip'); ?>
		<?php echo $form->textField($model,'clip'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->