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

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $USERNAME = $_POST['USERNAME'];
    $PASSWORD = $_POST['PASSWORD'];

     $sql1 = "SELECT FIRSTNAME, USERNAME, [PASSWORD] FROM USERS WHERE USERNAME = '$USERNAME'";
    $result1=sqlsrv_query($conn,$sql1);
    $row1=sqlsrv_fetch_array($result1);

    if($row1){
       $ENCRYPTED = $row1['PASSWORD'];
       $FIRSTNAME = $row1['FIRSTNAME'];

       if(password_verify($PASSWORD, $ENCRYPTED)){
        $_SESSION['USERNAME'] = $row1['USERNAME']; 
        $_SESSION['FIRSTNAME'] = $FIRSTNAME;

        header("Location: Website.html");
        exit();
       }
    else{
        echo "<script>alert('Incorrect Username or Password'); window.location.href='login.html';</script>";
        exit();    
    }       
    }
    
    else{
        echo "<script>alert('Incorrect Username or Password'); window.location.href='login.html';</script>";
        exit();    
    }

        
}
    

?>