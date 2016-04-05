<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/assets.css">
<?php /* @var $this Controller */ ?>
<?php $this->beginContent('//layouts/main'); ?>
    <div class="span-23">
        <div id="content">
            <?php echo $content; ?>
        </div><!-- content -->
    </div>
    <div class="span-7 last">
        <div id="sidebar">
            <?php
            $this->beginWidget('zii.widgets.CPortlet', array(
                'title'=>'Images on server',
            ));
            /*$this->widget('zii.widgets.CMenu', array(
                'items'=>$this->menu,
                'htmlOptions'=>array('class'=>'operations'),
            ));*/
            echo "<ul class='scanResultWrapper'>";print_r($this->serverImages);echo "</ul>";
            $this->endWidget();
            ?>
        </div><!-- sidebar -->
    </div>
<?php $this->endContent(); ?>