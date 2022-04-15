function allTribes(req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.json([{ id: "73bf4df5-364e-44ff-ba9e-f7089d09d521", name: "Vuejs", }, { id: "8d28d4f3-a1cf-488c-97af-8141f538e26c", name: "ASP.net", }]);
}