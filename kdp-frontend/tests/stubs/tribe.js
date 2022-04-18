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

module.exports = router;