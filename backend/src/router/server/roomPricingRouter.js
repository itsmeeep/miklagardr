const express = require('express');
const router = express.Router();

const roomPricingController = require('../../controllers/server/roomPricingController');

router.get('/get', async (req, res) => {
    var result = await roomPricingController.viewRoomPricing(req.body);
    res.json(result);
});

router.get('/getById/:id', async (req, res) => {
    var result = await roomPricingController.viewRoomPricingById(req.params.id);
    res.json(result);
});

router.get('/getByRoomId/:id', async (req, res) => {
    var result = await roomPricingController.viewRoomPricingByRoomId(req.params.id);
    res.json(result);
});

router.post('/add', async (req, res) => {
    var result = await roomPricingController.insertRoomPricing(req.body);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    var result = await roomPricingController.deleteRoomPricing(req.body);
    res.json(result);
});

module.exports = router;