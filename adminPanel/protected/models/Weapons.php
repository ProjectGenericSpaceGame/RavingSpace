<?php

/**
 * This is the model class for table "weapons".
 *
 * The followings are the available columns in table 'weapons':
 * @property string $name
 * @property integer $basedmg
 * @property integer $bulletSpeed
 * @property integer $reload
 * @property string $fireRate
 * @property integer $clip
 *
 * The followings are the available model relations:
 * @property Shipstates[] $shipstates
 */
class Weapons extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'weapons';
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
			array('basedmg, bulletSpeed, reload, clip', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>45),
			array('fireRate', 'length', 'max'=>10),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('name, basedmg, bulletSpeed, reload, fireRate, clip', 'safe', 'on'=>'search'),
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
			'shipstates' => array(self::MANY_MANY, 'Shipstates', 'shipguns(has, shipID)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'name' => 'Name',
			'basedmg' => 'Basedmg',
			'bulletSpeed' => 'Bullet Speed',
			'reload' => 'Reload',
			'fireRate' => 'Fire Rate',
			'clip' => 'Clip',
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
		$criteria->compare('basedmg',$this->basedmg);
		$criteria->compare('bulletSpeed',$this->bulletSpeed);
		$criteria->compare('reload',$this->reload);
		$criteria->compare('fireRate',$this->fireRate,true);
		$criteria->compare('clip',$this->clip);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Weapons the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
