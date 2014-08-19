;(ns models.views
;  (:use hiccup.core)
;  (:use hiccup.form))
;
;(defn hello-page [name] (html 
;                        
;                          [:form {:method "post", :action "/form2"}
;                          [:h1 (str "Hello world " name)]
;                              [:label {:name "ime"} "Ime "]
;                               [:input {:type "text", :name "title", :id "title", :value "f"}]
;                               [:input {:type "submit" :name "submit" :value "submit"} ]
;                               ]))
;
;(defn forma [par] (html 
;                        
;                         
;                          [:h1 (str "Heldcddfslo" (first par))]
;                             ))
;
;(defn index []
;  (html
;    [:p "Text"]))
;
;(defn podaci [data] (html 
;                          [:h1 (str "Hello world " (get data :title))]
;                            ))
;
;
;
