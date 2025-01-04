const tableRelations = require('../model/tableRelations');

exports.getAllCategories = async (req, res) => {
    try{
        let categories = await tableRelations.Categories.findAll();
        res.status(200).json(categories);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

exports.getCategoriesById = async (req, res) => {
    try{
        let { id } = req.params;
        let categorie = await tableRelations.Categories.findByPk(id);
        if (!categorie) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }
        res.status(200).json(categorie);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.createCategorie = async (req, res) => {
    try{
        let {categorie_name, categorie_picture} = req.body;
        let categorie = await tableRelations.Categories.create({categorie_name, categorie_picture});
        res.status(201).json(categorie);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.updateCategorie = async (req, res) => {
    try{
        let { id } = req.params;
        let {categorie_name, categorie_picture} = req.body;

        let categorie = await tableRelations.Categories.findByPk(id);
        if (!categorie) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await categorie.update({categorie_name, categorie_picture});
        res.status(200).json(categorie)

    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.deleteCategorie = async (req, res) => {
    try {
        const { id } = req.params;
        const categorie = await tableRelations.Categories.findByPk(id);
        if (!categorie) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }
        
        await categorie.destroy();
        res.status(200).json({ message: "Prenda eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
