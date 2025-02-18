const tableRelations = require('../model/tableRelations');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');

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
        const { user } = req; // El usuario autenticado

        const currentUserUid = req.user?.uid;

        const currentUserId = await tableRelations.Users.findOne({
            where: { firebase_uid: currentUserUid }
        });

        console.log("Current User UID:", currentUserUid);

        console.log("Current User ID:", currentUserId.id);

        if (!currentUserId.id) {
            return res.status(400).json({ error: "No se especificó el ID del usuario" });
        }


        const exchanges = await tableRelations.Exchange.findAll({
            where: { [Sequelize.Op.or]: [{ senderUserId: currentUserId.id }, { receiverUserId: currentUserId.id }] },
            include: [
                { model: tableRelations.Garments, as: 'sent_exchanges', attributes: ['title', 'garment_image'] },
                { model: tableRelations.Garments, as: 'received_exchanges', attributes: ['title', 'garment_image'] },
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
        console.log(req.body)
        const { sent_exchanges, received_exchanges, sender_user, receiver_user } = req.body;

        if (sender_user === receiver_user) {
            return res.status(400).json({ error: "No puedes intercambiar prendas contigo mismo." });
        }

        let sentExchanges = await tableRelations.Garments.findOne({ where: { id: sent_exchanges, status: 'disponible' } })
        console.log(sentExchanges)

        let receivedExchanges = await tableRelations.Garments.findOne({ where: { id: received_exchanges, status: 'disponible' } })
        console.log(receivedExchanges)

        if (!sentExchanges || !receivedExchanges) {
            return res.status(400).json({ error: 'Uno o ambos ítems no están disponibles para intercambio.' });
        }
        let exchange = await tableRelations.Exchange.create({
            senderUserId: sender_user,
            receiverUserId: receiver_user,
            garmentReceiverId: received_exchanges,
            garmentSenderId: sent_exchanges,
            status: 'pendiente'
        });
        console.log(exchange)

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
            exchange.schedule_date = new Date();

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

exports.getUpcomingExchanges = async (req, res) => {
    try {
        const currentUserUid = req.user?.uid;
        const currentUserId = await tableRelations.Users.findOne({
            where: { firebase_uid: currentUserUid }
        });

        const exchanges = await tableRelations.Exchange.findAll({
            where: { 
                status: 'completado',
                [Sequelize.Op.or]: [
                    { senderUserId: currentUserId.id },
                    { receiverUserId: currentUserId.id }
                ]
            },
            include: [
                { 
                    model: tableRelations.Garments, 
                    as: 'sent_exchanges', 
                    attributes: ['title', 'garment_image'] 
                },
                { 
                    model: tableRelations.Garments, 
                    as: 'received_exchanges', 
                    attributes: ['title', 'garment_image'] 
                }
            ],
            order: [['schedule_date', 'ASC']],
            limit: 1
        });

        res.status(200).json(exchanges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener próximos intercambios.' });
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


