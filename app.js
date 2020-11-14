const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const inspectionRoutes = require('./api/routes/inspections');
const testRoutes = require('./api/routes/test');
const repairRoutes = require('./api/routes/repair');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/inspections', inspectionRoutes);
app.use('/tests', testRoutes);
app.use('/repairs', repairRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;