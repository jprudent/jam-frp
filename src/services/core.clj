(ns services.core
  (:require services.countries))

;;todo cleanup use
(use 'ring.middleware.json
     'ring.util.response
     'ring.middleware.resource
     'ring.middleware.file-info)

(def api-documentation "API documentation :
/countries - récupérer la liste de tous les pays
/any-file  - télécharger un des fichiers du répertoire resources/public")

(defn- err-404 [message]
  {:status 404
   :body (str "Page not found\n" message)})

(def err-500
  {:status 500
   :body "ca faisait longtemps que tu n'avais pas eu d'erreur 500,
   ne t'inquiete pas, on ne t'a pas oublie :)"})

(defn- should-fail? [] (= 0 (rand-int 4)))

(defn app-handler [request]
  (cond
    (should-fail?) err-500 ; random failure, shit happens!
    (= "/countries" (:uri request)) (response services.countries/countries)
    :else (err-404 api-documentation)))

(def app (-> app-handler
             wrap-json-response
             (wrap-resource "resources/public")
             (wrap-file-info)))
