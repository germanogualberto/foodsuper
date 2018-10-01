$("form #email").keypress(function (e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        $('#password').focus();
        return false;
    } else {
        return true;
    }
});

$(document).ready(function(){
    var email,pass;
    $("#submit").click(function(){
        window.location.href = "www.google.com";
        email=$("#email").val();
        pass=$("#password").val();
        console.log(email);
        console.log(pass);      
        
        window.location.href = "test.html";

    });
});
