(ns services.cities-test
  (:use clojure.test)
  (:require [services.cities :as cities]))


(deftest test-cities-by-zipcode
  (is (= '(["21000" "DIJON" "21231"]) (cities/cities-by-zipcode "FRA" "21000"))))