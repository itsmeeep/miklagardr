const express = require('express');
const router = express.Router();

const tenantController = require('../../controllers/client/clientTenantController');

router.get('/details/:id', async (req, res) => {
    var result = await tenantController.tenantDetails(req.params.id);
    res.json(result);
});

module.exports = router;