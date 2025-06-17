const mongoose = require("mongoose");

const AppliesSchema = new mongoose.Schema({
  // Common to both types
  nomComplet: {
    type: String,
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  niveauScolaire: {
    type: String,
    enum: ['École primaire', 'Collège', 'Lycée'],
  },
  matieres: {
    type: [String],
    default: [],
  },
  accepteConditions: {
    type: Boolean,
    required: false,
  },

  // Specific to type: "sInscrire"
  nom: String,
  nationalite: {
    type: [String],
    default: [],
  },
  diplome: String,
  etablissement: String,
  specialite: String,
  statut: {
    type: [String],
    default: [],
  },
  formation: String,
  secteur: {
    type: [String],
    default: [],
  },
  niveau: String,
  session: String,
  paiement: String,
  engagementConditions: {
    type: Boolean,
    default: false,
  },
  engagementVeracite: {
    type: Boolean,
    default: false,
  },

  // General control fields
  read: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['inscription', 'sInscrire'],
    required: true,
  },
}, {
  timestamps: true,
});

const AppliesModel = mongoose.model("Applies", AppliesSchema);

module.exports = AppliesModel;
