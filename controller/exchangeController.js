const tableRelations = require('../model/tableRelations');

exports.getAllExchanges = async (req, res) => {
    try {
        let exchanges = await tableRelations.Exchange.findAll();
        res.status(200).json(exchanges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getExchangesById = async (req, res) => {
    try {
        let { id } = req.params;
        let exchange = await tableRelations.Exchange.findByPk(id);
        if (!exchange) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }
        res.status(200).json(exchange);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.createExchange = async (req, res) => {
    try {
        let { status, suggested_location, match_date } = req.body;
        let exchange = await tableRelations.Exchange.create({ status, suggested_location, match_date });
        res.status(201).json(exchange);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.updateExchange = async (req, res) => {
    try {
        let { id } = req.params;
        let { status, suggested_location, match_date } = req.body;

        let exchange = await tableRelations.Exchange.findByPk(id);
        if (!exchange) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await exchange.update({ status, suggested_location, match_date });
        res.status(200).json(exchange)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.deleteExchange = async (req, res) => {
    try {
        const { id } = req.params;
        const exchange = await tableRelations.Exchange.findByPk(id);
        if (!exchange) {
            return res.status(404).json({ error: "Prenda no encontrada" });
        }

        await exchange.destroy();
        res.status(200).json({ message: "Prenda eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
