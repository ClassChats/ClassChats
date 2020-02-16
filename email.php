<?php
$email = $argv[0];
$vcode = $argv[1];
$message = "Welcome to Classchats!! We need you to veryify your account. Please click the link below and enter the verification code: <b>".$vcode."</b>";
mail($email,"Classchats- Please verify", $message);
?>