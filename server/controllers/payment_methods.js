const md = require('../models');

const getAll = async (req, res) => {
    try {
        const paymentMethods = await md.payment_methods.findAll();
        res.json(paymentMethods);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const saveUpdate = async (req, res) => {
    try {
        const { id, code, name, active, config } = req.body;

        let paymentMethod = await md.payment_methods.findByPk(id);
        if (paymentMethod) {
            // Update payment method
            paymentMethod = await paymentMethod.update({ code, name, active, config });
        } else {
            // Create payment method
            paymentMethod = await md.payment_methods.create({ code, name, active, config });
        }

        res.json(paymentMethod);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentMethod = await md.payment_methods.findByPk(id);
        if (paymentMethod) {
            await paymentMethod.destroy();
            res.json({ message: 'Payment method deleted successfully' });
        } else {
            res.status(404).json({ error: 'Payment method not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    saveUpdate,
    remove
};