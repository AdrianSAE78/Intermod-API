const upload = require('../config/multer');
const tableRelations = require('../model/tableRelations');

function compareFreeHours(freeHours1, freeHours2) {
    // Cada elemento es un objeto: { day, start, end }
    for (const slot1 of freeHours1) {
        for (const slot2 of freeHours2) {
            if (slot1.day === slot2.day) {
                if (slot1.start < slot2.end && slot2.start < slot1.end) {
                    return true;
                }
            }
        }
    }
    return false;
}

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

        const currentUserId = req.user && req.user.id;

        let garment = await tableRelations.Garments.findByPk(id, {
            include: [
                {
                    model: tableRelations.Users,
                    as: 'user_garments',
                    attributes: ['id', 'username', 'email'],
                    include: [
                        {
                            model: tableRelations.UserPreferences,
                            as: 'user_preferences',
                            attributes: ['prefered_free_hours']
                        }
                    ]
                }
            ]
        });
        if (!garment) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        if (currentUserId) {
            const currentUserPref = await tableRelations.UserPreferences.findOne({
                where: { userId: currentUserId },
                attributes: ['prefered_free_hours']
            });

            // Verificamos que ambos usuarios tengan definido su arreglo de horarios
            if (currentUserPref && garment.user_garments.user_preferences) {
                match_hours = compareFreeHours(
                    garment.user_garments.user_preferences.prefered_free_hours,
                    currentUserPref.prefered_free_hours
                );
            }
        }

        res.status(200).json(garment, match_hours);
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
