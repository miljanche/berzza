;(ns models.model
;  (:use compojure.core)
;  (:use models.views)
;  (:require [compojure.core :refer :all]
;            [compojure.handler :as handler]
;            [compojure.route :as route]))
;
;
;(defroutes app-routes
;  (GET "/" [] (index)
;    (GET "/hello/:name" [name] (hello-page name))
;  (POST "/form2" {params :params} 
;        (str "POST id=" (params "title") " params=" params))
;  (route/not-found "<h1>Page not found<h1>"))
;
;
;
;(def app
;  (handler/site app-routes))