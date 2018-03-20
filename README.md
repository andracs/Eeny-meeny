# Eeny-meeny
App for picking random individuals from a photo, created by Computer Science students in Næstved, 2018. 

# Pseudokode
Vi prøver at få applikationen til at hænge ca. sådan sammen:

1. Viser HTML-forside [Eksempel](https://wireframepro.mockflow.com/view/eenymeeny)
2. Bruger uploader et billede fra sin smartphone og gemmes et sted, f.eks. en bucket [Eksempel...](http://code.hootsuite.com/html5/)
3. Billedet sendes til Googles API, som genkendender ansigter, og svarer med en JSON fil [Eksempel...](https://cloud.google.com/vision/)
4. Ansigter klippes ud baseret på koordinaterne i JSON-filen med [Croppie](https://github.com/Foliotek/Croppie)
5. Resultatside 1 - Der vises et enkelt ansigt, med teksten "The chosen"
6. Resultatside 2 - Der vises en ordered list med alle ansigter, men en checkbox ud for hver.
7. Alt delkode samles i meningsfuld arkitektur, og app'en publiceres på Google Cloud
8. App'en pakkes ned til iOS og Android apps med Phonegap
9. App'en publiceres på AppStore og Google Play.

# Prototype
See the prototype on this link https://wireframepro.mockflow.com/view/eenymeeny.

![Prototypen](https://raw.githubusercontent.com/andracs/Eeny-meeny/master/frontend-prototype/Screen-3_Enkelt_person.png)
