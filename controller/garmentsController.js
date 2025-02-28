const upload = require('../config/multer');
const tableRelations = require('../model/tableRelations');

exports.getAllGarments = async (req, res) => {
    try {
        let garments = await tableRelations.Garments.findAll();
        res.status(200).json(garments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getGarmentsById = async (req, res) => {
    try {
        let { id } = req.params;
        let garment = await tableRelations.Garments.findByPk(id);
        if (!garment) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }
        res.status(200).json(garment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.createGarment = async (req, res) => {
    try {
        let { title, description, size, condition, categoryId } = req.body;
        if (!title || !size || !condition || !categoryId) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        let garment_image = req.file ? req.file.filename : null;

        let garment = await tableRelations.Garments.create({ 
            title, 
            description, 
            size, 
            condition, 
            categoryId, 
            garment_image 
        });

        res.status(201).json(garment);
    } catch (error) {
        console.error("Error al crear la prenda:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateGarment = async (req, res) => {
    try {

        let { id } = req.params;
        let { title, description, size, condition, brand, is_available } = req.body;

        let garment = await tableRelations.Garments.findByPk(id);
        if (!garment) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        let garment_image = garment.garment_image;
        if (req.file) {
            garment_image = req.file.filename;
        }

        await garment.update({ title, garment_image, description, size, condition, brand, is_available });
        res.status(200).json(garment)

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: error.message });

    }
}

exports.deleteGarment = async (req, res) => {
    try {
        const { id } = req.params;
        const garment = await tableRelations.Garments.findByPk(id);
        if (!garment) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await garment.destroy();
        res.status(200).json({ message: "Prenda eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
