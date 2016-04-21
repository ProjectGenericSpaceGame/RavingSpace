
<?php
// AriA @ 10.4.2016

class shipStates extends CActiveRecord{
    public static function model($className=__CLASS__){
        return parent::model($className);
    }
 
    public function tableName(){
        return 'shipStates';
    }
    public function primaryKey(){
        return 'shipID';
        // For composite primary key, return an array like the following
        // return array('pk1', 'pk2');
    }
    public function relations() {
        return array(
            'playerID' => array(self::BELONGS_TO, 'PlayerData','playerID'),
        );
    }
    public function rules(){
        return array(
            array('color', 'length', 'max'=>150),
            array('speed', 'length', 'max'=>150),
            array('gunReloadBonus', 'length', 'max'=>150),
            array('gunBltSpeedBonus', 'length', 'max'=>150),
            array('powerReloadBonus', 'length', 'max'=>150),
            array('powerAOEBonus', 'length', 'max'=>150),
            array('powerEffectTimeBonus', 'length', 'max'=>150),
            array('hp', 'length', 'max'=>150),
            array('model', 'length', 'max'=>150),
            array('gunDmgBonus', 'length', 'max'=>150),
            array('shipID', 'length', 'max'=>150),
            array('playerID', 'length', 'max'=>150),   
            //array('color', 'speed', 'gunReloadBonus', 'gunBulletSpeedBonus', 'powerReloadBonus', 'powerAOEbonus', 'powerEffectDurationTimeBonus', 'HP', 'Model', 'weaponDamageBonus', 'shipID', 'on'=>'search'),
        );
    }
    public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('color',$this->color,true);
		$criteria->compare('speed',$this->speed,true);
		$criteria->compare('gunReloadBonus',$this->gunReloadBonus,true);
		$criteria->compare('gunBltSpeedBonus',$this->gunBltSpeedBonus);
		$criteria->compare('powerReloadBonus',$this->powerReloadBonus);
		$criteria->compare('powerAOEBonus',$this->powerAOEBonus);
		$criteria->compare('powerEffectTimeBonus',$this->powerEffectTimeBonus);
		$criteria->compare('HP',$this->HP);
		$criteria->compare('Model',$this->model);
		$criteria->compare('gunDmgBonus',$this->gunDmgBonus);
		$criteria->compare('shipID',$this->shipID);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
    public function getData($id, $param){
        $post = shipStates::model()->findByPk($id,$condition,$param);
    }
  

}
?>