function checkUser() {

  
  var username = $("#username").val();
  var password = $("#password").val();
  var error_message = document.getElementById("error");

  var loginStatus = false;
  var str = localStorage.getItem("logindata");

  $.get( "http://localhost:3000/get", (res, err)=> {
    console.log(res);

    $($(res).attr('data')).each(function (key, val) {
      var usernameStatus = false;
      var passwordStatus = false;
      $($(val).attr('data')).each(function (k, vall) {       
        $(vall).each(function (k, v) {
          if ($(v).attr('name') == 'email' && $("#username").val() == $(v).attr('value')) {
            usernameStatus = true;
          }
          if ($(v).attr('name') == 'password' && $("#password").val() == $(v).attr('value')) {
            passwordStatus = true;
          }
        })
      })
  
      if (usernameStatus && passwordStatus) {
        swal.fire({
          title:'Login Sucessful',
          customClass: 'swal-wide',
          showCancelButton: false,
          showConfirmButton:true,
          timer: 3000
      });
    var millisecondsToWait = 1000;
    setTimeout(function() {
    location.href = "DashBoard.html";
    }, millisecondsToWait);
        loginStatus = true;
        return true;
      }
    });
    if (!loginStatus) {
        swal.fire({
       title:'Incorrect Credentials',
       customClass: 'swal-wide',
       showCancelButton: false,
       timer: 3000
   });

    }
  });
  return false;
}