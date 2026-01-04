const express = require('express');
const router = express.Router();

const roomController = require('../../controllers/client/clientRoomController');

router.get('/details/:id', async (req, res) => {
    var result = await roomController.roomDetails(req.params.id);
    res.json(result);
});

module.exports = router;