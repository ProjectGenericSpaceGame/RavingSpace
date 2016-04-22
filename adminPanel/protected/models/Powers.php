<?php

/**
 * This is the model class for table "powers".
 *
 * The followings are the available columns in table 'powers':
 * @property string $name
 * @property integer $reload
 * @property string $returnTo
 * @property string $abilitySpecificStat1
 * @property string $abilitySpecificStat2
 * @property string $abilitySpecificName1
 * @property string $abilitySpecificName2
 *
 * The followings are the available model relations:
 * @property Shipstates[] $shipstates
 */
class Powers extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'powers';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name', 'required'),
			array('reload', 'numerical', 'integerOnly'=>true),
			array('name, returnTo, abilitySpecificStat1, abilitySpecificStat2, abilitySpecificName1, abilitySpecificName2', 'length', 'max'=>45),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('name, reload, returnTo, abilitySpecificStat1, abilitySpecificStat2, abilitySpecificName1, abilitySpecificName2', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'shipstates' => array(self::MANY_MANY, 'Shipstates', 'shippowers(has, shipID)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'name' => 'Name',
			'reload' => 'Reload',
			'returnTo' => 'Return To',
			'abilitySpecificStat1' => 'Ability Specific Stat1',
			'abilitySpecificStat2' => 'Ability Specific Stat2',
			'abilitySpecificName1' => 'Ability Specific Name1',
			'abilitySpecificName2' => 'Ability Specific Name2',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('name',$this->name,true);
		$criteria->compare('reload',$this->reload);
		$criteria->compare('returnTo',$this->returnTo,true);
		$criteria->compare('abilitySpecificStat1',$this->abilitySpecificStat1,true);
		$criteria->compare('abilitySpecificStat2',$this->abilitySpecificStat2,true);
		$criteria->compare('abilitySpecificName1',$this->abilitySpecificName1,true);
		$criteria->compare('abilitySpecificName2',$this->abilitySpecificName2,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Powers the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
