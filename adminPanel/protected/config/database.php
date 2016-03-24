<?php

// This is the database connection configuration.
if(preg_match("/localhost/",$_SERVER["SERVER_NAME"])){
	return array(
		//'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
		// uncomment the following lines to use a MySQL database

		'connectionString' => 'mysql:host=localhost;dbname=H3492_1',
		'emulatePrepare' => true,
		'username' => 'root',
		'password' => '',
		'charset' => 'utf8',

	);
} else {
	return array(
		//'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
		// uncomment the following lines to use a MySQL database

		'connectionString' => 'mysql:host=mysql.labranet.jamk.fi;dbname=H3492_1',
		'emulatePrepare' => true,
		'username' => 'H3492',
		'password' => 'cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT',
		'charset' => 'utf8',

	);
}
