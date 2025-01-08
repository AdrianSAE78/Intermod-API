const tableRelations = require('../model/tableRelations');

exports.getAllUserPreferences = async (req, res) => {
    try {
        let userPreferences = await tableRelations.UserPreferences.findAll();
        res.status(200).json(userPreferences);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUserPreferencessById = async (req, res) => {
    try {
        let { id } = req.params;
        let userPreference = await tableRelations.UserPreferences.findByPk(id);
        if (!userPreference) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }
        res.status(200).json(userPreference);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.createUserPreference = async (req, res) => {
    try {
        let { status, suggested_location, match_date } = req.body;
        let userPreference = await tableRelations.UserPreferences.create({ status, suggested_location, match_date });
        res.status(201).json(userPreference);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.updateUserPreference = async (req, res) => {
    try {
        let { id } = req.params;
        let { status, suggested_location, match_date } = req.body;

        let userPreference = await tableRelations.UserPreferences.findByPk(id);
        if (!userPreference) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await userPreference.update({ status, suggested_location, match_date });
        res.status(200).json(userPreference)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUserPreference = async (req, res) => {
    try {
        const { id } = req.params;
        const userPreference = await tableRelations.UserPreferences.findByPk(id);
        if (!userPreference) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await userPreference.destroy();
        res.status(200).json({ message: "Prenda eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
