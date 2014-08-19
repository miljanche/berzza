(ns base.file_fetch
  (:require [clj-http.client :as client])
  (:require [clojure.java.io :as io]))

;(def test-file
;  (client/get "http://www.blic.rs/data/images/2014-07-14/493964_0203preview_ff.jpg" {:as :byte-array}))
;
;(defn write-file []
;   (with-open [w (java.io.BufferedOutputStream. (java.io.FileOutputStream. "tfile.jpg"))]
;     (.write w (:body test-file))))
;
;(defn write-file []
;   (with-open [w (clojure.java.io/output-stream "tesfile.jpg")]
;     (.write w (:body test-file))))

;(def companiesd ["AAPL" "YHOO"])

(defn download_file [uri file]
  (with-open [in (io/input-stream uri)
              out (io/output-stream file)]
    (io/copy in out)))

(defn make_uri
  "Creates uri of csv file"
  [company, day1, month1, year1, day2, month2, year2, period]
  (prn (str "Download: " company ".csv ..."))
  (str "http://ichart.yahoo.com/table.csv?s=" company "&a="
       (- month1 1) "&b=" day1 "&c=" year1 "&d="
       (- month2 1) "&e=" day2 "&f=" year2 "&g=" period "&ignore=.csv"))


(defn fetch_data
  "Downloads files for all companies"
  [companies day1, month1, year1, day2, month2, year2, period]
  (for [comp companies]
    (do (prn (str "company " comp))
    (download_file (make_uri comp day1, month1, year1, day2, month2, year2, period)
           (str "data/" comp ".csv")))))


(defmacro try-times
  "Executes body. If an exception is thrown, will retry. At most n retries
  are done. If still some exception is thrown it is bubbled upwards in
  the call chain."
  [n & body]
  `(try-times* ~n (fn [] ~@body)))


(defn try-times*
  "Executes thunk. If an exception is thrown, will retry. At most n retries
  are done. If still some exception is thrown it is bubbled upwards in
  the call chain."
  [n thunk]
  (loop [n n]
    (prn n)
    (if-let [result (try
                      [(thunk)]
                      (catch Exception e
                        (when (zero? n)
                          (throw e))))]
      (result 0)
      (recur (dec n)))))

