<?php
include 'header.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
$room = $_GET['room'] ?? 'alpha room';
$messages = json_decode(file_get_contents('messages.json'), true);
$filtered = array_filter($messages, fn($msg) => $msg['room'] === $room);
echo json_encode(array_values($filtered));
?>