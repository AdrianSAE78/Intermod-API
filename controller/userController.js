const tableRelations = require('../model/tableRelations');

exports.getAllUsers = async (req, res) => {
    try{
        let users = await tableRelations.Users.findAll();
        res.status(200).json(users);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

exports.getUserById = async (req, res) => {
    try{
        let { id } = req.params;
        let user = await tableRelations.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.createUser = async (req, res) => {
    try{
        let {id, first_name, last_name, username, password, email, profile_picture, user_type, liter_counter, date_joined, trust_score} = req.body;
        let user = await tableRelations.Users.create({id, first_name, last_name, username, password, email, profile_picture, user_type, liter_counter, date_joined, trust_score});
        res.status(201).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.updateUser = async (req, res) => {
    try{
        let { id } = req.params;
        let {first_name, last_name, username, email, profile_picture, liter_counter, trust_score} = req.body;

        let user = await tableRelations.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await user.update({first_name, last_name, username, email, profile_picture, liter_counter, trust_score});
        res.status(200).json(user)

    }catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await tableRelations.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        await user.destroy();
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
