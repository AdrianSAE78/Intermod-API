const upload = require('../config/multer');
const tableRelations = require('../model/tableRelations');

function compareFreeHours(freeHours1, freeHours2) {
    // Verifica si ambos son arrays
    if (!Array.isArray(freeHours1) || !Array.isArray(freeHours2)) {
        console.log("Uno de los valores no es un array:", freeHours1, freeHours2);
        return false;
    }

    // Compara los horarios
    for (const slot1 of freeHours1) {
        for (const slot2 of freeHours2) {
            if (slot1.start < slot2.end && slot2.start < slot1.end) {
                return true;
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


        const { user } = req; // El usuario autenticado

        const currentUserUid = req.user?.uid;

        const currentUserId = await tableRelations.Users.findOne({
            where: { firebase_uid: currentUserUid }
        });

        console.log("Current User UID:", currentUserUid);

        console.log("Current User ID:", currentUserId.id);

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

        let match_hours = null;

        if (currentUserId.id) {
            const currentUserPref = await tableRelations.UserPreferences.findOne({
                where: { userId: currentUserId.id },
                attributes: ['prefered_free_hours']
            });

            console.log(currentUserPref)

            // Verificamos que ambos usuarios tengan definido su arreglo de horarios
            if (currentUserPref && garment.user_garments.user_preferences) {

                const user1Hours = Array.isArray(currentUserPref.prefered_free_hours)
                    ? currentUserPref.prefered_free_hours
                    : [];

                const user2Hours = Array.isArray(garment.user_garments.user_preferences.prefered_free_hours)
                    ? garment.user_garments.user_preferences.prefered_free_hours
                    : [];

                console.log("Horarios usuario actual:", user1Hours);
                console.log("Horarios usuario prenda:", user2Hours);

                match_hours = compareFreeHours(user1Hours, user2Hours);
            }
        }

        res.status(200).json({ garment, match_hours });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getUserGarments = async (req, res) => {
    try {

        const { user } = req; // El usuario autenticado

        const currentUserUid = req.user?.uid;

        const currentUserId = await tableRelations.Users.findOne({
            where: { firebase_uid: currentUserUid }
        });

        console.log("Current User UID:", currentUserUid);

        console.log("Current User ID:", currentUserId.id);

        if (!currentUserId) {
            return res.status(400).json({ error: "No se especificó el ID del usuario" });
        }

        const garments = await tableRelations.Garments.findAll({
            where: { userId: currentUserId.id }
        });

        res.status(200).json(garments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.createGarment = async (req, res) => {
    try {
        console.log("BODY RECIBIDO:", req.body);
        console.log("ARCHIVO RECIBIDO:", req.file);

        let { title, description, size, condition, brand, userId, categoryId } = req.body;
        if (!title || !description || !size || !condition || !brand) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        let garment_image = req.file ? req.file.filename : null;
        if (!garment_image) {
            return res.status(400).json({ error: 'La imagen es obligatoria' });
        }
        let garment = await tableRelations.Garments.create({ title, garment_image, description, size, condition, brand, userId, categoryId, upload_date: new Date(), is_available: true, match_hours: false });

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
