const express = require('express');
const cors = require('cors');

const applyMiddleware = (app) => {
    app.use(cors({
        origin: [
            // Live link for main branch only & localhost links for development branch. - Don't use live link while developing
            // 'https://rentify-70183.web.app',
            // 'https://rentify-admin.firebaseapp.com',
            'http://localhost:5173',
            'http://localhost:5174',
        ],
    }))
    app.use(express.json())
}

module.exports = applyMiddleware