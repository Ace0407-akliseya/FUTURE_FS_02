const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

// @route   GET api/leads
// @desc    Get all leads
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const leads = await Lead.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(leads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/leads/external
// @desc    Create a lead from external source (Portfolio)
// @access  Public
router.post('/external', async (req, res) => {
    const { name, email, message, source } = req.body;

    try {
        const newLead = await Lead.create({
            name,
            email,
            source: source || 'External',
            status: 'New',
            notes: message ? `Message: ${message}` : ''
        });

        res.json(newLead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/leads
// @desc    Create a lead
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name, email, source, status, followUpDate, notes } = req.body;

    try {
        const newLead = await Lead.create({
            name,
            email,
            source,
            status,
            followUpDate,
            notes
        });

        res.json(newLead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/leads/:id
// @desc    Update lead stats/notes
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { status, notes, followUpDate } = req.body;

    // Build lead object
    const leadFields = {};
    if (status) leadFields.status = status;
    if (notes) leadFields.notes = notes;
    if (followUpDate) leadFields.followUpDate = followUpDate;

    try {
        let lead = await Lead.findByPk(req.params.id);

        if (!lead) return res.status(404).json({ msg: 'Lead not found' });

        await lead.update(leadFields);

        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/leads/:id
// @desc    Delete a lead
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let lead = await Lead.findByPk(req.params.id);

        if (!lead) return res.status(404).json({ msg: 'Lead not found' });

        await lead.destroy();

        res.json({ msg: 'Lead removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
