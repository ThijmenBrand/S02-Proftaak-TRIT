const express = require('express');
const router = express.Router();
const articles = [{id: "be05ebb6-587c-409c-862c-f476c299aad0", tribeId: "e7588e32-d182-4e0c-914b-38cf5976b345", rockstarId: "b9fa9dde-981e-41b3-b09b-af1d57a5354d", title: "test123456", content: "<h1>HOi</h1><p>testkrirgjrigjgirjgirjigjrgiid vinfin</p><h4>sdfghjhgfdsdfghj</h4>", tribeName: "Vuejs", rockstarName: "Peter", viewCount: 10, publishDate: new Date() }];

router.use('/', (req, res) => {
    res.status(200),
    res.json(articles);
})
router.use('/:id', (req, res) => {
    res.status(200);
    res.json(articles[0]);
})
router.use('/GetArticlesByTribe/:id', (req, res) => {
    res.status(200);
    res.json(articles);
})
router.use('/GetArticlesByRockstar/:id', (req, res) => {
    res.status(200);
    res.json(articles);
})
router.use('/GetArticles/TribeId/:id/RockstarId/:Id', (req, res) => {
    res.status(200);
    res.json(articles[0]);
})

module.exports = router;