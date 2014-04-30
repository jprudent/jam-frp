(ns services.core
  (:require services.countries services.cities [ring.adapter.jetty :as jetty]))

;;todo cleanup use
(use 'ring.middleware.json
  'ring.util.response
  'ring.middleware.resource
  'ring.middleware.file-info)

(def api-documentation "Are you lost?
/countries                                  - récupérer la liste de tous les pays
/countries/$country/cities/$partial-zipcode - recherche des villes par code postal partiel pour un pays donné
/any-file                                   - télécharger un des fichiers du répertoire resources/public")

(defn- err-404 [message]
  {:status 404
   :body (str "Page not found\n" message)})

(def err-500
  {:status 500
   :body "ca faisait longtemps que tu n'avais pas eu d'erreur 500, ne t'inquiete pas, on ne t'a pas oublie :)"})

(defn- should-fail? [] (= 0 (rand-int 4)))

(def router
  "associate a function matcher for a uri with a function that takes the uri as parameter"
  [[(partial = "/countries")
    (fn [_] services.countries/countries)]

   [(partial re-matches #"/countries/.+/cities/\d+")
    (fn [uri] (let [[_,country-code,zipcode] (re-matches #"/countries/(.+)/cities/(\d+)" uri)]
                (services.cities/cities-by-zipcode country-code zipcode)))]])

(defn- route
  "Given a uri return a result"
  [uri]
  (if-let [mapping (first (filter #((% 0) uri) router))]
    (response ((mapping 1) uri))
    (err-404 api-documentation)))


(defn app-handler [request]
  (let [uri (:uri request)]
    (java.lang.Thread/sleep 500) ;lag on purpose, to see spiners on GUI
    (if (should-fail?) err-500 ; random failure, shit happens!
      (route uri))))

(def app (-> app-handler
           wrap-json-response
           (wrap-resource "resources/public")
           (wrap-file-info)))

(defn -main [port]
  (jetty/run-jetty app {:port (Integer. port) :join? false}))
