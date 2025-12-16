<?php
session_start();

if (!isset($_SESSION['USERNAME'])) {
    header("Location: login.html");
    exit();
}

$USERNAME = $_SESSION['USERNAME'];

$serverName = "LAPTOP-Q7I18HVK\SQLEXPRESS01"; 
$connectionOptions = [ 
    "Database" => "FINAL", 
    "Uid" => "",
    "PWD" => ""
];  

$conn = sqlsrv_connect($serverName, $connectionOptions); 
if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

$sql = "SELECT HOTEL_NAME, DATE_IN, DATE_OUT, PRICE, STATUS
        FROM HOTEL_BOOKING
        WHERE USERNAME = '$USERNAME'
        ORDER BY DATE_IN DESC";

$result = sqlsrv_query($conn, $sql);
if ($result === false) {
    die(print_r(sqlsrv_errors(), true));
}

$bookings = [];
while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    $bookings[] = $row;
}

header('Content-Type: application/json');
echo json_encode($bookings);
