const AppliesModel = require('../model/Applies');

const addApply = async (data) => {
    const apply = new AppliesModel(data);
    return await apply.save();
};

const getAllApplies = async () => {
    return await AppliesModel.find().sort({ createdAt: -1 });
};

const getAppliesByType = async (type) => {
    return await AppliesModel.find({ type }).sort({ createdAt: -1 });
};

const deleteApply = async (id) => {
    return await AppliesModel.findByIdAndDelete(id);
};

const markAsRead = async (id) => {
    return await AppliesModel.findByIdAndUpdate(id, { read: true }, { new: true });
};

const markAsUnread = async (id) => {
    return await AppliesModel.findByIdAndUpdate(id, { read: false }, { new: true });
};

module.exports = {
    addApply,
    getAllApplies,
    getAppliesByType,
    deleteApply,
    markAsRead,
    markAsUnread
};
