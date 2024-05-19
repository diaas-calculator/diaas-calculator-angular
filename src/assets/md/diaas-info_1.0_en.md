# What is the DIAAS?

## In a nutshell

*DIAAS* or *Digestible Indispensable Amino Acid Score* is a measure, experimentally determined, that provides an estimation for a given food about how much of each indispensable *amino acid* (or AA) will be assimilated by a human subject if ingested compared to it's needs.

## Indispensable amino acids

Amino acids are basic elements contained in proteins. There are two kinds of amino acids

- Dispensable amino acids: those can be synthetized by the body
- Indispensable amino acids: we cannot synthesize them, they must be brought by the food. 

There are 9 indispensable amino acids:

- His: histidine
- Ile : isoleucine
- Leu: leucine
- Lys: lysine
- Saa : sulfur amino acids (or Met + Cys: methionine and cysteine)
- Aaa: aromatic amino acids (or Phe + Tyr: phenylalanine and tyrosine)
- Thr: threonine
- Trp: tryptophan
- Val: valine

## Digestibility

When computing the DIAAS, a factor is applied to the quantity of amino acid initially contained in the protein to take into account how much of the amino acid is actually digested and made available to the body.

This factor differ for each food item and each amino acid. It is determined experimentally.

## Human needs and reference pattern

The human needs were estimated based on three age groups: 

- *Infant*: 0 -> 6 month
- *Children*: 6 month -> 3 years
- *Older children, adolescents and adults* : > 3 years

For example, the needs for the Infants is based on the amino acid content of breast milk that is made available to the body after digestion.

## Scoring

### Scoring each amino acid

The score is a set of 9 numbers, one for each indispensable amino acid, such as a score of 100 means that the quantity of amino acid in the product equals the requirement for the age reference. This score for each amino acid is sometimes refered to as *DIAAR* : *Digestible Indispensable Amino Acid Ratio*

Thus, by definition the *DIAAR* of breast milk for Infants is 100 for every indispensable amino acid.

### Limiting amino acid

Out of the 9 numbers, we usually keep only the lowest number which is the *DIAAS* value of the product. The amino acid corresponding to this number is the limiting amino acid in the food item.

Only the lowest number is retained because the body needs all 9 indispensable amino acids to function and the lack of one can prevent some reactions to happen. However some bodily functions like muscle synthesis can benefit from a surplus of some amino acids (see discussions about *branched-chain amino acids*).

### Example

Score of each amino acid in quick oats for the *Older children, adolescents and adults* age reference pattern:

| his  | **iso** | **leu** | lys  | saa  | aaa  | thr  | trp  | **val** |
| ---- | ------- | ------- | ---- | ---- | ---- | ---- | ---- | ------- |
| 118  | 110     | 103     | 67   | 177  | 184  | 140  | 104  | 107     |

Lysine has the lowest score so the DIAAS value in this case is **67**.

The requirement for *Lysine* is 48mg/g of protein.

The lysine score for quick oats is 67 meaning that each gram of quick oats will provide an estimate of 32mg of lysine to the body after digestion (67% * 48 ).

# Mixing food items

Several studies have shown that it's possible to improve the DIAAS of a given food item by mixing it with another food item. Example: [DIAAS obtained from individual ingredients is additive in mixed meal](https://nutrition.ansci.illinois.edu/sites/nutrition.ansci.illinois.edu/files/2.%20Fanelli%20et%20al.%2C%20milk-break%20fast%20cereals%2C%20JN%2C%20Feb.%2010%2C%202021.pdf)

The resulting DIAAS for a mix of food items can be computed as the weighted average of each amino acid DIAAS value (the weighting factor being the content of protein per 100g of product)

# DIAAS variations and other measuring systems

## Chemical score

A first estimate can be done by looking at the content of each amino acid in the food item without taking into account the digestibility. It is used by many commercial products who advertise their product to be a "complete" protein. It can be far from reality as a digestibility of 50% is not uncommon meaning that you'd need to ingest twice the quantity of food to reach the desired amino acid inputs.

## PDCAAS

