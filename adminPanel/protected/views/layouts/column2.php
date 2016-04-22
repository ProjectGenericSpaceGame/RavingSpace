<?php /* @var $this Controller */
$this->beginContent('//layouts/main'); ?>
<!--<script src="../JS/libs/jquery-1.11.2.min.js"></script>-->
<script src="../JS/libs/jssha/src/sha512.js"></script>
<script src="../JS/libs/chance.js"></script>
<div class="span-19">
	<div id="content">
		<?php echo $content; ?>
	</div><!-- content -->
</div>
<div class="span-5 last">
	<div id="sidebar">
	<?php
		$this->beginWidget('zii.widgets.CPortlet', array(
			'title'=>'Operations',
		));
		$this->widget('zii.widgets.CMenu', array(
			'items'=>$this->menu,
			'htmlOptions'=>array('class'=>'operations'),
		));
		$this->endWidget();
	?>
	</div><!-- sidebar -->
</div>
<?php $this->endContent(); ?>