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
        let garment = await tableRelations.Garments.findByPk(id, {
            include: [
                {
                    model: tableRelations.Users,
                    as: 'user_garments',
                    attributes: ['id', 'username', 'email']
                }
            ]
        });
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
            console.log("BODY RECIBIDO:", req.body);
            console.log("ARCHIVO RECIBIDO:", req.file);

            let { title, description, size, condition, brand } = req.body;
            if (!title || !description || !size || !condition || !brand) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }

            let garment_image = req.file ? req.file.filename : null;
            if (!garment_image) {
                return res.status(400).json({ error: 'La imagen es obligatoria' });
            }
            let garment = await tableRelations.Garments.create({ title, garment_image, description, size, condition, brand, upload_date: new Date(), is_available: true, });

            res.status(201).json(garment);

        } catch (error) {
            console.error("ERROR EN EL BACKEND:" + error);
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
