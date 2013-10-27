(function() {

  console.log("*** Strarting country definitions ***")

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
      console.log("filter",v)
      return v.length >= 2;
    })
    .combine(countryCode,function(zipCode,countryCode){
      return {partialZipCode:zipCode,countryCode:countryCode};
    })
    .flatMap(function(info){
      Bacon.fromPromise($.ajax(URL.zipCodes(info)));
    })
    .mapError("ERROR");

  inputZipCode.onValue(function(v){console.log("baeinga", v)})



  // --
  // -- side effects
  // --

  var showOrHide = function(show, selector){
    if(show) selector.show();
    else selector.hide();
  };

  var showOrHideErrorMessage = function(show) {
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

  // take a variable number of one arg functions and construct a one arg function that calls all those functions
  // used to bulk function in one
  var doFn = function(){
    var fns = arguments;
    return function(value){
      for(var i = 0; i<fns.length; i++){
        fns[i](value);
      }
    }
  };

  isDoneAjaxCountries
    .onValue(doFn(showOrHideInputCountry, showOrHideHelpCountry,
                  showOrHideInputZipCode, showOrHideHelpZipCode));

  var fillCountries = function(countries){
    for(var countryCode in countries){
      $("#countries").append('<option value="'+ countries[countryCode] +'"></option>');
    }
  };

  countriesList.onValue(fillCountries);

  isInvalidCountry.onValue(doFn(showOrHideHelpCountry,
                                hideOrShowInputZipCode,
                                hideOrShowHelpZipCode));

  countryCode.onValue(function(v){console.log("got a coutry code", v)})

  console.log("*** End country definition ***");
})();
