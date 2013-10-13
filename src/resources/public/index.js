var countryDefinitions = function() {

  console.log("*** Strarting country definitions ***")

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

  var not = function(f){
    return function(v){ return !f(v) };
  };

  var isAjaxError = ajaxCountries
    .map(isError)
    .toProperty(false) // convertit en Property pour avoir une valeur initiale
    .skipDuplicates(); // si la Property vaut 2 fois false, inutile de cacher 2 fois le message d'erreur

  var showAjaxSpinner = isAjaxError.awaiting(ajaxCountries);

  var showCountryInput = ajaxCountries
    .map(not(isError))
    .toProperty(false)
    .skipDuplicates();

  var gotCountriesList = ajaxCountries
    .filter(not(isError));

  var clickOnErrorMessage = $(".error").asEventStream("click");

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

  var showOrHideInputCountry = function(show){
     console.log("show country input", show);
    showOrHide(show, $("[name='country']"));
  }

  showCountryInput.onValue(showOrHideInputCountry);

  var fillCountries = function(countries){
    for(var countryCode in countries){
      $("#countries").append('<option value="'+ countries[countryCode] +'">' + countryCode + '</option>');
    }
  };

  gotCountriesList.onValue(fillCountries);

  clickOnErrorMessage.onValue(countryDefinitions);

  console.log("*** End country definition ***");
}

countryDefinitions();
