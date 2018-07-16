var express = require("express");
var Promise = require('bluebird');
var app = express();
var _ = require('lodash');

var ZomatoService = require('./services/zomato-service');

app.get('/', (req,res) => {
	return res.render('zomato-home.ejs');
});

app.get('/:city', (req, res) => {
	var city = req.params.city;

	return ZomatoService.getCityCollections(city)
	.then(function(response){

		if(response.location_suggestions.length){
			var lat = response.location_suggestions[0].latitude,
				lon = response.location_suggestions[0].longitude;

			return ZomatoService.getRestaurants(lat, lon)
			.then(function(allRestaurants){
				return res.render('restaurants-listing-page.ejs', {
					city: _.get(allRestaurants, 'location.city_name', ''),
					restaurantsList: _.get(allRestaurants, 'nearby_restaurants', []),
					location: ''
				});
			});
		}
		else{
			res.render('city-not-found.ejs');
		}
 	}).catch((err)=>{
 		console.log(err);
	});
});

app.get('/restaurant/:restaurantId', (req, res) => {
	var restaurantId = req.params.restaurantId;

	return Promise.all([
		ZomatoService.getRestaurantInfo(restaurantId),
		ZomatoService.getReviews(restaurantId)
	]).then((response) => {
		return res.render('restaurant-home.ejs', {
			restaurantDetails : response[0],
			restaurantReviews : response[1],
		});
	}).catch((err) => {
		console.log(err);
	});
});

app.get('/:city/:location', (req,res) => {
	var city = req.params.city,
		locationName = req.params.location,
		completeLocation = locationName + ", " + city;

	return ZomatoService.getLocationRestaurants(completeLocation)
	.then(function(response){
		if(response.location_suggestions.length){
			var entity_id =  _.get(response, 'location_suggestions[0].entity_id', 0),
				entity_type =  _.get(response, 'location_suggestions[0].entity_type', '');

			return ZomatoService.getLocationDetails(entity_id, entity_type)
			.then(function(locationDetails){
				res.render('restaurants-listing-page.ejs',{
					city : city,
					restaurantsList: _.get(locationDetails, 'best_rated_restaurant', []),
					location: completeLocation
				});
			});
		}else{
			res.render('city-not-found.ejs');
		}
	}).catch(function(err){
		console.log(err);
	});
});


module.exports = app;
