(ns base.file_parse)

(use 'incanter.core
     'incanter.io)

(defn printall
  "Prints all elements in sequence in order"
  [s]
  (if (not (empty? s))
    (do
      (println (str "Item: " (first s)))
      (recur (rest s)))))

(defn read_data
  [filename]
  (clojure.walk/keywordize-keys{(re-find #"data/[A-Za-z0-9]*" filename) 
                                (second (second (read-dataset filename :header :true)))}))

(def companies ["AAPL" "BP"])

;(defn read_multiple_data
;  [companies]
;  (loop [datasets []
;         comp companies]
;    (cond (empty? (rest comp))
;          (cons (read_data (str "data/" (first comp) ".csv")) datasets)
;          
;          :else
;          (recur (cons (read_data (str "data/" (first comp) ".csv")) datasets) (rest companies)))))

(defn read_multiple_data
  [companies]
 
  (loop [dat []
          comp companies]
     (if(empty? (rest comp))
       (reverse (cons (read_data (str "data/" (first comp) ".csv")) dat))
       (recur (cons (read_data (str "data/" (first comp) ".csv")) dat) (rest comp)))))




(defn extract2
  "Extracts only provided features from 1 dataset"
  [data property]
  (loop [result []
         data data
         property property]
    (cond (empty? (rest data))
          (reverse (cons (get (first data) property) result))
          :else
          (recur (cons (get (first data) property) result) (rest data) property))))




(defn extract_all2
  "Extracts provided features from sequence of datasets"
  [datasets property & properties]
  (let [sets []]
    (for [dataset datasets]
      (let [key (first (keys dataset))]
        {key (apply extract2 (get dataset key) property properties)}))))





(defn get_values_from_map2
  [map]
  "Takes map type of {:test2 ((17.22) ... (15.59))} and returns (17.22 ... 15.59)"
  (for [value (seq (first (vals map)))]
    value))


(defn get_vals2
  "Gets only vals vithout keys from multiple maps"
  [datas]
  (for[matrix datas]
    (get_values_from_map2 matrix)))


(defn args_to_list
  "Makes list from provided args"
  [& args]
  args)

(defn make_matrix_data 
  "Takes sequence of list of values. Makes list with pairs with first elements of lists"
  [values]
  (apply map args_to_list values))

(defn make_nmf
  [companies property]
  "Brings all together. Makes matrix for nmf factorization from list of companies and property."
  (make_matrix_data (get_vals2 (extract_all2 (read_multiple_data companies) property))))