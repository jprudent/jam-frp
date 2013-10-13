1. téléchargement de la liste des pays. Si erreur appel, affichage du message d'erreur, sinon rien.
2. Ajout d'un spinner pendant le téléchargement
3. Choisir un pays
4. Quand erreur, on peut cliquer sur le message pour réessayer

Hi,

Say I've this EventStream  :
var ajaxCountries = Bacon.fromPromise($.ajax(URL.countries))

If I have an error in ajax call, I would like to "restart".

I know how to catch error with mapError. My point is to have another try with the ajax call without leaking memory.

If I do something like :

var ajaxCall = function(){
var ajaxCountries = Bacon.fromPromise($.ajax(URL.countries))
 .mapError("ERROR")
 .onValue(function(v){
   if(v === "ERROR") ajaxCall(); //retry
   else someSideEffect();
  });
}

This works as expected but I think this leaks memory. What's the proper way to implement this ? returning Baco.noMore ?

Thanks.
