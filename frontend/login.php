<?php
session_start();

// Accept any email/password for demo
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? $_POST['email'] ?? 'demo@example.com';
    $_SESSION['email'] = $email;

    // Redirect to demo page
    header("Location: index.html");
    exit();
}
?>
