const express = require('express');
const router = express.Router();

const facilityController = require('../../controllers/server/facilityController');

router.get('/get', async (req, res) => {
    var result = await facilityController.viewFacility(req.body);
    res.json(result);
});

router.get('/getById/:id', async (req, res) => {
    console.log(req.params.id);
    var result = await facilityController.viewFacilityById(req.params.id);
    res.json(result);
});

router.get('/getByName/:name', async (req, res) => {
    var result = await facilityController.viewFacilityByName(req.params.name);
    res.json(result);
});

router.post('/add', async (req, res) => {
    var result = await facilityController.insertFacility(req.body);
    res.json(result);
});

router.post('/update', async (req, res) => {
    var result = await facilityController.updateFacility(req.body);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    var result = await facilityController.deleteFacility(req.body);
    res.json(result);
});

module.exports = router;