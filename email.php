<?php
require_once "Mail.php";

$from = 'classhacksjh@gmail.com';
$email = $argv[1];
echo $email;
$to = $email;
$subject = 'ClassChats- Please verify';
$vcode = $argv[2];
$body = "                                                                                                               
Welcome to ClassChats!! We need you to verify your account.
Please click the link below and enter the verification code:\n".$vcode;

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
        'host' => 'smtp.gmail.com',
        'port' => '25',
        'auth' => true,
        'username' => 'classhacksjh@gmail.com',
        'password' => 'howdoesabastardorphansonofawhore'
    ));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Message successfully sent!</p>');
}


?>