console.log("*** Strarting application ***")
// Just an object to tidy up URLs
var URL = {
    'countries' : 'http://localhost:3000/countries'
};



// --
// -- Définitions des event streams et properties
// --

var ajaxCountries = Bacon.fromPromise($.ajax(URL.countries)) // creation d'un event stream à partir de la requête ajax
  .mapError("ERROR"); // en cas d'erreur produit une string spéciale

var isError = function(v){
  return v === "ERROR";
};

var isAjaxError = ajaxCountries
  .map(isError)
  .toProperty(false) // convertit en Property pour avoir une valeur initiale
  .skipDuplicates(); // si la Property vaut 2 fois false, inutile de cacher 2 fois le message d'erreur

var showAjaxSpinner = isAjaxError.awaiting(ajaxCountries);

// --
// -- side effects
// --

var showOrHide = function(show, selector){
  if(show) selector.show();
  else selector.hide();
};

var showOrHideErrorMessage = function(show) {
  console.log("showError = ", show);
  showOrHide(show, $(".error"));
};

isAjaxError.onValue(showOrHideErrorMessage);

var showOrHideSpinner = function(show) {
  console.log("showSpinner = ", show)
  showOrHide(show, $(".spinner"));
};

showAjaxSpinner.onValue(showOrHideSpinner);
