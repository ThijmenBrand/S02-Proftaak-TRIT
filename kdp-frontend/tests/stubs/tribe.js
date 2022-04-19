const express = require('express');
const router = express.Router();
const tribes = [
   {id: "53c61e76-3ca8-41b2-a187-5223fccf842b", name: "Javascript"},
   {id: "5d805d6a-7b04-4f23-a5d5-f294d9845624", name: "ASP.net"},
   {id: "6733ab63-ce40-4c64-9413-2316a6cce084", name: "VueJS"},
   {id: "9a0986b2-9c30-4888-9970-54092a033e22", name: "c#"},
   {id: "1fe5a96f-4bb6-48cc-916d-7c45fd0cccd8", name: "Java"},
];
router.get('/', function(req, res){
   res.status(200); 
   res.json(tribes);
 });
router.get('/:id', (req, res) => {
   res.status(200);
   res.json(tribes[0]);
})
router.get('/GetAllRockstars/:id', (req, res) => {
   res.status(200);
   res.json([
      {id: "b9fa9dde-981e-41b3-b09b-af1d57a5354d", name: "Frank peters", image: "5419370.webp", description: "Frank is een echte fanaat", role: "Rockstar", linkedIn: "https://www.linkedin.com/login/nl?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin", twitter: "https://www.bing.com/search?q=twitter&cvid=b07b0826f6ee49c38ba6236c519cfb7f&aqs=edge..69i57j0l8.743j0j9&FORM=ANAB01&PC=U531"},
      {id: "f6fb6153-e728-4a93-929d-6adf61c1c5b1", name: "Peter", image: "ey-dr-frank-de-jonghe-meta.jpg", description: "Peter de schoen vreter", role: "Special agent", linkedIn: "https://www.linkedin.com/login/nl?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin", phone: "0640018231"},
  ]);
})
router.get('/spotify/:id', (req, res) => {
   res.status(200);
   res.json([{Id: "6ec82e78-3242-4c97-bed5-cd48af48dc93", tribeId: tribes[0].Id, SpotifyLink: "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/episode/5PHhZ2o37EokyGeqReThwD?utm_source=generator&t=0' width='100%' height='232' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'></iframe>"}]);
})
router.get('/:id/spotify', (req, res) => {
   res.status(200);
   res.json([{Id: "6ec82e78-3242-4c97-bed5-cd48af48dc93", tribeId: tribes[0].Id, SpotifyLink: "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/episode/5PHhZ2o37EokyGeqReThwD?utm_source=generator&t=0' width='100%' height='232' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'></iframe>"}]);
})

module.exports = router;