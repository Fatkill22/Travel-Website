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

 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $HOTEL_NAME = $_POST['HOTEL_NAME'];
        $DATE_IN  = $_POST['DATE_IN'];
        $DATE_OUT     = $_POST['DATE_OUT'];
        $PRICE  = $_POST['PRICE'];
        $USERNAME = $_SESSION['USERNAME'];
        $STATUS = 'UNPAID';

        
        $sql1= "INSERT INTO HOTEL_BOOKING (HOTEL_NAME, DATE_IN, DATE_OUT, PRICE, STATUS, USERNAME)
        VALUES
        ('$HOTEL_NAME', '$DATE_IN', '$DATE_OUT', '$PRICE', '$STATUS','$USERNAME')";
        $result1= sqlsrv_query($conn,$sql1);
        $row1=sqlsrv_fetch_array($result1);

        if($result1 != false){
            header("Location: Booked.html");
        }
    }
?>