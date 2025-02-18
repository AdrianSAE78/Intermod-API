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
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(userPreference);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.createUserPreference = async (req, res) => {
    try {
        let { prefered_free_hours, prefered_size, prefered_size_shoes, prefered_style, userId } = req.body;
        if (!Array.isArray(prefered_free_hours)) {
            prefered_free_hours = [prefered_free_hours];
        }
        let userPreference = await tableRelations.UserPreferences.create({ 
            prefered_free_hours, 
            prefered_size, 
            prefered_size_shoes, 
            prefered_style,
            userId
        });
        res.status(201).json(userPreference);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserPreference = async (req, res) => {
    try {
        let { prefered_free_hours, prefered_size, prefered_size_shoes, prefered_style, userId } = req.body;

        let userPreference = await tableRelations.UserPreferences.findByPk(id);
        if (!userPreference) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await userPreference.update({ prefered_free_hours: JSON.stringify(prefered_free_hours), prefered_size, prefered_size_shoes, prefered_style, userId });
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
