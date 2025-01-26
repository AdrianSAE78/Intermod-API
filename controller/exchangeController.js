const tableRelations = require('../model/tableRelations');
const {Sequelize} = require('sequelize');

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

exports.getUserExchanges = async (req, res) => {
    try {
        const { user_id } = req.params;

        const exchanges = await tableRelations.Exchange.findAll({
            where: { [Sequelize.Op.or]: [{ user1_id: sender_user }, { user2_id: receiver_user }] },
            include: [
                { model: tableRelations.Garments, as: 'garment1', attributes: ['title', 'garment_image'] },
                { model: tableRelations.Garments, as: 'garment2', attributes: ['title', 'garment_image'] },
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(exchanges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el historial de intercambios.' });
    }
}

exports.createExchange = async (req, res) => {
    try {
        const { sent_exchanges, received_exchanges, sender_user, receiver_user } = req.body;
        let sentExchanges = await tableRelations.Garments.findOne({where: {id: sent_exchanges, status: 'disponible'}})
        let receivedExchanges =  await tableRelations.Garments.findOne({where: {id: received_exchanges, status: 'disponible'}})
        if (!sentExchanges || !receivedExchanges) {
            return res.status(400).json({ error: 'Uno o ambos ítems no están disponibles para intercambio.' });
        }
        let exchange = await Exchanges.create({
            sender_user,
            receiver_user,
            received_exchanges,
            sent_exchanges,
            status: 'pending'
        });

        res.status(201).json({
            message: "Solicitud de intercambio creada con éxito.",
            exchange
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.respondToExchange = async (req, res) => {
    try {
        let { id, response } = req.body;

        const exchange = await tableRelations.Exchange.findOne({ where: { id, status: 'pendiente' } });

        if (!exchange) {
            return res.status(404).json({ error: 'Intercambio no encontrado o ya procesado.' });
        }

        if (response === 'aceptado') {
            exchange.status = 'completado';

            await tableRelations.Garments.update({ status: 'intercambiado' }, { where: { id: [exchange.sent_exchanges, exchange.received_exchanges] } });

        } else {
            exchange.status = 'rechazado';

            await tableRelations.Garments.update({ status: 'disponible' }, { where: { item_id: [exchange.sent_exchanges, exchange.received_exchanges] } });
        }

        await exchange.save();
        res.status(200).json({
            message: `Intercambio ${response === 'aceptado' ? 'aceptado' : 'rechazado'} con éxito.`,
            exchange
        })

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


