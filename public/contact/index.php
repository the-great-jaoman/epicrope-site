<?php
/**
 * Contact Form Handler
 * 
 * Simple PHP mail handler for the EpicRope contact form.
 * Replace with your actual email processing logic.
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : '';
    $subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';
    
    $to = 'contact@epicrope.com';
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n\n";
    $body .= "Message:\n$message\n";
    
    if (mail($to, "EpicRope Contact: $subject", $body, $headers)) {
        header('Location: /contact/?success=1');
    } else {
        header('Location: /contact/?error=1');
    }
    exit;
} else {
    header('Location: /contact/');
    exit;
}
