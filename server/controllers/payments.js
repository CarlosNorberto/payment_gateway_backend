const md = require('../models');
const CustomError = require('../errors/custom_error');
const dateFns = require('date-fns');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const registerPayment = async (req, res, next) => {
    try {
        validatePaymentData(req);
        const { amount, reference, currency, description, callback_url, return_url } = req.body;
        const payment = await md.payments.create({
            payment_id: uuidv4(),
            reference,
            amount,
            currency,
            description,
            status: 'created',
            callback_url,
            return_url,
            expires_at: dateFns.addMinutes(new Date(), 15)
        });
        const token = jwt.sign({ payment_id: payment.payment_id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        await md.payment_events.create({
            payment_id: payment.payment_id,
            event_type: 'created',
            description: 'Payment created and pending processing',            
            new_status: 'created',            
            source: 'system'
        });
        // return url
        res.status(201).json({
            url: `${process.env.URL_FRONTEND}/pay/${payment.payment_id}?token=${token}`
        });
    } catch (error) {
        next(error);
    }
};

const validatePaymentData = (req) => {   
    try {
        if(!req.body) {
            throw new CustomError('Datos de pago no proporcionados', 400, 'No se proporcionaron datos para el pago. (amount, currency, etc.)');
        } 
        const data = req.body
        if (!data.amount) {
            throw new CustomError('El monto (amount) es obligatorio', 400, 'El monto es un campo obligatorio. Ejemplo: 100.50');
        }
        if (typeof data.amount !== 'number') {
            throw new CustomError('El monto (amount) proporcionado no es válido', 400, 'El monto debe ser un número. Ejemplo: 100.50');
        }
        if( data.amount <= 0 ) {
            throw new CustomError('El monto (amount) debe ser mayor que cero', 400, 'El monto debe ser un número mayor que cero. Ejemplo: 100.50');
        }
        if (!data.currency){
            throw new CustomError('La moneda (currency) es obligatoria', 400, 'La moneda es un campo obligatorio. Ejemplo: BOB, USD.');
        }
        if (typeof data.currency !== 'string') {
            throw new CustomError('La moneda (currency) proporcionada no es válida', 400, 'La moneda debe ser una cadena. Ejemplo: BOB, USD.');
        }    
        if (data.currency.length > 8) {
            throw new CustomError('La moneda (currency) proporcionada es demasiado larga', 400, 'La moneda no debe exceder los 8 caracteres. Ejemplo: BOB, USD.');
        }
        if (data.return_url && typeof data.return_url !== 'string') {
            throw new CustomError('La return_url proporcionada no es válida', 400, 'La return_url debe ser una cadena. Ejemplo: https://mi-sitio.com/return');
        }
        if (data.callback_url && typeof data.callback_url !== 'string') {
            throw new CustomError('La callback_url proporcionada no es válida', 400, 'La callback_url debe ser una cadena. Ejemplo: https://mi-sitio.com/callback');
        }
        return null;        
    } catch (error) {
        throw error;        
    }
};

module.exports = {
    registerPayment
};