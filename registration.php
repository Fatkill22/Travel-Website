<?php 
session_start();

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
        $FIRSTNAME = $_POST['FIRSTNAME'];
        $LASTNAME  = $_POST['LASTNAME'];
        $EMAIL     = $_POST['EMAIL'];
        $USERNAME  = $_POST['USERNAME'];
        $PASSWORD  = $_POST['PASSWORD'];

        $sql1= "SELECT USERNAME FROM USERS WHERE USERNAME = '$USERNAME'";
        $result1= sqlsrv_query($conn,$sql1);
        $row1=sqlsrv_fetch_array($result1);

        if($row1){
            echo "<script>alert('Username has been taken'); window.location.href='registration.html';</script>";
            exit();
        }

        $ENCRYPTED = password_hash($PASSWORD, PASSWORD_DEFAULT);

        $sql2= "INSERT INTO USERS (FIRSTNAME, LASTNAME, EMAIL, USERNAME, PASSWORD) 
        VALUES
        ('$FIRSTNAME', '$LASTNAME', '$EMAIL', '$USERNAME', '$ENCRYPTED')";

        $result2= sqlsrv_query($conn, $sql2);

        if($result2){
            header("Location: Login.html");
            exit();            
        }


 }
?>