const express = require('express');
const router = express.Router();

const tenantController = require('../../controllers/server/tenantController');

router.get('/get', async (req, res) => {
    var result = await tenantController.viewTenant(req.body);
    res.json(result);
});

router.get('/getById/:id', async (req, res) => {
    console.log(req.params.id);
    var result = await tenantController.viewTenantById(req.params.id);
    res.json(result);
});

router.get('/getByName/:name', async (req, res) => {
    var result = await tenantController.viewTenantByName(req.params.name);
    res.json(result);
});

router.post('/add', async (req, res) => {
    var result = await tenantController.insertTenant(req.body);
    res.json(result);
});

router.post('/update', async (req, res) => {
    var result = await tenantController.updateTenant(req.body);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    var result = await tenantController.deleteTenant(req.body);
    res.json(result);
});

module.exports = router;