(ns services.cities
  (:require [clojure.java.io :as io]))

(defn cities-all
  "result in a sequence of cities.
  each city is a vector like [\"21000\",\"DIJON\",\"21131\"]"
  [country-code]
  (let [cities-filename (str "src/resources/zipcode/" country-code)
        not-nil (fn [lines] (filter #(not (nil? %)) lines))
        rest #(if (nil? %) % (subvec % 1))
        tuple-cities (fn [only-cities-lines] (map #(rest (re-matches #"^(\d*),(.*),(\d*)$" %)) only-cities-lines))]
    (with-open [rdr (io/reader cities-filename)]
      (-> (line-seq rdr)
        doall ; force evaluation of the lazy seq. Otherwise file would close at the end of the function and consumer would have access error on 2nd element of the seq
        tuple-cities
        not-nil))))

(defn cities-by-zipcode
  "a seq of french cities where zipcode starts with partial-zipcode"
  [country-code partial-zipcode]
  (filter #(.startsWith (% 0) partial-zipcode) (cities-all country-code)))
