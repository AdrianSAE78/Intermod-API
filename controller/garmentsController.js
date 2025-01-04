const tableRelations = require('../model/tableRelations');

exports.getAllGarments = async (req, res) => {
    try{
        let garments = await tableRelations.Garments.findAll();
        res.status(200).json(garments);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

exports.getGarmentsById = async (req, res) => {
    try{
        let { id } = req.params;
        let garment = await tableRelations.Garments.findByPk(id);
        if (!garment) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }
        res.status(200).json(garment);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.createGarment = async (req, res) => {
    try{
        let {title, garment_image, description, size, condition, brand, category, upload_date, is_available} = req.body;
        let garment = await tableRelations.Garments.create({title, garment_image, description, size, condition, brand, category, upload_date, is_available});
        res.status(201).json(garment);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.updateGarment = async (req, res) => {
    try{
        let { id } = req.params;
        let {title, garment_image, description, size, condition, brand, category, is_available} = req.body;

        let garment = await tableRelations.Garments.findByPk(id);
        if (!garment) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await garment.update({title, garment_image, description, size, condition, brand, category, is_available});
        res.status(200).json(garment)

    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
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
