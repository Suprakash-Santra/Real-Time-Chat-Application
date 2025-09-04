<?php
include 'header.php';
include 'db.php';
session_start();

$data = json_decode(file_get_contents( "php://input"), true);
$username = $data['username'];
$password = $data['password'];
 
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $_SESSION['username'] = $username;
    echo json_encode(["success" => true, "username" => $username]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
?>