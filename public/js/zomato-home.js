$(document).ready(function(){

	$('#cityName').on('keypress', function(e){
		if(e.keyCode === 13){
			$('#btn-search-city').trigger('click');
		}
	});

	$('#btn-search-city').on('click',function(){
		var cityName = $('#cityName').val();

		if(!cityName){
			Materialize.toast('Please enter city to search', 1500);
			return;
		}
		window.location.href = '/zomato/' + cityName;
	});
	
});