<?php
// phpinfo();
ini_set('display_errors', 'On');
$user = 'osak';
$pass = '29Juin2006';
$dbh = new PDO('mysql:host=localhost;dbname=cesibike', $user, $pass);
// use the connection here

// and now we're done; close it
$sth = null;
$dbh = null;