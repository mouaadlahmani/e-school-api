const appliesService = require('../service/appliesService');

const createApply = async (req, res) => {
    try {
        const apply = await appliesService.addApply(req.body);
        res.status(201).json(apply);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getApplies = async (req, res) => {
    try {
        const applies = await appliesService.getAllApplies();
        res.status(200).json(applies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppliesByType = async (req, res) => {
    const { type } = req.params;

    try {
        const applies = await appliesService.getAppliesByType(type);
        res.status(200).json(applies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeApply = async (req, res) => {
    try {
        const deleted = await appliesService.deleteApply(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Apply not found' });
        res.status(200).json({ message: 'Apply deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setReadStatus = async (req, res) => {
    const { id } = req.params;
    const { read } = req.body;

    try {
        const updated = read
            ? await appliesService.markAsRead(id)
            : await appliesService.markAsUnread(id);

        if (!updated) return res.status(404).json({ message: 'Apply not found' });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createApply,
    getApplies,
    removeApply,
    setReadStatus,
    getAppliesByType
};
