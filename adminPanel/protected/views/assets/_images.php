<?php
/* @var $this AssetsController */
?>

<div class="view assetBlock" data-block="<?php echo CHtml::encode($data); ?>">
    <?php echo CHtml::beginForm(); ?>
    <div class="wrapper">
        <h3><?php echo CHtml::encode($data) ?></h3>
        <div class="iconWrapper"><i class="fa fa-check fa-2x savingStatus"></i>
            <i class="fa fa-spinner fa-pulse fa-2x savingStatus"></i></div>
        <input type="hidden" name="imageName" value="<?php echo CHtml::encode($data); ?>">
        <br />
    </div>
    <img src="../<?php echo CHtml::encode($data); ?>" alt="assetPic" class="serverImg">

    <div class="wrapper">
        <b>Filename:</b><br>
        <input type="text" name="fileName" value="<?php echo CHtml::encode(array_pop(explode("/",$data))); ?>">
        <br />
    </div>

    <div class="wrapper">
        <?php echo CHtml::ajaxSubmitButton ("Savere",
            CController::createUrl('Assets/ajaxUpdateImage'),
            array(
                'method' => 'post',
                'beforeSend' => 'function(a,b,c){
            			$("#yt"+currentIndex).parent().parent().find(".fa-pulse").show();
            			$("#yt"+currentIndex).parent().parent().find(".fa-check").hide();
        			}',
                'success' => 'function(retVal){
								if(retVal == "true"){
										$("#yt"+currentIndex).parent().parent().find(".fa-pulse").hide();
										$("#yt"+currentIndex).parent().parent().find(".fa-check").show();
										var height = $("#yt"+currentIndex).parent().parent().find(".fa-check").css("font-size");
										$("#yt"+currentIndex).parent().parent().find(".fa-check").css("font-size","0px");
										$("#yt"+currentIndex).parent().parent().find(".fa-check").animate({fontSize:height
										},1000);
									} else if(retVal == "exists"){
										alert("Filename exists already!");
									} else {
										alert("Renaming failed");
									}
            					}',
            ));
        /*Now reset*/
        echo CHtml::resetButton("Reset Data");
        echo CHtml::button("Remove image",array('method'=>'post','type'=>'submit','name'=>'nukeImg','onClick'=>"confirm('you sure??');"));
        ?>
        <!--<button name="reset" class="assets_resetbutton">Reset</button>-->
    </div>
    <?php echo CHtml::endForm(); ?>




</div>