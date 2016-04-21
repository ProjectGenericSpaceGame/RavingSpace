<?php
/* @var $this PlayerDataController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Player Datas',
);

$this->menu=array(
	array('label'=>'Create PlayerData', 'url'=>array('create')),
	//array('label'=>'Manage PlayerData', 'url'=>array('admin')),
);
?>

<h1>PlayerData</h1>
<form method="get">
    <input type="search" class="searchField" placeholder="Search by playerID or email" name="search" value="<?=isset($_GET['search']) ? CHtml::encode($_GET['search']) : ''; ?>" />
    <input type="submit" value="Search" />
</form>
<?php
  //  $data = new PlayerDataController;
    //$data->actionIndex();
    

     $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
