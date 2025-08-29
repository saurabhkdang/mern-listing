const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const authMiddleware = require('../middleware/auth');

router.get('/items', authMiddleware, async (req, res) => {
    try {

        const { search, page = 1, limit = 10 } = req.query;

        let query = {};

        if(search && search.trim() !== '') {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        const items = await Item.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Item.countDocuments(query);

        res.json({ total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            items
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router;