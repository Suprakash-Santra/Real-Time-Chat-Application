<?php
include 'header.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$text = $data['text'] ?? '';
$username = $data['username'] ?? '';
$room = $data['room'] ?? 'alpha room';

if ($text && $username) {
    $messages = json_decode(file_get_contents('messages.json'), true);
    $messages[] = [
        'text' => $text,
        'username' => $username,
        'room' => $room,
        'timestamp' => time()
    ];
    file_put_contents('messages.json', json_encode($messages));
    echo json_encode($messages);
} else {
    echo json_encode(['error' => 'Missing text or username']);
}
?>