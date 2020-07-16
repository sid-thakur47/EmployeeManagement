"Use Strict";
function validate(){
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var repetePass = document.getElementById("repeate-pass").value;
    var mobileNumber = document.getElementById("mobileNumber").value;
    var error_message = document.getElementById("error").value;

    error.style.padding = "10px";
    var passRegex=/(?=.*[A-Z])(?=.*[\d])(?=.*[#$!*@&])[a-zA-Z0-9#$!*@&]{8,}$/;
    var nameRegex=/[A-Za-z]/;
    var emailRegex=/^[a-z0-9]{1,}([.|-|_]?[a-z0-9]+)?[@][a-z0-9]{1,}.[a-z]{2,4}?$/;
    var mobileRegex=/[0-9]{10}$/;

    // Name validation
    if(firstName.length == " "){
        text = "Name fields cannot be empty";
        document.getElementById('error').innerHTML = text;
        return false;
    }


    if( lastName.length == " "){
        text = "Last Name fields cannot be empty";
        document.getElementById('error').innerHTML = text;
        return false;
    }

    else if(nameRegex.test(firstName) === false||nameRegex.test(lastName) === false){
        text = " Name cannot have numeric value";
        document.getElementById('error').innerHTML = text;
        return false;
    }

    // Email validation
    if(email.length == ""){
        text ="Email fields cannot be empty";
        document.getElementById('error').innerHTML = text;
        return false;
    }

   else if(emailRegex.test(email) === false){
        text = " Please enter valid email";
        document.getElementById('error').innerHTML = text;
        return false;
    }

    //Mobile number validation
    if(mobileNumber.length == ""){
        text ="Mobile number field cannot be empty";
        document.getElementById('error').innerHTML = text;
        return false;
    }

   else if(mobileRegex.test(mobileNumber)=== false){
        text = "Please Enter valid phone number";
        document.getElementById('error').innerHTML = text;
        return false;
    }

      //Password validation
      if(pass.length == ""){
        text ="Password field cannot be empty";
        document.getElementById('error').innerHTML = text;
        return false;
      }

   else if(passRegex.test(pass)=== false){
      text = "Please Enter valid password";
      document.getElementById('error').innerHTML = text;
      return false;
    }
    
    if(pass !== repetePass){
        text = "Password did not match";
          document.getElementById('error').innerHTML = text;
          return false;
    }

    if($("input[name='seen']").is(':checked')) {
        text = "Please select gender";
        document.getElementById('error').innerHTML = text;
        return false;
    }

    swal.fire({
        title:'User Registered',
        customClass: 'swal-wide',
        showCancelButton: false,
        showConfirmButton:true,
        timer: 3000
    });
    
    $.get( "http://localhost:3000/get", (res, err)=> {
        console.log(res);
        var str = res;
        var str1 = $(str).attr("data");
        var str2 = $("#form").serializeArray();
        if(str1 != null){
            $(str1).attr('data').push(str2)
        }else{
            str1 = new Array();
            str1.push(str2);
        }
        let valToSend = $(str1).attr('data') == undefined ? str1 : $(str1).attr('data');
        let loginData = {
            data:valToSend,
        }
        
        $.post('http://localhost:3000/save', loginData, (res, err)=> {
            if(res){
                console.log(res);  
                location.href = "Login.html";
            } 
        });
      }); 
  }