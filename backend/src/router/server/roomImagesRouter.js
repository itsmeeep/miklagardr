const express = require('express');
const router = express.Router();

const roomImagesController = require('../../controllers/server/roomImagesController');

router.get('/get', async (req, res) => {
    var result = await roomImagesController.viewRoomImages(req.body);
    res.json(result);
});

router.get('/getById/:id', async (req, res) => {
    var result = await roomImagesController.viewRoomImagesById(req.params.id);
    res.json(result);
});

router.get('/getByRoomId/:id', async (req, res) => {
    var result = await roomImagesController.viewRoomImagesByRoomId(req.params.id);
    res.json(result);
});

router.post('/add', async (req, res) => {
    var result = await roomImagesController.insertRoomImages(req.body);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    var result = await roomImagesController.deleteRoomImages(req.body);
    res.json(result);
});

module.exports = router;