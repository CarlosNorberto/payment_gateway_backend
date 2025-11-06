const md = require('../models');

const createUpdateBank = async (req, res, next) => {
    try {
        const { name, code, api_base_url } = req.body;
        const bank = await md.banks.findOne({ where: { code } });
        if (bank) {
            // UPDATE EXISTING BANK
            bank.name = name;
            bank.api_base_url = api_base_url;
            await bank.save();
            res.status(200).json(bank);
        } else {
            // CREATE NEW BANK
            const newBank = await md.banks.create({
                name,
                code,
                api_base_url,                
            });
            res.status(201).json(newBank);
        }
    } catch (error) {
        next(error);
    }
};

const getAllBanks = async (req, res, next) => {
    try {
        const banks = await md.Banks.findAll({ where: { active: true } });
        res.status(200).json(banks);
    } catch (error) {
        next(error);
    }
};

const activateDeactivateBank = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bank = await md.Banks.findByPk(id);
        if (!bank) {
            return res.status(404).json({ message: 'El banco no fue encontrado' });
        }
        bank.active = !bank.active;
        await bank.save();
        res.status(200).json({ message: `Banco ${bank.active ? 'activado' : 'desactivado'} exitosamente` });
    } catch (error) {
        next(error);
    }
};

const getBankById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bank = await md.Banks.findByPk(id);
        if (!bank) {
            return res.status(404).json({ message: 'El banco no fue encontrado' });
        }
        res.status(200).json(bank);
    } catch (error) {
        next(error);
    }
};

const deleteBank = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bank = await md.Banks.findByPk(id);
        if (!bank) {
            return res.status(404).json({ message: 'El banco no fue encontrado' });
        }
        await bank.destroy();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUpdateBank,
    getAllBanks,
    activateDeactivateBank,
    getBankById,
    deleteBank
};