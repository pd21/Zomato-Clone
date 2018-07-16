$(document).ready(function(){

	$('#locationName').on('keypress', function(e){
		if(e.keyCode === 13){
			$('#btn-search-location').trigger('click');
		}
	});
	
	$('#btn-search-location').on('click', function(){
		var locationName = $('#locationName').val();

		if(!locationName){
			Materialize.toast('Please enter location', 1000);
			return;
		}
		window.location.href = '/zomato/' + city + '/' + locationName;
	});

	$('.restaurant-card').on('click', function(){
		var restaurantId = $(this).data('restaurantId');
		window.location.href = '/zomato/restaurant/' + restaurantId;		
	});
});
