// browser compatblity
window.indexedDB = window.indexedDB || webkitWindowindexedDB || mozWindow.indexedDB ||
msWindowindexedDB;
// read write permission
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||  window.msIDBTransaction;
// key permission
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
if(!window.indexedDB)
{
document.write("<h1 align='center'>PLEASE UPDATE YOUR BROWSER</h1>");
}
// start form coding
else{
$(document).ready(function(){
$("#register-form").submit(function(){
var check_database_in_indexedDB = window.indexedDB.databases();
check_database_in_indexedDB.then(function(db_list){ // pending parameter return how many databases stored in indexedDB
if(db_list.length == 0)
{
	register();
}
else{
	$("#message").removeClass("d-none");
	$("#message").addClass("alert-warning");
	$("#message").append("<b>Registration Failed !</b> <a href='https:/wapinstitute.com'>please purchase paid version</a> <i class='fa fa-trash' style='color:red; font-size:24px; margin-left:15px; cursor:pointer;' title='Please delete current database records' data-toggle='tooltip' id='tooltip'></i>");
	$("#tooltip").tooltip();
	$("#tooltip").click(function(){
		$("#confirm").modal();
		$("#delete-btn").click(function(){
			var all_db = window.indexedDB.databases();
			all_db.then(function(all_db_list){
				var verify_delete = window.indexedDB.deleteDatabase(all_db_list);
				verify_delete.onsuccess = function(){
					$("#register-form").trigger('reset');
					$("#message").addClass("d-none");
					$(".delete-message").html("");
					$(".delete-success-notice").removeClass("d-none");
				}
			});
		});
	});

}
});
return false;
})
function register()
{
var school_name = $("#school-name").val(); // val means value.
var tag_line =  $("#tagline").val(); // val means value.
var email = $("#email").val(); // val means value.
var password = $("#password").val();
var website = $("#website").val(); // val means value.
var mobile = $("#mnumber").val(); // val means value.
var phone = $("#pnumber").val(); // val means value.
var address = $("#address").val(); // val means value.
var database = window.indexedDB.open(school_name);
database.onsuccess = function()
{
$("#message").removeClass("d-none");
$("#message").addClass("alert-success");
$("#message").append("<b>Success ! </b> dear admin please login...");
$("#register-form").trigger('reset');
setTimeout(function(){
$("#message").addClass("d-none");
$("[href='#login']").click();
},2000);
}
database.onerror = function()
{
$("#message").removeClass("d-none");
$("#message").addClass("alert-danger");
$("#message").append("<b>Oops ! something wrong please contact 9854125741...");
}
database.onupgradeneeded = function()
{
var data = {
school_name:school_name, // left side property name and right side variable name.
tag_line : tag_line,  // left side property name and right side variable name.
email : email,  // left side property name and right side variable name.
password : password, // left side property name and right side variable name.
website : website,  // left side property name and right side variable name.
mobile : mobile,  // left side property name and right side variable name.
phone : phone,  // left side property name and right side variable name.
address : address  // left side property name and right side variable name.
};
var idb = this.result;
var object = idb.createObjectStore("about_school",{keyPath:"school_name"});
idb.createObjectStore("fee",{keyPath:"class_name"});
idb.createObjectStore("admission",{autoIncrement:true});
object.add(data);
}
}
});
}
// start login form coding
$(document).ready(function(){
$("#login-form").submit(function(){
var username = $("#username").val();
var password = $("#login-password").val();
var login_data = {
username : username,
password : password
};
var json_data = JSON.stringify(login_data);
sessionStorage.setItem("login",json_data);
if(sessionStorage.getItem("login") != null)
{
// find users from database
var user_database = window.indexedDB.databases();
user_database.then(function(pending_object){
var i;
for(i=0;i<pending_object.length;i++)
	{
	var db_name = pending_object[i].name;
	sessionStorage.setItem("db_name",db_name);
	var database = window.indexedDB.open(db_name);
	database.onsuccess = function()
	{
	var idb = this.result;
	var permission = idb.transaction("about_school","readwrite");
	var access = permission.objectStore("about_school");
	var json_data = access.get(db_name);
	json_data.onsuccess = function()
	{
	var user = this.result;
	if(user)
	{
	var db_username = user.email;
	var db_password = user.password;
	var session_data = JSON.parse(sessionStorage.getItem("login"));
	if(session_data.username == db_username)
	{
	if(session_data.password == db_password)
	{
	window.location = "success/welcome.html";
	}
	else{
	$("#login-message").removeClass("d-none");
	$("#login-message").addClass("alert-warning");
	$("#login-message").append("<b>Wrong Password");
	$("#login-form").trigger('reset');
	setTimeout(function(){
	$("#login-message").addClass("d-none")
	},4000);
	}
	}
	else{
	$("#login-message").removeClass("d-none");
	$("#login-message").addClass("alert-warning");
	$("#login-message").append("<b>User not found");
	$("#login-form").trigger('reset');
	setTimeout(function(){
	$("#login-message").addClass("d-none");
	},4000);
	}
	}
	else{
	$("#login-message").removeClass("d-none");
	$("#login-message").addClass("alert-warning");
	$("#login-message").append("<b>key not found</b>");
	$("#login-form").trigger('reset');
	}
	}
	}
	}
	});
	}
	else{
	$("#login-message").removeClass("d-none");
	$("#login-message").addClass("alert-warning");
	$("#login-message").append("<b>session failed ! please try again</b>");
	setTimeout(function(){
	$("#login-message").addClass("d-none");
	$("#login-form").trigger('reset');
	},3000);
	}
	return false;
	});
	});