

function onEdit(obj) {
    location.href="AddEmployee.html?"+$(obj).parent().parent().find('td:first').html();
}

function getEditData(){
    var id = window.location.search;
    if(id != undefined && id != ""){
        $("#updateid").show();
        $("#saveid").hide();       
        $.get( "http://localhost:3000/getmanagement", (res, err)=> {
            $($(res).attr('data')).each(function (key, val) {           
                 $($(val).attr('data')).each(function (k, vall) {       
                        $(vall).each(function (k, v) {
                        if ($(v).attr('name') == 'empCode' && id.substr(1) == $(v).attr('value')) {
                            editEmpData(vall);
                        }
                    });
                });
            });
        })
    }else{
        $("#saveid").show();
        $("#updateid").hide();       
    }
}

function editEmpData(vall){
    $(vall).each(function (k, v) {
    if($(v).attr('name') == 'empCode')
        document.getElementById("empCode").value = $(v).attr('value');
    if($(v).attr('name') == 'fullName')
        document.getElementById("fullName").value = $(v).attr('value');
    if($(v).attr('name') == 'lastName')
        document.getElementById("lastName").value = $(v).attr('value');
    if($(v).attr('name') == 'gender')
        document.getElementById("gender").value = $(v).attr('value');
    if($(v).attr('name') == 'email')
        document.getElementById("email").value = $(v).attr('value');
    if($(v).attr('name') == 'phone')
        document.getElementById("phone").value = $(v).attr('value');
    if($(v).attr('name') == 'salary')
        document.getElementById("salary").value = $(v).attr('value');
    if($(v).attr('name') == 'city')
        document.getElementById("city").value = $(v).attr('value');
    });
}

function updateData(){
    var id = window.location.search;
    id = id.substr(1);
    $.get("http://localhost:3000/getmanagement", (res, err)=> {
        console.log(res);
        var condition = false;
        var keyDelete = -1;
        $($(res).attr('data')).each(function (key, val) {       
          $($(val).attr('data')).each(function (key1, vall) {                
            $(vall).each(function (key2, v) {
                if ($(v).attr('name') == 'empCode' && id == $(v).attr('value')) {
                   console.log("Code match"+key1); 
                   updateEmpData(vall);       
                  }
            });
        });
        
        });  
        $.post('http://localhost:3000/management', $(res).attr('data'), (res1, err)=> {
                    if(res1){
                        console.log(res1);  
                        location.href="DashBoard.html";
                    } 
                }); 
    }); 
    
}

function updateEmpData(vall){
    $(vall).each(function (k, v) {
    if($(v).attr('name') == 'empCode')
        $(v).attr('value',document.getElementById("empCode").value);
    if($(v).attr('name') == 'fullName')
         $(v).attr('value',document.getElementById("fullName").value);
    if($(v).attr('name') == 'lastName')
        $(v).attr('value',document.getElementById("lastName").value);
    if($(v).attr('name') == 'gender')
        $(v).attr('value',document.getElementById("gender").value);
    if($(v).attr('name') == 'email')
       $(v).attr('value',document.getElementById("email").value);
    if($(v).attr('name') == 'phone')
        $(v).attr('value',document.getElementById("phone").value);
    if($(v).attr('name') == 'salary')
        $(v).attr('value',document.getElementById("salary").value);
    if($(v).attr('name') == 'city')
         $(v).attr('value',document.getElementById("city").value);
    });
}

function onDelete(obj) {
        var id = $(obj).parent().parent().find('td:first').html();
        $.get( "http://localhost:3000/getmanagement", (res, err)=> {
            console.log(res);
            var condition = false;
            var keyDelete = -1;
            $($(res).attr('data')).each(function (key, val) {       
              $($(val).attr('data')).each(function (key1, vall) {                
                $(vall).each(function (key2, v) {
                    if ($(v).attr('name') == 'empCode' && id == $(v).attr('value')) {
                       console.log("Code match"+key1);
                       condition = true;
                       keyDelete = key1;
                      }
                });
            });
            if(condition){
               delete $(val).attr('data')[keyDelete];
                $.post('http://localhost:3000/management', val, (res, err)=> {
                    if(res){
                        console.log(res);  
                    } 
                });
                }
            })           
        })      
    }



function saveData(){
    var firstName = document.getElementById("fullName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var city = document.getElementById("city").value;
    var salary = document.getElementById("salary").value;
    var mobileRegex=/^\d{10}$/;
    var nameRegex=/[A-Za-z]/;
    var emailRegex=/^[a-z0-9]{1,}([.|-|_]?[a-z0-9]+)?[@][a-z0-9]{1,}.[a-z]{2,4}?$/;

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

    
    if(nameRegex.test(firstName) === false||nameRegex.test(lastName) === false){
        text = "Invalid name";
        document.getElementById('error').innerHTML = text;
        return false;
    }

    if(emailRegex.test(email) === false||email.length==" "){
        text = "Please provide valid email";
        document.getElementById('error').innerHTML = text;
        return false;
    }

    if(mobileRegex.test(phone) === false||phone.length==" "){
        text = "Please provide valid Mobile number";
        document.getElementById('error').innerHTML = text;
        return false;
    }

    if(city.length == " "||nameRegex.test(city) === false){
        text = "City fields cannot be empty";
        document.getElementById('error').innerHTML = text;
        return false;
    }
    if(salary < 0){
        text = "Salary cannot be negative";
        document.getElementById('error').innerHTML = text;
        return false;
    }
    

    $("#empCode").val(Math.floor((Math.random() * 100) + 1));
    $.get( "http://localhost:3000/getmanagement", (res, err)=> {
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
        
        $.post('http://localhost:3000/management', loginData, (res, err)=> {
            if(res){
                console.log(res);  
                location.href = "DashBoard.html";
            } 
        });
      });
}

function getEmplyeeDetails(){
  $.get( "http://localhost:3000/getmanagement", (res, err)=> {
    console.log(res);
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    $($(res).attr('data')).each(function (key, val) {       
      $($(val).attr('data')).each(function (k, vall) { 
        var newRow = table.insertRow(key);      
        $(vall).each(function (k, v) {
            addFormDetails($(v),newRow)
        })
    })
    })
})
}
	function addFormDetails(data,newRow) {

	if (data.attr('name') == 'empCode') {
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.attr('value');
    }

    if (data.attr('name') == 'fullName') {
    cell2 = newRow.insertCell(1);
    cell2.innerHTML =  data.attr('value');

    }

    if (data.attr('name') == 'lastName') {
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.attr('value');
    }

    if (data.attr('name') == 'gender') {
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.attr('value');
    }

    if (data.attr('name') == 'email') {
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.attr('value');
    }
    

    if (data.attr('name') == 'phone') {
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.attr('value');
    }

    
    if (data.attr('name') == 'salary') {
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.attr('value');
    }
        
    if (data.attr('name') == 'city') {
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.attr('value');
    
     cell9 = newRow.insertCell(8);
     cell9.innerHTML = `<a class="btn btn-primary btn-xs" style="color:white" onClick="onEdit(this)">Edit</a>&nbsp;&nbsp;` ;
   
     cell10 = newRow.insertCell(9);
     cell10.innerHTML = `<a class="btn btn-primary btn-xs" style="color:white" onClick="onDelete(this)">Delete</a>&nbsp;&nbsp;`;
    }
} 
     
