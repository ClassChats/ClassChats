<?php
$from = '<classhacksjh@gmail.com>';
$email = $argv[0];
$to = '<'.$email.'>';
$subject = '"Classchats- Please verify"';
$body = "Welcome to Classchats!! We need you to veryify your account. Please click the link below and enter the verification code: <b>".$vcode."</b>";

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'classhacksjh@gmail.com',
        'password' => 'Password123#'
    ));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Message successfully sent!</p>');
}


?>