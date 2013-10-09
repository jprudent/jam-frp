(ns services.countries-test
  (:use clojure.test)
  (:require services.countries))


(deftest country
  (is (= "France" (:FRA services.countries/countries))))