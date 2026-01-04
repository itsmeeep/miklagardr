const express = require('express');
const router = express.Router();

const roomController = require('../../controllers/server/roomController');

router.get('/get', async (req, res) => {
    var result = await roomController.viewRoom(req.body);
    res.json(result);
});

router.get('/getById/:id', async (req, res) => {
    console.log(req.params.id);
    var result = await roomController.viewRoomById(req.params.id);
    res.json(result);
});

router.get('/getByName/:name', async (req, res) => {
    var result = await roomController.viewRoomByName(req.params.name);
    res.json(result);
});


router.post('/add', async (req, res) => {
    var result = await roomController.insertRoom(req.body);
    res.json(result);
});

router.post('/update', async (req, res) => {
    var result = await roomController.updateRoom(req.body);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    var result = await roomController.deleteRoom(req.body);
    res.json(result);
});

module.exports = router;