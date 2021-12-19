## Projet Web
## balance.me

# Introduction

Ce projet s'articule autour d'une démonstration de fonctionalités web modernes intégrées dans une page web sous le framework Vue.Js.
Il a été conçu pour les téléphone munis d'un écran tactile, d'une caméra et d'un système Android ou iOS.

Il s'agit d'une page permettant de déplacer un personnage sur l'écran dans une zone.
Un bouton ***VIDEO*** permet d'activer la caméra et de l'afficher sur l'écran. Un bouton ***CHANGER L'IMAGE*** permet alors de remplacer le personnage par l'image affichée actuellement par la caméra.

Le personnage réagit à l'inclinaison du téléphone. Si il touche un bord de l'écran, il émet un son et une notification.

# Fonctionnalités abandonnées

- La prise de photo devait remplacer seulement la tête du personnage, pas le personnage tout entier.
Mais faire appliquer le script à un seul élément nécessitait d'imbriquer une image dans une autre en HTML.
- Secouer le personnage avec le téléphone a été remplacé par la simple inclinaison de ce dernier pour des raisons de simplicité.
- La captation de luminosité ambiante n'est pas suffisamment compatible pour avoir été utilisée ici.

# Difficultés rencontrées

- L'intégration Vue.Js a été difficile en raison d'erreurs d'intentations, de compilation, de JavaScript fonctionnel en dehors de VueJs, mais contenant plusieurs centaines d'erreurs une fois intégré dans le framework, de programme absent du ***PATH*** à certains moments...
- La favicon du site s'est avérée impossible à changer. Vue.Js remplace systématiquement celle importée par l'icône par défaut du framework.
- Les sons ne peuvent pas être joués tant que l'utilisateur n'a pas intéragi avec la page, il s'agit d'une limitation volontaire de Chromium.
- Les notifications nécessitaient un service worker pour fonctionner. VueJs en fournit un en build mais il a fallu attendre son intégration durant le développement du projet.
