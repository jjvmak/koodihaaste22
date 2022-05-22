# Solidabis koodihaaste 2022

Tehtävänäsi on toteuttaa lounaspaikkaäänestyssovelluksen frontend valmista APIa vasten (työkalut saat valita itse).
Arvosteluperusteet tärkeysjärjestyksessä:

1.  Ratkaisun oikeellisuus
    1. ravintoloiden haku paikkakuntakohtaisesti
    2. äänen antaminen, muuttaminen ja poistaminen
    3. äänestystulosten esittäminen reaaliajassa
2.  Testit
3.  Ratkaisun selkeys ja yksinkertaisuus
4.  Käyttöliittymäratkaisut

Tässä repositoryssä on valmis Spring Bootilla toteutettu backend, joka toteuttaa lounaspaikkojen
haku- ja äänestyslogiikan käyttäen Lounaat.info -palvelua.

Backendin ajamiseen tarvitset JDK:n (versio>=11) ja/tai Dockerin asennettuna työasemallesi.

Backendin käynnistys:

    ./gradlew bootRun

tai Dockerilla:

    docker run -p 8080:8080 solidabis/koodihaaste22:latest

Tutustu API-dokumentaatioon http://localhost:8080/swagger-ui.html

Päivä/selainkohtainen äänioikeus on toteutettu HTTP-only -cookiella.

# Palautus

_Forkkaa tästä repositorystä oma julkinen ratkaisureposi_ ja lähetä linkki 31.5.2022 mennessä sähköpostilla osoitteeseen
koodihaaste@solidabis.com. Muokkaa README.md -tiedostoa siten, että siitä ilmenee vastauksen
tarkastelua helpottavat tiedot, kuten käyttämäsi teknologiat ja muutaman lauseen kuvaus tekemistäsi
ratkaisuista. Voit myös julkaista ratkaisusi esim. Herokuun, muista liittää linkki ja mahdolliset salasanat sähköpostiin!

Backendin muuttaminen esim. autentikoinnin toteuttamiseksi on sallittua.

Kerro samalla haluatko osallistua vain kilpailuun ja arvontaan, vai haluatko Solidabiksen
ottavan yhteyttä myös työtarjouksiin liittyen. Se ei tarkoita, että sinulle lähetettäisiin roskapostia, vaan nimensä
mukaisesti esimerkiksi kutsu työhaastatteluun. Voit halutessasi
osallistua koodihasteeseen myös ilman, että haluat ottaa palkintoa
vastaan tai osallistua arvontaan.

# Ratkaisu

Tehtävänannon kannalta kaikki mielenkiintoinen löytyy hakemistosta front/

Käyttöliittymä on toteuttu Angular (ver. 12) frameworkin avulla. Yksikkötestien tekemiseen on hyödynnetty Jasmine frameworkkia, sekä Karma test runneria. Lisäksi ratkaisu sisältää muutaman hyvin yksinkertaisen integraatiotestin, jotka ovat toteuttu käyttäen Cypress frameworkkia.

Sovellukseen on toteutettu hyvin kevyt "autentikointi", jossa käyttäjän istunnon tiedot tallennetaan selaimen local storageen. Tämä riittää ns. demoamistarkoituksiin tehtävänannon kontekstissa. Tätä varten backend-koodia on jouduttu hieman muokkaamaan. Kts. VotingController.java identity().

Ratkaisun toteutuksessa haettiin reaktiivista käyttöliittymää, jossa käyttäjän ei tarvitse erikseen painella esim. "hae" painikkeita, vaan tekstikenttiin voidaan syöttää tekstiä, joka käynnistää taustalla haun. Reaktiivisuus on toteuttu pääosin RxJs kirjaston ja Angularin sisäänrakennettujen ominaisuuksien avulla.

Käyttöliittymäkomponentit ovat toteutettu käyttäen Angular Material komponenttikirjastoa.

## Riippuvuudet

- JDK (versio>=11) (testattu 11)
- Node 16.x.x (testattu 16.15.0)
- Angular CLI 12.x.x (testattu 12.2.2)

## Sovelluksen ajaminen

1. Kloonaa repository
2. Käynnistä backend
3. Avaa front/ hakemisto komentokehotteessa
4. Aja komento `npm install`
5. Aja komento `npm run start`
6. Navigoi osoitteeseen `http://localhost:4200/`

## Yksikkötestien ajaminen

1. Avaa front/ hakemisto komentokehotteessa
2. Aja komento `npm run test`

## Integraatiotestien ajaminen

1. Käynnistä backend
2. Avaa front/ hakemisto komentokehotteessa
3. Aja komento `npm run start`
4. Aja komento `npm run cypress:run`
