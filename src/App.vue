<template>
<div class="desktop">
<p>Veuillez consulter ce site sur un téléphone compatible (tactile, avec caméra
 et capteur d'orientation).
<br>Autrement vous ne pourrez pas utiliser toutes les fonctionnalités.</p>
</div>
<div class="buttons">
<button onclick="getStream()">VIDÉO</button>
<button onclick="takePhoto()">REMPLACER L'IMAGE</button>
</div>
<div class="video">
<video height=100 autoplay style="display: none;"></video>
</div>
<div class="container">
<img class="character" src="../public/img/character.svg" alt="Personnage" height=400 />
</div>
</template>

<style>
* {
user-select: none;
}

body {
display: flex;
flex-direction: column;
padding: 0;
margin: 0;
width: 100%;
height: 100%;
}

.desktop {
display: none;
}

.desktop > p {
color: #ffffff;
text-align: center;
margin: 0;
padding: 20px;
font-size: 20px;
font-weight: bold;
animation: background 3s linear infinite;
}

@media (min-width: 500px) {
.desktop {
display: block;
}
}

.buttons {
display: flex;
flex-direction: row;
justify-content: space-evenly;
}
.buttons > button {
margin: 20px 0 20px 0;
padding: 10px;
font-size: 20px;
font-weight: bold;
background: #888;
border: none;
filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
}

.buttons > button:hover {
background: #BBB;
}

.buttons > button:active {
background: #EEE;
}

.video {
display: flex;
flex-direction: row;
justify-content: space-evenly;
}

.video > video {
margin: 0 0 20px 0;
filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
}

.container {
display: flex;
position: relative;
justify-content: center;
align-items: center;
margin: 0;
padding: 0;
width: 100%;
height: 100%;
background: #333;
animation: shadow 1s linear infinite;
}

.character {
filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
border-radius: 20px;
}

@keyframes background {
0% { background: #800f00; }
50% { background: #806200; }
100% { background: #800f00; }
}

@keyframes shadow {
0% { box-shadow: inset 0 0 20px 20px #444; }
50% { box-shadow: inset 0 0 60px 20px #444; }
100% { box-shadow: inset 0 0 20px 20px #444; }
}
</style>
