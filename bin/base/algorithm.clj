(ns base.algorithm
  (:use [incanter.core]))


(defn defcost "Cost function - for differences in two matrices"
  [A B]
  (sum (map sum (pow (minus A B) 2))))

;(defn defcost "Cost function - for differences in two matrices"
;  [A B]
; (pow (minus A B) 2))


;(defn make_matrices [D H W loop_num]
;  "Creates matrices with features"
;  (loop [i 0
;         D D
;         H H
;         W W]
;    
;    (cond 
;      (or 
;      (= (defcost D (mmult W H)) 0.0)
;    
;      (= i loop_num))
;      [H W (defcost D (mmult W H)) i]
;      :else
;      
;      (let [Hn (mmult (trans W) D)
;            Hd (mmult (trans W) W H)
;            Hx (div (mult H Hn) Hd)
;            Wn (mmult D (trans Hx))
;            Wd (mmult W Hx (trans Hx))
;            Wx (div (mult W Wn) Wd)]
;        
;        (recur (+ i 1) D Hx Wx)))))


(defn nmf-core [D H W iterations]
  "Creates matrices with features"
  (let [wh (mmult W H)
        cost (defcost D (mmult W H))
        next_iter (- iterations 1)]
;    (prn cost)    
    (cond 
      (or (= cost 0.0) (> 0 iterations))
      [H W cost iterations]
      :else      
      (let 
        [Hn (mmult (trans W) D)
         Hd (mmult (trans W) W H)
         Hx (div (mult H Hn) Hd)
         Wn (mmult D (trans Hx))
         Wd (mmult W Hx (trans Hx))
         Wx (div (mult W Wn) Wd)]
        (recur D Hx Wx next_iter)))))


(defn random_matrix 
  "Creates matrix of random values, dimensions: rows x columns"
  ([rows columns]
    (matrix (take (* rows columns) (repeatedly #(rand))) columns))
  ([rows columns margin] 
    (matrix (take (* rows columns) (repeatedly #(rand margin))) columns)))



(defn nmf 
  [D num_features loop_num]
  "Performs NMF algorithm to provided matrix. Number of features and max number of iterations is user provided"
  (let [H (random_matrix num_features (ncol D))
        W (random_matrix (nrow D) num_features)]
    (nmf-core D H W loop_num)))


;(defn launch_opt [D num_features loop_num]
;  (let [max (opt_max D)
;        H (make_random_matrix num_features (ncol D) max)
;        W (make_random_matrix (nrow D) num_features max)]
;    (make_matrices2 D H W loop_num)))



;(defn avg
;  "Calculate average of matrix values"
;  [M]
;  (/(sum (map sum  M )) (*(nrow M)(ncol M))))
;
;(defn opt_max "Optimised max for random matrix"
;  [M]
;  (/ (avg M) (/(+(nrow M)(ncol M)) 2)))

;(defn make_eq  "Creates matrix of random values, dimensions: rows x columns"
;  ([rows columns]
;    (matrix (take (* rows columns) (repeatedly #(+(rand-int 1) 1))) columns))
;  ([rows columns margin] 
;  (matrix (take (* rows columns) (repeatedly #(rand margin))) columns)))


;
;
;(defn launch2 [D num_features loop_num]
;  (let [H (make_random_matrix num_features (ncol D))
;        W (make_random_matrix (nrow D) num_features)]
;    (multiplicative-update D H W loop_num))
;  )
;
;
;
;
;
;
;
;
;(defn multiplicative-update
;
;  [V H W iterations]
;  (prn W)
;  (prn H)
;  (let [synthetic-V (mmult W H)
;        cost (defcost V synthetic-V)
;        next-iter (- iterations 1)]
;        (prn cost)
;    
;    (if (or (= cost 0) (< iterations 0))
;      (list H W)
;      (let [
;            transposed-W (trans W)
;            hn (mmult transposed-W V)
;            hd (mmult transposed-W W H)
;            new-H (div (mult H hn) hd)
;            transposed-H (trans new-H)
;            wn (mmult V transposed-H)
;            wd (mmult W new-H transposed-H)
;            new-W (div (mult W wn) wd)]
;        (recur V new-H new-W next-iter)))))
;
;
;
;
;




;(def T (matrix [[1 2 8][5 3 4]]))

;(def resul (make_matrices T (make_random_matrix 3 3)
;                          (make_random_matrix 3 3) 10))

;(defn make_matrices [D H W loop_num]
;  "Creates matrices with features"
;  (loop [i 0
;         D D
;         H H
;         W W]
;    
;    (cond 
;      (= (defcost D (mmult W H)) 0.0)
;      [H W (defcost D (mmult W H)) i]
;      (= i loop_num)
;      [H W (defcost D (mmult W H)) i]
;      :else
;      
;      (let [Hn (mmult (trans W) D)
;            Hd (mmult (trans W) W H)
;            Wn (mmult D (trans H))
;            Wd (mmult W H (trans H))
;            Hx (div (mult H Hn) Hd)
;            Wx (div (mult W Wn) Wd)]
;        
;        (recur (+ i 1) D Hx Wx)))))