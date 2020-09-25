new WOW().init();
$(document).ready(function(){
$(".navbar ul li a").click(function(event){
event.preventDefault();
var href_value = this.hash;
$("html").animate({
scrollTop:$(href_value).offset().top
},500,function(){
window.location.hash = href_value;
});
});
});
// end smooth scrolling coding

// show image name in upload button
$(document).ready(function(){
	$("#upload").on("change",function(){
		var file_name = this.files[0].name;
		$(".custom-file-label").html(file_name);
	})
});