// Just an object to tidy up URLs
var URL = {
    'countries' : 'http://localhost:3000/countries'
};

// pratique !
function always(v){
  return function(){return v};
}


// --
// -- Définitions des event streams et properties
// --

var ajaxCountries = Bacon.fromPromise($.ajax(URL.countries)); // creation d'un event stream à partir de la requête ajax

var isAjaxError = ajaxCountries
  .map(always(false)) // en cas de succes : pas de message d'erreur
  .mapError(always(true)) // en cas d'erreur : message d'erreur
  .toProperty(false) // convertit en Property pour avoir une valeur initiale
  .skipDuplicates(); // si la Property vaut 2 fois false, inutile de cacher 2 fois le message d'erreur



// --
// -- side effects
// --

var showOrHideErrorMessage = function(show) {
  console.log("showError = ", show);
  if(show) $(".error").show();
  else $(".error").hide();
}

isAjaxError.onValue(showOrHideErrorMessage);
