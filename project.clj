(defproject jam_frp "0.0.1-SNAPSHOT"
  :description "A cool jam I do hope"
  :license "Do what the fuck you want"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [ring/ring-core "1.2.0"]
                 [ring/ring-jetty-adapter "1.2.0"]
                 [ring/ring-json "0.2.0"]]
  :plugins [[lein-ring "0.8.7"]]
  :ring {:handler services.core/app}
  :main services.core
  :aot [services.core])
