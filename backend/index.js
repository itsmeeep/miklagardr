require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// backend side routers
const pricingTypeRouter = require('./src/router/server/pricingTypeRouter');
app.use('/api/back/pricing-type', pricingTypeRouter);

const facilityRouter = require('./src/router/server/facilityRouter');
app.use('/api/back/facility', facilityRouter);

const facilityDetailsRouter = require('./src/router/server/facilityDetailsRouter');
app.use('/api/back/facility-details', facilityDetailsRouter);

const tenantRouter = require('./src/router/server/tenantRouter');
app.use('/api/back/tenant', tenantRouter);

const roomRouter = require('./src/router/server/roomRouter');
app.use('/api/back/room', roomRouter);

const roomDetailsRouter = require('./src/router/server/roomDetailsRouter');
app.use('/api/back/room-details', roomDetailsRouter);

const roomImagesRouter = require('./src/router/server/roomImagesRouter');
app.use('/api/back/room-images', roomImagesRouter);

const roomPricingRouter = require('./src/router/server/roomPricingRouter');
app.use('/api/back/room-pricing', roomPricingRouter);

// client side routers
const clientRoomRouter = require('./src/router/client/clientRoomRouter');
app.use('/api/client/room', clientRoomRouter);

const clientTenantRouter = require('./src/router/client/clientTenantRouter');
app.use('/api/client/tenant', clientTenantRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// (async () => {
//     // var hehe = await roomDetails('63723-ROOM-20260103161641');
//     // var hehe = await tenantDetails('25408-TENANT-20260103161430');
//     // console.log(hehe);
//     console.log(JSON.stringify(hehe, null, 2));
// })();