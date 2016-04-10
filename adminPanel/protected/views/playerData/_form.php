<?php
/* @var $this PlayerDataController */
/* @var $model PlayerData */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'player-data-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary(array($model,$ship)); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'playerID'); ?>
		<?php echo $form->textField($model,'playerID',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'playerID'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'passHash'); ?>
		<?php echo $form->textField($model,'passHash',array('size'=>60,'maxlength'=>150)); ?>
		<?php echo $form->error($model,'passHash'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'email'); ?>
		<?php echo $form->textField($model,'email',array('size'=>45,'maxlength'=>45)); ?>
		<?php echo $form->error($model,'email'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'money'); ?>
		<?php echo $form->textField($model,'money'); ?>
		<?php echo $form->error($model,'money'); ?>
	</div>

  
	<div class="row">
		<?php echo $form->labelEx($model,'points'); ?>
		<?php echo $form->textField($model,'points'); ?>
		<?php echo $form->error($model,'points'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'loginFollowID'); ?>
		<?php echo $form->textField($model,'loginFollowID'); ?>
		<?php echo $form->error($model,'loginFollowID'); ?>
	</div>
    
    <!-- shipData -->
    
    <div class="row">
		<?php echo $form->labelEx($ship,'shipID'); ?>
		<?php echo $form->textField($ship,'shipID'); ?>
		<?php echo $form->error($ship,'shipID'); ?>
	</div>
    
   <div class="row">
		<?php echo $form->labelEx($ship,'color'); ?>
		<?php echo $form->textField($ship,'color'); ?>
		<?php echo $form->error($ship,'color'); ?>
	</div>
    
    <div class="row">
		<?php echo $form->labelEx($ship,'model'); ?>
		<?php echo $form->textField($ship,'model'); ?>
		<?php echo $form->error($ship,'model'); ?>
	</div>
    
     <div class="row">
		<?php echo $form->labelEx($ship,'gunReloadBonus'); ?>
		<?php echo $form->textField($ship,'gunReloadBonus'); ?>
		<?php echo $form->error($ship,'gunReloadBonus'); ?>
	</div>
    
     <div class="row">
		<?php echo $form->labelEx($ship,'gunBltSpeedBonus'); ?>
		<?php echo $form->textField($ship,'gunBltSpeedBonus'); ?>
		<?php echo $form->error($ship,'gunBltSpeedBonus'); ?>
	</div>
    
    <div class="row">
		<?php echo $form->labelEx($ship,'powerReloadBonus'); ?>
		<?php echo $form->textField($ship,'powerReloadBonus'); ?>
		<?php echo $form->error($ship,'powerReloadBonus'); ?>
	</div>
    
    <div class="row">
		<?php echo $form->labelEx($ship,'powerAOEbonus'); ?>
		<?php echo $form->textField($ship,'powerAOEbonus'); ?>
		<?php echo $form->error($ship,'powerAOEbonus'); ?>
	</div>
    
    <div class="row">
		<?php echo $form->labelEx($ship,'powerEffectTimeBonus'); ?>
		<?php echo $form->textField($ship,'powerEffectTimeBonus'); ?>
		<?php echo $form->error($ship,'powerEffectTimeBonus'); ?>
	</div>
    
    <div class="row">
		<?php echo $form->labelEx($ship,'hp'); ?>
		<?php echo $form->textField($ship,'hp'); ?>
		<?php echo $form->error($ship,'hp'); ?>
	</div>
    
    <div class="row">
		<?php echo $form->labelEx($ship,'model'); ?>
		<?php echo $form->textField($ship,'model'); ?>
		<?php echo $form->error($ship,'model'); ?>
	</div>
    
     <div class="row">
		<?php echo $form->labelEx($ship,'speed'); ?>
		<?php echo $form->textField($ship,'speed'); ?>
		<?php echo $form->error($ship,'speed'); ?>
	</div>
    
     <div class="row">
		<?php echo $form->labelEx($ship,'gunDmgBonus'); ?>
		<?php echo $form->textField($ship,'gunDmgBonus'); ?>
		<?php echo $form->error($ship,'gunDmgBonus'); ?>
	</div>
    
	   <div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	   </div>
    <?php $this->endWidget(); ?>

</div><!-- form -->








