(ns representation.models.finance
  (:use [base.file_fetch :as fetfch]
        [base.file_parse :as par]
        [base.algorithm :as alg]
        [incanter.core :as incanter]))

(defn predicate
  [elem]
  "Predicate function for separation of companies."
  (let [char (str (first elem))]
    (or (number? char) (= char (clojure.string/lower-case char)))))

(defn get-companies
  [subtmited-data]
  "Separates companies from submited data"
  (let [comps (remove predicate (vals subtmited-data))]
;    (def companies_names comps)
    comps))

;(def params {:features "2" :XOM "XOM" :BP "BP" :EXPE "EXPE"  :endDay "12", :interval "w", :AAPL "AAPL", :startDay "20", :startMonth "10", :startYear "2010", :endMonth "9", :endYear "2013"})

(defn download_data
  "Downloads all requested .csv files"
  [params]
  (let [startDay (read-string (get params :startDay))
        startMonth (read-string (get params :startMonth))
        startYear (get params :startYear)
        endDay (get params :endDay)
        endMonth (read-string (get params :endMonth))
        endYear (get params :endYear)
        interval (get params :interval)
        companies (vec (get-companies params))]
    (prn (fetfch/fetch_data companies startDay startMonth startYear endDay endMonth endYear interval))))

(defn makemap
  [params]
  ())

(defn perform_nmf
  "Takes user submited parameters, downloads files, and then performs nmf. Return map:
  {:companies -> list of companies abbreviations
  :date -> list of date values for each set of data
  :result -> list of result of nmf. Elements: (H,W,diffcost,end_iteration)
  }"
  [params]
  (do (download_data params))
  (let [comps (vec (get-companies params))]
  (prn (str "PAR"params))
;    (try-times 30 (download_data params))

    {:companies comps
      :date (par/extract2 (first (vals (read_data 
                                        (str "data/" (first comps) ".csv")))) :Date)
      :result (alg/nmf (incanter/matrix (par/make_nmf comps :Volume)) (read-string (get params :features)) 150 )}
    ))

(defn sortH
  "Returns sorted values for nth feature"
  [nmf_result feature]
  (reverse (sort-by second (map (fn [a b] [a b])
                                (get nmf_result :companies)
                                (nth (first (get nmf_result :result)) (- feature 1))))))

(defn sortW
  "Returns sorted dates for nth feature"
  [nmf_result feature]
  (reverse (sort-by second (map (fn [a b] [a b])
                                (get nmf_result :date)
                                (nth (trans (second (get nmf_result :result))) (- feature 1))))))


(defn get-feature-data
  "Get all data that corresponds to feature"
  [data num]
  (let [sorH (representation.models.finance/sortH data num)
        sorW (representation.models.finance/sortW data num)]
    [
     ;create string separated by commas so JS can parse it later
      (clojure.string/join 
     (interpose "," (vec (map first sorH))))
      (clojure.string/join 
     (interpose "," (vec (map second sorH))))
      (clojure.string/join 
     (interpose "," (vec (map first sorW))))
      (clojure.string/join 
     (interpose "," (vec (map second sorW))))]))

(defn get-all-feature-data
  "Returns all features data"
  [data]
  (loop [index (count (first (get data :result)))
       seq []]
  (cond (= index 1)
        (cons (representation.models.finance/get-feature-data data index) seq)
        :else
        (recur (- index 1) (cons (representation.models.finance/get-feature-data data index) seq)))))





