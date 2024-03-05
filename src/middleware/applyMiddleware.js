const express = require('express');
const cors = require('cors');

const applyMiddleware = (app) => {
    app.use(cors({
        origin: [
            // 'https://rentify-70183.web.app',
            'http://localhost:5173',
            'https://rentify-admin.firebaseapp.com',
        ],
    }))
    app.use(express.json())
}

module.exports = applyMiddleware