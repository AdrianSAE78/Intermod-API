const tableRelations = require('../model/tableRelations');

exports.getAllScores = async (req, res) => {
    try {
        let scores = await tableRelations.Scores.findAll();
        res.status(200).json(scores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getScoresById = async (req, res) => {
    try {
        let { id } = req.params;
        let score = await tableRelations.Scores.findByPk(id);
        if (!score) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }
        res.status(200).json(score);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.createScore = async (req, res) => {
    try {
        let { total_score, comment, rating_date } = req.body;
        let score = await tableRelations.Scores.create({ total_score, comment, rating_date });
        res.status(201).json(score);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.updateScore = async (req, res) => {
    try {
        let { id } = req.params;
        let { total_score, comment, rating_date } = req.body;

        let score = await tableRelations.Scores.findByPk(id);
        if (!score) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await score.update({ total_score, comment, rating_date });
        res.status(200).json(score)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.deleteScore = async (req, res) => {
    try {
        const { id } = req.params;
        const score = await tableRelations.Scores.findByPk(id);
        if (!score) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await score.destroy();
        res.status(200).json({ message: "Prenda eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
