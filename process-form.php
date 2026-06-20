<?php
// 1. Database Configuration
// 1. Database Configuration
$host     = 'localhost';
$dbname   = 'portfolio_db';  // 👈 Change this to your exact database name from phpMyAdmin
$username = 'root';          // 👈 XAMPP default user is 'root'
$password = '';              // 👈 XAMPP default password is an empty string

// 2. Check if the form was actually submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 3. Collect and sanitize input data
    $fname   = isset($_POST['fname']) ? trim(htmlspecialchars($_POST['fname'])) : '';
    $lname   = isset($_POST['lname']) ? trim(htmlspecialchars($_POST['lname'])) : '';
    $email   = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
    $subject = isset($_POST['subject']) ? trim(htmlspecialchars($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? trim(htmlspecialchars($_POST['message'])) : '';

    // 4. Basic Backend Validation
    if (empty($fname) || empty($email) || empty($message)) {
        die("Please fill out all required fields.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    // 5. Insert into Database using PDO
    try {
        // Establish Connection
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // SQL Query with place-holders
        $sql = "INSERT INTO contact_submissions (first_name, last_name, email, subject, message) 
                VALUES (:fname, :lname, :email, :subject, :message)";

        $stmt = $pdo->prepare($sql);

        // Bind parameters and execute
        $stmt->execute([
            ':fname'   => $fname,
            ':lname'   => $lname,
            ':email'   => $email,
            ':subject' => $subject,
            ':message' => $message
        ]);

        // 6. Success handling (Redirecting back with a success flag)
        // You can read this query parameter in your HTML file to show a success message
        header("Location: index.html?status=success");
        exit();

    } catch (PDOException $e) {
        // In production, log this error instead of echoing it to prevent exposing database details
        die("Database Error: " . $e->getMessage());
    }
} else {
    // If someone tries to access this script directly, redirect them back
    header("Location: index.html");
    exit();
}
?>