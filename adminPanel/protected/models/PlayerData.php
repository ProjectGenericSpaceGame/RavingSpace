<?php

/**
 * This is the model class for table "playerData".
 *
 * The followings are the available columns in table 'playerData':
 * @property string $playerID
 * @property string $passHash
 * @property string $email
 * @property integer $money
 * @property integer $points
 * @property integer $loginFollowID
 */
class PlayerData extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'playerData';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('playerID, passHash, loginFollowID', 'required'),
			array('money, points, loginFollowID', 'numerical', 'integerOnly'=>true),
			array('playerID, email', 'length', 'max'=>45),
			array('passHash', 'length', 'max'=>150),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('playerID, passHash, email, money, points, loginFollowID', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'playerID' => 'Player',
			'passHash' => 'Pass Hash',
			'email' => 'Email',
			'money' => 'Money',
			'points' => 'Points',
			'loginFollowID' => 'Login Follow',
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

		$criteria->compare('playerID',$this->playerID,true);
		$criteria->compare('passHash',$this->passHash,true);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('money',$this->money);
		$criteria->compare('points',$this->points);
		$criteria->compare('loginFollowID',$this->loginFollowID);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return PlayerData the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
