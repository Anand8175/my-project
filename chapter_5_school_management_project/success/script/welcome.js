// add item button
$(document).ready(function(){
	$(".add-field-btn").click(function(){
		var add_element = '<div class="input-group mb-3"><input type="text" name="course-name" class="form-control course-name" placeholder="Hostel fee"><input type="text" name="course-fee" class="form-control course-fee" placeholder="500"><div class="input-group-append"><span class="input-group-text text-light bg-danger">Monthly</span></div></div>';
		$(".add-field-area").append(add_element);
	});
});
// set fee coding

$(document).ready(function(){
	$(".set-fee-btn").click(function(){
		var class_name = $(".class-name").val();
		var course_fee = [];
		var course_name =[];
		var i;
		$(".course-fee").each(function(i){ // variable i received length of course fee.
			course_fee[i] = $(this).val();
		});

		$(".course-name").each(function(i){ // variable i received length of course name.
			course_name[i] = $(this).val();
		});

		var fee_object = {
			class_name : class_name,
			course_name : course_name,
			course_fee : course_fee
		};

		// store data in database
		var db_name = sessionStorage.getItem("db_name");
		var database = window.indexedDB.open(db_name);
		database.onsuccess = function()
		{
			var idb = this.result;
			var permission = idb.transaction("fee","readwrite");
			var access = permission.objectStore("fee");
			var fee_object_store = access.put(fee_object);
			fee_object_store.onsuccess = function()
			{
				alert("success");
			}

			fee_object_store.onerror = function()
			{
				alert("falied");
			}
		}
	});
});

// show fee coding
$(document).ready(function(){
	$("#fee-menu").click(function(){
		$("#fee-modal").addClass = "d-block";
		$("#show-fee").html('');
		var db_name = sessionStorage.getItem("db_name");
		var database = window.indexedDB.open(db_name);
		database.onsuccess = function()
		{
			var idb = this.result;
			var permission = idb.transaction("fee","readwrite");
			var access = permission.objectStore("fee");
			var get_all_keys = access.getAllKeys();
			get_all_keys.onsuccess = function()
			{
				var keys = this.result;
				var i,j;
				for(i=0;i<keys.length;i++)
				{
					var key_data = access.get(keys[i]);
					key_data.onsuccess = function()
					{
						var fee = this.result;
						var ul = document.createElement("UL");
						ul.className = "nav nav-tabs";
						var li = document.createElement("LI");
						li.className = "nav-item";
						var a = document.createElement("A");
						a.className = "nav-link active";
						a.href = "#";
						a.innerHTML = "Class - "+fee.class_name;
						li.append(a);
						ul.append(li);
						$("#show-fee").append(ul);
						var table = document.createElement("TABLE");
						table.className = "table border-right border-left border-bottom text-center";
						var tr_for_th = document.createElement("TR");
						var tr_for_td = document.createElement("TR");
						for(j=0;j<fee.course_name.length;j++)
						{
							var th = document.createElement("TH");
							th.className = "border-0";
							th.innerHTML = fee.course_name[j];
							tr_for_th.append(th);
						}
						var th_edit = document.createElement("TH");
						th_edit.className = "border-0";
						th_edit.innerHTML = "edit";
						tr_for_th.append(th_edit);

						var th_delete = document.createElement("TH");
						th_delete.className = "border-0";
						th_delete.innerHTML = "delete";
						tr_for_th.append(th_delete);

						for(j=0;j<fee.course_fee.length;j++)
						{
							var td = document.createElement("TD");
							td.className = "border-0";
							td.innerHTML = fee.course_fee[j];
							tr_for_td.append(td);
						}

						// edit fee

						var td_edit_icon = document.createElement("TD");
						td_edit_icon.className = "border-0";
						td_edit_icon.innerHTML = "<i class='fa fa-edit' style='font-size:22px; color:red; cursor:pointer;'></i>";
						tr_for_td.append(td_edit_icon);
						td_edit_icon.onclick = function()
						{
							var table = this.parentElement.parentElement;
							var ul = table.previousSibling;
							var a = ul.getElementsByTagName("A");
							var class_name = a[0].innerHTML.split(" ");
							$(".class_name").val(class_name[2]);
							var tr = table.getElementsByTagName("TR");
							var th = tr[0].getElementsByTagName("TH");
							var td = tr[1].getElementsByTagName("TD");
							var course_name = document.getElementsByClassName("course-name");
							var course_fee = document.getElementsByClassName("course-fee");
							course_name[0].parentElement.remove();
							var i;
							for(i=0;i<th.length-2;i++)
							{
								$(".add-field-btn").click();
								course_name[i].value = th[i].innerHTML;
								course_fee[i].value = td[i].innerHTML;
								$("#fee-modal").modal('hide');
							}
							$(".set-fee").addClass("animated shake");
						}

						// delete fee
						var td_delete_icon = document.createElement("TD");
						td_delete_icon.className = "border-0";
						td_delete_icon.innerHTML = "<i class='fa fa-trash' style='font-size:22px; color:red; cursor:pointer;'></i>";
						tr_for_td.append(td_delete_icon);

						td_delete_icon.onclick = function()
						{
							var ul = this.parentElement.parentElement.previousSibling;
							var a = ul.getElementsByTagName('A');
							var key_name_with_num = (a[0].innerHTML);
							var key_name = key_name_with_num.split(" ");
							var db_name = sessionStorage.getItem("db_name");
							var database = window.indexedDB.open(db_name);
							database.onsuccess = function()
							{
								var idb = this.result;
								var permission = idb.transaction("fee","readwrite");
								var access = permission.objectStore("fee");
								var delete_notice = access.delete(key_name[2]);
								delete_notice.onsuccess = function()
								{
									alert("success");
									td_delete_icon.parentElement.parentElement.previousSibling.remove();
									td_delete_icon.parentElement.parentElement.remove();
								}
							}
						}

						table.append(tr_for_th);
						table.append(tr_for_td);
						$("#show-fee").append(table);
					}
				}
			}
		}
	});
});

