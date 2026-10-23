# Dashboard Jeudi Oui !

Tableau de bord mensuel de l'offre « Jeudi Oui ! » (ventes billetterie et campagnes emailing).

En ligne : https://radiofrance-dmd.github.io/radiofranceconcerts/dashboard-jeudi-oui/

## Contenu

- `index.html` : la page (charte de la newsletter Jeudi Oui !).
- `dash-shim.js` : chargement des CSV et gestion du choix d'édition.
- `data/` : un CSV par jeu de données (éditions, emailing, concerts, profils, catégories de places). Données agrégées, sans données personnelles.
- `fonts/` : Fira Sans et Castoro (licence SIL Open Font).
- `d3.min.js` : bibliothèque de graphiques d3 v7.9.0 (licence ISC, voir `d3-LICENSE.txt`).

## Ouvrir en local

Lancer `python3 -m http.server` dans ce dossier puis ouvrir http://localhost:8000. Un double-clic sur `index.html` ne suffit pas : le navigateur bloque la lecture des CSV.

## Mise à jour mensuelle

Après chaque édition, remplacer les cinq CSV de `data/` par ceux régénérés à partir de l'export Secutix « Liste des inscrits » et de l'export emailing.
