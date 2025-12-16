function SamePassword(){
    const PASSWORD = document.getElementById('PASSWORD').value;
    const PASSWORD2 = document.getElementById('PASSWORD2').value;

    if(PASSWORD != PASSWORD2){
        alert("ERROR PASSWORDS DID NOT MATCH");
        return false;

    }
    if(PASSWORD.length < 8){
        alert("ERROR PASSWORD MUST CONSIST OF 8 CHARACTERS OR MORE");
        return false;
    }

    else{
        return true;
    }
}