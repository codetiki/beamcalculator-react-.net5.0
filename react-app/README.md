# Beam Calculator App

## Frontkoodin runko

Koodin runko näkyy `app-structure.txt` tiedostossa.

Lähtötietojen syöttö ja tulokset eriytetty eri sivustolle. 
App.js sisältää vain Home.js. Home.js:ssä luodaan välilehdet.
Home.js sisällä on Beam (lähtötiedot) ja Result (tulokset) sivut.
Lähtötiedot sivu on eriytetty neljään toimintalohkoon: napit, palkin pituuden ja tukien syöttö, kuormitusten syöttö ja syötetyt lähtötiedot. 
Tulokset sivussa on napit, maksimitulokset, viivadiagrammi-lohkot.


### Kuvia Layout:sta ja laskennan kulku
![Kuva](./src/images/layout_lähtötiedot.png)
Syötä palkin pituus ja tukien sijainnit. 
Kuormien syötössä valitse ensin kuormatyyppi (forceType) alasvetovalikosta ja anna kuormituksen arvot. Syötetyt arvot näkyvät oikeassa laidassa. 
Kun olet syöttänyt kaikki lähtötiedot, mene Tulokset-välilehdelle.
![Kuva](./src/images/layout_tulokset.png)
Paina Laske tulos-nappia. Saat tulokseksi Taivutusmomentti- ja Leikkausvoimakäyrät (viivadiagrammi) ja niiden maksimiarvot. 
Jos haluat tallentaa nämä tietokantaan, mene uudelleen Lähtötiedot-välilehdelle ja paina Tallenna tulos-nappia. 
![Kuva](./src/images/layout_tallennetut_tulokset.png)
Tallennetut tulokset saat näkyviin painamalla Tulokset-välilehden Tallennetut Tulokset-nappia. Tallennetut tulokset näkyvät popup-sivuna.


## Ohjelmassa käytettyjä elementtejä
- React
- react-chartjs-2
- Hooks: useState, useEffect
- react-chartjs-2
- material-ui
- react-bootstrap

## Vinkkejä
`rfc` luodaan uusi functionaalinen komponenttipohja.

## Laskentaesimerkki
![Kuva](./src/images/exampleCase.png)
Kuvia Layout:sta ja laskennan kulku-kohdassa laskin tämän laskentatapauksen.

## Lisättäviä asioita
- Syötteiden tarkistus
- Syötteiden päivitys

Copyright © Timo Kivelä