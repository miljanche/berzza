movies
======

#Use example

After the launching the project and clicking on *Find patterns!*, input form is shown:

![Picture 1 - Input form](docs/images/input form.png)
Picture 1 - Input form

Here, we have to choose *Start date*, *End date*, *Interval* and *Number of features*. Then, we select companies whose trading stocks we want to explore. Interval can be:

* *d* - Day
* *w* - Week
* *m* - Month


In this example, we chose following parameters:

* **Start date** - April 10th, 2007.
* **End date** - October 16th, 2012.
* **Interval** - d (Days)
* **Number of features** - 7
* **Companies:**
  * *Oil and gas:* Exxon Mobil, Sinopec Shangai, British Petroleum, Petrobras
  * *It and electronics:* LG, Canon, Philips, Intel, AMD
  * *Automotive:* Volkswagen, Toyota, General Motors, Ford Motor
  * *Food:* PepsiCo, Coca-cola, McDonald's
  * *Banks and finance:* HSBC Holdings, JPMorgan Chase, Barclays, Deutche Bank, Citigroup, Wells Fargo, Bank of America

#####Now, we shall interpret some of features we got!

![Picture 2 - Input form - example](docs/images/example params.png)
Picture 2 - Input form - example

   
##Results:

![Picture 3 - Feature 0-1](docs/images/result feature 0-1.png)
Picture 3 - Feature 0-1

####Feature 0:

On March 13th, 2012. Federal Reserve announced annual report in which, Bank of America passed, so-called “stress-test”. After that, price of their stocks started increasing (that’s why March 16th is important), and on March 19th, stock topped $10, first time after August 2011.

![Picture 3 - Feature 2-3](docs/images/result feature 2-3.png)
Picture 3 - Feature 2-3

####Feature 2:

*Eventually by December 2010, Citigroup repaid the emergency aid in full and the US government received an additional $12 billion profit in selling its shares* - Wikipedia.

Citigroup and Bank of America were both heavily supported by US Government in period after beginning of economic crisis (in 2009), by reducing its share - in Citigroup for $21 billion and in Bank of America $21 billion. Recovery of Citigroup obviously boosted trust in Bank of America.

###Feature 3

On 10. May 2012. JPMorgan disclosed significant loss of $2 billion since start of April. After that, they even started internal investigation.

After the crisis, JP Morgan Chase emerged as greatest USA bank. Seems that this report shook all financial sector, because, as we can see, this feature is significant for Bank of America, JP Morgan Chase, Wells and Fargo and Citigroup.

![Picture 4 - Feature 4-5](docs/images/result feature 4-5.png)
Picture 4 - Feature 4-5

![Picture 3 - Feature 6](docs/images/result feature 6.png)
Picture 3 - Feature 6

####Feature 6

Ford motors posted on 28. January 2011. its  greatest annual income since 1999.
General Motors launched largest U.S. Initial public offering of 2010 on NYSE (and one of the largest in history).
