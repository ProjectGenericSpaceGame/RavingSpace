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
		<?php echo $form->textField($model,'passHash'); ?>
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

    <!-- shipData -->

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
		<?php echo $form->labelEx($ship,'gunRelsoadBonus'); ?>
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
		<?php echo $form->labelEx($ship,'powerAOEBonus'); ?>
		<?php echo $form->textField($ship,'powerAOEBonus'); ?>
		<?php echo $form->error($ship,'powerAOEBonus'); ?>
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
		<?php echo CHtml::Button($model->isNewRecord ? 'Create' : 'Save', array('id' => 'form_submit') ); ?>
	   </div>
    <?php $this->endWidget(); ?>

</div><!-- form -->

<script>
    var hashPass;
    var getRandom;
    var checkRegisterInfo;
    var caps = 0;
    var enter = 0;

$(document).ready(function(){

    $('#form_submit').click(function(ev) {
        ev.preventDefault();
        hashPassword();
		$('#player-data-form').submit();
    });
    function hashPassword(){
        var givenUserName = $('#PlayerData_playerID').val();
        var pass =  $('#PlayerData_passHash').val();
        var genSalt = getRandom();
        var saltyhash = pass + genSalt;
        var sh = hashPass(saltyhash)+genSalt;
        $('#PlayerData_passHash').val(sh);
    }
    // hankitaan uusi suola
    function getRandom(){
        var possible = "b8EFGHdefMNTUXYZVghiOC#%KaIJP)=?@56opAQRL&WtSjklmyncu/(\$\^\*vw34sxD79Bqrz012\!";
        var length = 10;
        var rnd = new Chance();
        var toPick = [];
        var randString = "";
        for(var j = 0;j < length;j++){
            toPick = [];
            for(var i = 0;i < length;i++){
                toPick.push(possible.charAt(rnd.integer({min:0,max:possible.length-1})));
            }
            randString += rnd.pick(toPick);
        }
        return randString;
    }
    // tiivistetään salasana
    function hashPass(pss){
        var shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(pss);
        var hash = shaObj.getHash("HEX");
        return hash;
    }  
});

</script>






