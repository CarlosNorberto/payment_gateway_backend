const payments = require('../controllers/payments');
const payment_methods = require('../controllers/payment_methods');

module.exports = (app) => {

    // REGISTER PAYMENT
    app.post(process.env.PREFIX_API + '/payments/register', payments.registerPayment);
    
    // PAYMENT METHODS
    app.get(process.env.PREFIX_API + '/payment_methods/all', payment_methods.getAll);
    app.post(process.env.PREFIX_API + '/payment_methods/save_update', payment_methods.saveUpdate);
    app.delete(process.env.PREFIX_API + '/payment_methods/delete/:id', payment_methods.remove);
    
}