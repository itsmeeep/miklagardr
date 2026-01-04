const express = require('express');
const router = express.Router();

const pricingTypeController = require('../../controllers/server/pricingTypeController');

router.get('/get', async (req, res) => {
    var result = await pricingTypeController.viewPricingType(req.body);
    res.json(result);
});

router.post('/add', async (req, res) => {
    var result = await pricingTypeController.insertPricingType(req.body);
    res.json(result);
});

router.post('/update', async (req, res) => {
    var result = await pricingTypeController.updatePricingType(req.body);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    var result = await pricingTypeController.deletePricingType(req.body);
    res.json(result);
});

module.exports = router;