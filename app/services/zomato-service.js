'use strict';

var FinalService = require('./final-service');

function getCityDetails(city){
	return FinalService.invoke({
		url: `https://developers.zomato.com/api/v2.1/cities?q=${city}`,
		method: 'GET'
	}).then((response)=>{
		return response;
	}).catch((err)=>{
		return err;
	});
}

function getCityCollections(city){
   return FinalService.invoke({
     url: `https://developers.zomato.com/api/v2.1/locations?query=${city}`,
     method : 'GET'
   }).then((response) =>{
		 return response;
   }).catch((err) => {
		 return err;
   });
}

function getRestaurants(lat,long){
	return FinalService.invoke({
		url: `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}`,
		method : 'GET'
	}).then((response) =>{
			return response;
	}).catch((err) => {
		 return err;
	});
}

function getLocationRestaurants(location){
	 var encodelocation = encodeURIComponent(location);
	 return FinalService.invoke({
 		url: `https://developers.zomato.com/api/v2.1/locations?query=${encodelocation}`,
 		method : 'GET'
 	}).then((response) =>{
		return response;
 	}).catch((err) => {
 		 return err;
 	});
}

function getLocationDetails(entity_id, entity_type){
	 return FinalService.invoke({
 		url: `https://developers.zomato.com/api/v2.1/location_details?entity_id=${entity_id}&entity_type=${entity_type}`,
 		method : 'GET'
 	}).then((response) =>{
			return response;
 	}).catch((err) => {
		return err;
 	});
}
function getRestaurantInfo(restaurant_id){	
	 return FinalService.invoke({
 		url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurant_id}`,
 		method : 'GET'
 	}).then((response) =>{
			return response;
 	}).catch((err) => {
		return err;
 	});
}
function getReviews(restaurant_id){
	 return FinalService.invoke({
 		url: `https://developers.zomato.com/api/v2.1/reviews?res_id=${restaurant_id}`,
 		method : 'GET'
 	}).then((response) =>{
			return response;
 	}).catch((err) => {
		return err;
 	});
}


module.exports = {
	getCityDetails,
	getCityCollections,
  	getRestaurants,
	getLocationRestaurants,
	getLocationDetails,
	getRestaurantInfo,
	getReviews,
}
