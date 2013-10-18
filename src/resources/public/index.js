var countryDefinitions = function() {

  console.log("*** Strarting country definitions ***")

  // Just an object to tidy up URLs
  var URL = {
      'countries' : 'http://localhost:3000/countries'
  };

  var $S = {
    country : $('input[name="country"]'),
    countryHelp : $("#help_country")
  }


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

  var inputCountry = $S.country.asEventStream("keyup")
    .map(function(event){
      return $(event.target).val();
    });

  var invalidCountry = inputCountry
    .combine(countriesList, function(input, countries){
      for(var countryCode in countries){
         if(input === countries[countryCode]) return false;
      }
      return true;
    });


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

  isErrorAjaxCountries.onValue(showOrHideErrorMessage);

  var showOrHideSpinner = function(show) {
    console.log("showSpinner = ", show)
    showOrHide(show, $(".spinner"));
  };

  isOngoingAjaxCountries.onValue(showOrHideSpinner);

  var showOrHideInputCountry = function(show){
     console.log("show country input", show);
    showOrHide(show, $S.country);
  }

  var showOrHideHelpCountry = function(show){
    console.log("invalidCountry",show);
    showOrHide(show, $S.countryHelp);
  }

  var doFn = function(f1,f2){
    return function(value){
      f1(value);
      f2(value);
    }
  }

  isDoneAjaxCountries
    .onValue(doFn(showOrHideInputCountry, showOrHideHelpCountry));

  var fillCountries = function(countries){
    for(var countryCode in countries){
      $("#countries").append('<option value="'+ countries[countryCode] +'"></option>');
    }
  };

  countriesList.onValue(fillCountries);

  invalidCountry.onValue(showOrHideHelpCountry);

  console.log("*** End country definition ***");
}

countryDefinitions();
