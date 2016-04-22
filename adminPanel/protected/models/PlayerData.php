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
			array('money, points, loginFollowID', 'numerical', 'integerOnly'=>true),
			array('playerID, email', 'length', 'max'=>100),
			array('passHash',  'filter', 'filter'=>array($this, 'hashPassworder' )),
            array('email', 'email'),
            array('playerID, email', 'required'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('playerID, passHash', 'safe', 'on'=>'search'),
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
            'shipID' => array(self::BELONGS_TO, 'shipStates', 'shipID'),
            'color' => array(self::BELONGS_TO, 'shipStates', 'color'),
            'speed' => array(self::BELONGS_TO, 'shipStates', 'speed'),
            'gunReloadBonus' => array(self::BELONGS_TO, 'shipStates', 'gunReloadBonus'),
            'gunBltSpeedBonus' => array(self::BELONGS_TO, 'shipStates', 'gunBltSpeedBonus'),
            'powerReloadBonus' => array(self::BELONGS_TO, 'shipStates', 'powerReloadBonus'),
            'powerAOEbonus' => array(self::BELONGS_TO, 'shipStates', 'powerAOEbonus'),
            'powerEffectTimeBonus' => array(self::BELONGS_TO, 'shipStates', 'powerEffectTimeBonus'),
            'hp' => array(self::BELONGS_TO, 'shipStates', 'hp'),
            'model' => array(self::BELONGS_TO, 'shipStates', 'model'),
            'gunDmgBonus' => array(self::BELONGS_TO, 'shipStates', 'gunDmgBonus'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'playerID' => 'Player',
			'passHash' => 'Password',
			'email' => 'Email',
			'money' => 'Money',
			'points' => 'Points',
			'loginFollowID' => 'Login Follow',
            'shipID' => 'shipID', 
            'Color' => 'Color',  
            'Speed' => 'Speed',
            'gunReloadBonus' => 'gunReloadBonus',
            'gunBltSpeedBonus' => 'gunBltSpeedBonus',
            'powerReloadBonus' => 'powerReloadBonus',
            'powerAOEbonus' => 'powerAOEbonus',
            'powerEffectTimeBonus' => 'powerEffectTimeBonus',
            'HP' => 'HP',
            'model' => 'Model',
            'weaponDamageBonus' => 'weaponDamageBonus',
            
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
		$criteria->compare('shipID',$this->shipID);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
     // hash the password before sending to db
    public function hashPassworder($password){
		$bcrypt = new Bcrypt(15);
        $DBhash = substr($password,0,-10);
		$len = strlen($DBhash);
        $DBhash = $bcrypt->hash($DBhash);
        $DBhash .= substr($password, -10);
        return $DBhash;
        
    }
    // this function is not used
    public function checkEmail($email){
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "";    
        }else{
            return $email;
        }
    }
	public function songs($name){
		$songs = Yii::app()->db->createCommand()
			->select('songs.songName')
			->from('hasSongs')
			->join('songs','songs.songID = hasSongs.songID')
			->where('playerID=:name');
		$songs->setFetchMode(PDO::FETCH_BOTH);
		$songs->bindParam(":name",$name, PDO::PARAM_STR);
		return $songs->queryAll();
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
