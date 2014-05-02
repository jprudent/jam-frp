$( document ).ready(function() {

  // --
  // -- Constantes (url, dom, ...)
  // --

  // Un objet qui aggrège les URLs
  var URL = {
      countries : '/countries'
  };

  // Des raccourcis pour séléctionner les éléments du DOM
  var $S = {
    country : $('input[name="country"]'),
    countryHelp : $("#help_country")
  }


  // --
  // -- Utilitaires
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

  // Tout est caché par défaut
  // les streams fourniront les évènements qui déclencheront l'affichage des différentes parties du DOM
  var hideEverything = function(){
    var hide = false;
    showOrHide(hide,$S.country);
    showOrHide(hide,$S.countryHelp);
  };

  hideEverything();


  // --
  // -- Définitions des event streams et properties
  // --

  /**
   * EventStream encapsulant la requête Ajax de récupération de la liste des pays.
   * Les valeurs possibles sont :
   * - "Error"
   * - la liste des pays
   */
  var ajaxCountries = Bacon.fromPromise($.ajax(URL.countries))
    .mapError("ERROR"); // en cas d'erreur, la valeur "ERROR" est produite

  /**
   * Property représentant l'échec ou le succès de la requête Ajax de récupération de la liste des pays.
   * Les valeurs possibles sont :
   * - true si l'appel ajax est en erreur
   * - false si l'appel ajax est OK
   */
  var isErrorAjaxCountries = ajaxCountries
    .map(isError)
    .toProperty(false) // convertit en Property pour avoir une valeur initiale
    .skipDuplicates(); // si la Property vaut 2 fois false, inutile de cacher 2 fois le message d'erreur

  /**
   * Property représentant l'état en cours de la requête Ajax de récupération de la liste des pays.
   * Les valeurs possibles sont :
   * - true si la requête est en cours
   * - false si la requête n'a pas commencée ou si elle est terminée
   */
  var isOngoingAjaxCountries = isErrorAjaxCountries.awaiting(ajaxCountries); // vaut true le temps que la liste des pays soit téléchargée

  /**
   * Property représentant l'état terminé de la requête Ajax de récupération de la liste des pays.
   * Les valeurs possibles sont :
   * - true si la requête est terminée avec succès
   * - false dans tous les autres cas
   */
  var isDoneAjaxCountries = ajaxCountries
    .map(not(isError))
    .toProperty(false) //
    .skipDuplicates();

  /**
   * EventStream représentant la liste des pays.
   * La seule valeur possible est la liste des pays.
   */
  var countriesList = ajaxCountries
    .filter(not(isError));


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

  isDoneAjaxCountries.onValue(function(done){

      console.log("doneAjaxContry", done);

      // once request is done, we can show country input
      showOrHideInputCountry(done);

  });

  var fillCountries = function(countries){
    $("#countries").empty();
    for(var countryCode in countries){
      $("#countries").append('<option value="'+ countries[countryCode] +'"></option>');
    }
  };

  countriesList.onValue(fillCountries);

});