// retrive class name
$(document).ready(function(){
	var db_name = sessionStorage.getItem("db_name");
	var database = window.indexedDB.open(db_name);
	database.onsuccess = function()
	{
		var idb = this.result;
		var permission = idb.transaction("fee","readwrite");
		var access = permission.objectStore("fee");
		var key_name = access.getAllKeys();
		key_name.onsuccess = function()
		{
			var keys = this.result;
			var i;
			for(i=0;i<keys.length;i++)
			{
				var option = document.createElement("OPTION");
				option.innerHTML = keys[i];
				$(".class").append(option);
			}
		}
	}
});

// upload and preview image coding
$(document).ready(function(){
	$(".upload-pic").on("change",function(){
			var file = this.files[0];
			var url = URL.createObjectURL(file);
			$(".show-pic").attr("src",url); // attr means attribute.
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function()
			{
				sessionStorage.setItem("upload_pic",this.result);
			}	
	});
});

// start admit btn coding
$(document).ready(function(){
	$(".admit-btn").click(function(){
		var date = new Date($(".dob").val());
		var dob_day = date.getDate();
		var dob_month = date.getMonth();
		var dob_year = date.getFullYear()+1;
		var dob = dob_day+"/"+dob_month+"/"+dob_year;
		var c_date = new Date(); // current date.
		var doa_day = c_date.getDate();
		var doa_month =  c_date.getMonth()+1;
		var doa_year = c_date.getFullYear();
		var doa = doa_day+"/"+doa_month+"/"+doa_year;
		if(sessionStorage.getItem("upload_pic") != null)
	{
		var admission = {
			s_name : $(".s-name").val(),
			f_name : $(".f-name").val(),
			m_name : $(".m-name").val(),
			dob : dob,
			gender : $(".gender").val(),
			mobile_one : $(".mobile-one").val(),
			mobile_two : $(".mobile-two").val(),
			class : $(".class").val(),
			admit_in : $(".admit-in").val(),
			address : $(".address").val(),
			doa : doa,
			pic : sessionStorage.getItem("upload_pic"),
		};

		sessionStorage.removeItem("upload_pic");
		var db_name = sessionStorage.getItem("db_name");
		var database = window.indexedDB.open(db_name);
		database.onsuccess = function()
		{
			var idb = this.result;
			var permission = idb.transaction("admission","readwrite");
			var access = permission.objectStore("admission");
			var check_admission = access.add(access);
			check_admission.onsuccess = function()
			{
				var alert = "<div class='alert alert-success'><i class='fa fa-close close' data-dismiss='alert'></i><b>Admission success</b></div>";
				$(".admit-notice").html(alert);
			}

			check_admission.onerror = function()
			{
				var alert = "<div class='alert alert-warning'><i class='fa fa-close close' data-dismiss='alert'></i><b>Admission failed</b></div>";
				$(".admit-notice").html(alert); 
			}
		}
	}

	else{
		alert("please upload student photo");
	}
	});
});

// sidebar coding
$(document).ready(function(){
	var db_name = sessionStorage.getItem("db_name");
	$(".school-name").html(db_name);
	$(".school-name").css({
		textTransform : "uppercase",
		fontWeight : "bold",
	});
	var database = window.indexedDB.open(db_name);
	database.onsuccess = function()
	{
		var idb = this.result;
		var permission = idb.transaction("about_school","readwrite");
		var access = permission.objectStore("about_school");
		var check_data = access.get(db_name);
		check_data.onsuccess = function()
		{
			var school_information = this.result;
			$(".tagline").html(school_information.tag_line);
			$(".tagline").css({
				textTransform : "uppercase",
				color : "black",
				fontWeight : "bold",
			});
		}
	}
});