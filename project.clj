(defproject Berza "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
;  :plugins [[lein-ring "0.8.8"]]
;  :ring {:handler models.model/app-routes}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [ring/ring-jetty-adapter "1.2.1"]
                 [incanter "1.5.4"]
                 [compojure "1.1.8"]
                 [clj-http "0.9.2"]
                 [hiccup-bridge "1.0.0-SNAPSHOT"]
                 [hiccup "1.0.5"]])
