<?php
session_start();

// Database connection parameters
$servername = "localhost";
$username = "root"; // Change as needed
$password = ""; // Change as needed
$dbname = "login_db"; // Change as needed

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $user, $pass);
    
    // Execute the statement
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the user exists
    if ($result->num_rows > 0) {
        // Successful login
        $_SESSION['username'] = $user;
        echo "Login successful!";
    } else {
        // Failed login
        echo "Invalid username or password.";
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>