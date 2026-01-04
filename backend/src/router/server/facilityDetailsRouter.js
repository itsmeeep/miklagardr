const express = require('express');
const router = express.Router();

const facilityDetailsController = require('../../controllers/server/facilityDetailsController');

router.get('/get', async (req, res) => {
    var result = await facilityDetailsController.viewFacilityDetails(req.body);
    res.json(result);
});

router.get('/getById/:id', async (req, res) => {
    console.log(req.params.id);
    var result = await facilityDetailsController.viewFacilityDetailsById(req.params.id);
    res.json(result);
});

router.get('/getByFacility/:id', async (req, res) => {
    console.log(req.params.id);
    var result = await facilityDetailsController.viewFacilityDetailsByFacility(req.params.id);
    res.json(result);
});

router.get('/getByName/:name', async (req, res) => {
    var result = await facilityDetailsController.viewFacilityDetailsByName(req.params.name);
    res.json(result);
});

router.post('/add', async (req, res) => {
    var result = await facilityDetailsController.insertFacilityDetails(req.body);
    res.json(result);
});

router.post('/update', async (req, res) => {
    var result = await facilityDetailsController.updateFacilityDetails(req.body);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    var result = await facilityDetailsController.deleteFacilityDetails(req.body);
    res.json(result);
});

module.exports = router;