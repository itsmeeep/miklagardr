const express = require('express');
const router = express.Router();

const roomDetailsController = require('../../controllers/server/roomDetailsController');

router.post('/add', async (req, res) => {
    var result = await roomDetailsController.insertRoomDetails(req.body);
    res.json(result);
});

router.post('/update', async (req, res) => {
    var result = await roomDetailsController.updateRoomDetails(req.body);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    var result = await roomDetailsController.deleteRoomDetails(req.body);
    res.json(result);
});

module.exports = router;