<?php
/* @var $this AssetsController */
/* @var $data Assets */
?>

<div class="view assetBlock" data-block="<?php echo CHtml::encode($data->name); ?>">
	<?php echo CHtml::beginForm(); ?>
		<div class="wrapper">
			<h3><?php echo CHtml::encode($data->name) ?></h3>
			<div class="iconWrapper"><i class="fa fa-check fa-2x savingStatus"></i>
			<i class="fa fa-spinner fa-pulse fa-2x savingStatus"></i></div>
			<input type="hidden" name="<?php echo CHtml::encode($data->getAttributeLabel('name')); ?>" value="<?php echo CHtml::encode($data->name); ?>">
			<br />
		</div>
		<img src="../<?php echo CHtml::encode($data->asset); ?>" alt="assetPic" class="assetImg">

		<div class="wrapper">
			<b><?php echo CHtml::encode($data->getAttributeLabel('asset')); ?>:</b><br>
			<?php
			/*echo CHtml::encode($this->assetList);*/
			$is = $data->asset;
			$select = "<select name='Assets[asset]' class='assetSelect'>";
			foreach($this->assetList as $val){
				if($val == $is){
					$select .= "<option selected value='".$val."'>$val</option>";
				} else {
					$select .= "<option value='".$val."'>$val</option>";
				}
			}
			$select .= "</select>";
			echo $select;
			?>
			<br />
		</div>

		<div class="wrapper">
			<b><?php echo CHtml::encode($data->getAttributeLabel('cacheKey')); ?>:</b><br>
			<input type="text" name="Assets[cacheKey]" value="<?php echo CHtml::encode($data->cacheKey); ?>">
			<br />
		</div>

		<div class="wrapper">
			<b><?php echo CHtml::encode($data->getAttributeLabel('usedFor')); ?>:</b><br>
			<?php
			/* CHtml::encode($data->usedFor); */
			$is = $data->usedFor;
			$select = "<select name='Assets[usedFor]'>";
			$values = array("game","menu","both");
			foreach($values as $val){
				if($val == $is){
					$select .= "<option selected value='".$val."'>$val</option>";
				} else {
					$select .= "<option value='".$val."'>$val</option>";
				}
			}
			$select .= "</select>";
			echo $select;
			?>
			<br />
		</div>
		<div class="wrapper">
			<?php echo CHtml::ajaxSubmitButton ("Save Data",
				CController::createUrl('Assets/ajaxUpdateSingle'),
				array(
					'method' => 'post',
					'beforeSend' => 'function(a,b,c){
            			$("#yt"+currentIndex).parent().parent().find(".fa-pulse").show();
            			$("#yt"+currentIndex).parent().parent().find(".fa-check").hide();
        			}',
					'complete' => 'function(retVal){
								
								$("#yt"+currentIndex).parent().parent().find(".fa-pulse").hide();
								$("#yt"+currentIndex).parent().parent().find(".fa-check").show();
								var height = $("#yt"+currentIndex).parent().parent().find(".fa-check").css("font-size");
								$("#yt"+currentIndex).parent().parent().find(".fa-check").css("font-size","0px");
								$("#yt"+currentIndex).parent().parent().find(".fa-check").animate({fontSize:height
								},1000);
            					}',
					));
			/*Now reset*/
			echo CHtml::resetButton("Reset Data"
				);
			?>
			<!--<button name="reset" class="assets_resetbutton">Reset</button>-->
		</div>
	<?php echo CHtml::endForm(); ?>
	



</div>