const Subject = require("../model/Subject");
const Title = require("../model/Title");

const addSubject = async (data) => {
  try {
    const newSubject = new Subject(data);
    return await newSubject.save();
  } catch (error) {
    throw new Error("Error adding subject: " + error.message);
  }
};

const getSubjects = async () => {
  try {
    return await Subject.find();
  } catch (error) {
    throw new Error("Error fetching subjects: " + error.message);
  }
};

const getSubject = async (id) => {
  try {
    return await Subject.findById(id);
  } catch (error) {
    throw new Error("Error fetching subject: " + error.message);
  }
};

const editSubject = async (id, data) => {
  try {
    return await Subject.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error("Error updating subject: " + error.message);
  }
};

const deleteSubject = async (id) => {
  try {
    return await Subject.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting subject: " + error.message);
  }
};

const getSubjectTitles = async (subjectId) => {
  try {
    return await Title.find({ subjectId });
  } catch (error) {
    throw new Error("Error fetching titles for subject: " + error.message);
  }
};

module.exports = {
  addSubject,
  getSubjects,
  getSubject,
  editSubject,
  deleteSubject,
  getSubjectTitles,
};
