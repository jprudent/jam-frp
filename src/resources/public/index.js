$( document ).ready(function() {

  console.log("*** Strarting country definitions ***")

  // --
  // -- Constantes (url, dom, ...)
  // --

  // Just an object to tidy up URLs
  var URL = {
      countries : 'http://localhost:3000/countries',
      zipCodes : function(info){
        return 'http://localhost:3000/countries/' + info.countryCode + "/cities/" + info.partialZipCode;
      }
  };

  var $S = {
    country : $('input[name="country"]'),
    countryHelp : $("#help_country"),
    zipCode : $('input[name="zipCode"]'),
    zipCodeHelp : $("#help_zipCode")
  }


  // --
  // -- utilitaires
  // --

  var isError = function(v){
    return v === "ERROR";
  };

  var not = function(f){
    return function(v){ return !f(v) };
  };

  var showOrHide = function(show, selector){
    if(show) selector.show();
    else selector.hide();
  };


  // --
  // -- initialisation
  // --

  // everything is hidden by default.
  // stream will provide events that will show or hide the different parts of the DOM
  var hideEverything = function(){
    var hide = false;
    showOrHide(hide,$S.country);
    showOrHide(hide,$S.countryHelp);
    showOrHide(hide,$S.zipCode);
    showOrHide(hide,$S.zipCodeHelp);
  };

  hideEverything();



  // --
  // -- Définitions des event streams et properties
  // --

  var ajaxCountries = Bacon.fromPromise($.ajax(URL.countries)) // creation d'un event stream à partir de la requête ajax
    .mapError("ERROR"); // en cas d'erreur produit une string spéciale

  var isErrorAjaxCountries = ajaxCountries
    .map(isError)
    .toProperty(false) // convertit en Property pour avoir une valeur initiale
    .skipDuplicates(); // si la Property vaut 2 fois false, inutile de cacher 2 fois le message d'erreur

  var isOngoingAjaxCountries = isErrorAjaxCountries.awaiting(ajaxCountries);

  var isDoneAjaxCountries = ajaxCountries
    .map(not(isError))
    .toProperty(false)
    .skipDuplicates();

  var countriesList = ajaxCountries
    .filter(not(isError));

  var inputCountry = $S.country.asEventStream("input")
    .map(function(event){
      return $(event.target).val();
    })
    .toProperty($S.country.val()); // default value.


  var findCountryCode = function(country,countries){
    for(var countryCode in countries){
         if(country === countries[countryCode]) return countryCode;
      }
    return null;
  };

  var isInvalidCountry = inputCountry
    .combine(countriesList, function(input, countries){
      return findCountryCode(input,countries) === null;
    });

  var countryCode = inputCountry
    .combine(countriesList, findCountryCode)
    .filter(function(v){
      return v !== null;
    });

  var inputZipCode = $S.zipCode.asEventStream("input")
    .map(function(event){
      return $(event.target).val();
    })
    .toProperty($S.zipCode.val()) // default value
    .filter(function(v){
      return v.length >= 2;
    });

  var ajaxZipCode = inputZipCode
    .combine(countryCode,function(zipCode,countryCode){
      console.log("combining", zipCode, countryCode);
      return {partialZipCode:zipCode,countryCode:countryCode};
    })
    .flatMap(function(info){
      return Bacon.fromPromise($.ajax(URL.zipCodes(info)));
    })
    .mapError("ERROR");

  var isErrorAjaxZipCode = ajaxZipCode
    .map(isError)
    .toProperty(false) // convertit en Property pour avoir une valeur initiale
    .skipDuplicates(); // si la Property vaut 2 fois false, inutile de cacher 2 fois le message d'erreur



  // --
  // -- side effects
  // --


  var showOrHideErrorMessage = function(show) {
    console.log("showOrHideErrorMessage", show);
    hideEverything();
    showOrHide(show, $(".error"));
  };

  isErrorAjaxCountries.onValue(showOrHideErrorMessage);

  var showOrHideSpinner = function(show) {
    showOrHide(show, $(".spinner"));
  };

  isOngoingAjaxCountries.onValue(showOrHideSpinner);

  var showOrHideInputCountry = function(show){
    showOrHide(show, $S.country);
  };

  var showOrHideHelpCountry = function(show){
    console.log("showOrHideHelpCountry", show);
    showOrHide(show, $S.countryHelp);
  };

  var showOrHideInputZipCode = function(show){
    console.log("showOrHideInputZipCode", show);
    showOrHide(show, $S.zipCode);
    if(show){
      $S.zipCode.focus();
    }
  };

  var hideOrShowInputZipCode = function(hide){
    showOrHideInputZipCode(!hide);
  };

  var showOrHideHelpZipCode = function(show){
    showOrHide(show, $S.zipCodeHelp);
  };

  var hideOrShowHelpZipCode = function(hide){
    showOrHideHelpZipCode(!hide);
  };

  isDoneAjaxCountries
    .onValue(function(done){

      console.log("doneAjaxContry", done);

      // once request is done, we can show country input
      showOrHideInputCountry(done);

    });

  var fillCountries = function(countries){
    for(var countryCode in countries){
      $("#countries").append('<option value="'+ countries[countryCode] +'"></option>');
    }
  };

  countriesList.onValue(fillCountries);

  isInvalidCountry
    .onValue(function(isInvalid){

      console.log("invalidContry",isInvalid);

      // if country is invalid, show the help message
      showOrHideHelpCountry(isInvalid);

      // if country is invalid, hide the zipcode input
      hideOrShowInputZipCode(isInvalid);

  });

  isErrorAjaxZipCode.onValue(showOrHideErrorMessage);

  console.log("*** End country definition ***");
});