The *PDCAAS* or *Protein Digestibility Corrected Amino Acid Score* was adopted by the  US FDA and the Food and Agriculture Organization of the United Nations/World Health Organization (FAO/WHO) in 1993 :  [Recent developments in protein quality evaluation](https://www.fao.org/4/U5900t/u5900t07.htm)

It is taking into account the digestibility of each amino acid and comparing the quantity of amino acid made available to the body after digestion with a reference value for that amino acid, just like the DIAAS.

## DIAAS

The DIAAS was proposed by the Food and Agriculture Organization (FAO) in 2011: [Dietary protein quality evaluation in human nutrition](https://www.fao.org/ag/humannutrition/35978-02317b979a686a57aa4593304ffc17f06.pdf).

The differences with the PDCAAS are:

- the protocol for evaluating the PDCAAS involve experiments with rats which have a digesting system quite different from the humans. For the DIAAS,  the recommended animal model is the pig : *it is recommended that true ileal amino acid digestibility values from the growing pig be used, and where these data are not available from the growing laboratory rat.*
- The reference values for the PDCAAS are based on a unique age group, the 2- to 5-year-old child which is deemed to be the more demanding. The DIAAS provides values for three different age groups

- The PDCAAS uses the global faecal digestibility while the DIAAS considers the ileal digestibility of each amino acid (more info: [How to characterize protein quality?](https://www.prodiet-fluid.com/blog/how-to-characterize-protein-quality/))

Recently, a new method appeared to simplify the protocol of determination of DIAAS: it is an in vitro method based on the INFOGEST protocol. More info: 

- About the INFOGEST protocol: [INFOGEST static in vitro simulation of gastrointestinal food digestion](https://www.nature.com/articles/s41596-018-0119-1) (18 March 2019)
- [Comparing the in-vitro DIAAS values to the "regular" in-vivo DIAAS](https://www.sciencedirect.com/science/article/pii/S0308814622026826) (15 March 2023). Highlights:
  - *High correlation between in vitro and in vivo digestibility (r = 0.6, P < 0.0001)*
  - *Good agreement of in vitro DIAAR with in vivo values (r = 0.96, P < 0.0001)*
  - *In vitro protocol suited for protein quality assessment*

# Branched-chain amino acids 

Some amino acids are known to trigger an anabolic response, meaning that they induce muscle synthesis after resistance training. This is especially the case of **leucine**. And also to a lesser extent **isoleucine** and **valine**

Those amino acids are called the *branched-chain amino acids* or *BCAA* .

[This study for example](https://pubmed.ncbi.nlm.nih.gov/24284442/) showed that *a low-protein (6.25 g) mixed macronutrient beverage can be as effective as a high-protein dose (25 g) at stimulating increased MPS (myofibrillar protein synthesis) rates when supplemented with a high (5.0 g total leucine) amount of leucine* 

However it should be noted that BCAA alone are not enough to trigger the optimal response as concluded by [this meta-study](https://www.scielo.br/j/eins/a/cVqNfhpkCmzTcrLWRVrVtVv/)  : *Existing evidence suggests BCAA stimulate muscle protein synthesis following resistance physical exercise. However, in the absence of other essential amino acids, BCAA are not able to sustain maximal synthesis responses*.

To sum up, we can say that **muscle synthesis requires a sufficient amount of all the indispensable amino acid to be optimal, but can also benefit from higher levels of *BCAA* compared to the other indispensable amino acids.**

# Limitations and precautions

The *DIAAS* is never an exact value as many factors may impact the result.

- Parameters that are out of our control

  - Difference between the pig digestive system and the human digestive system

  - Difference between each individual digestive system which can vary depending on our genes and our eating habits
  
  - Difference between products (varietal difference of the crops/ breed)


- Parameters that we can control
  - Preparation of the food:
    - Is it crude, cooked or baked? (cooking/baking can greatly improve or lower the *DIAAS* depending on the product)
      - Is it soaked, or germinated before cooking? (often improves the *DIAAS*)
      - Is is extruded?
      - Did it go through a specific processing that our food doesn't usually go through?


Unfortunately many studies 

- don't describe enough the food preparation 
- or use a very specific preparation instead of using the food as we usually eat it (use of unfatted food, use of protein extraction processes...)
- or study a crude food for a product that we only consume cooked

