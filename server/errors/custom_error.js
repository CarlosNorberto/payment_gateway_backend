class CustomError extends Error {
    constructor(message, status = 400, mensaje = null) {
        super(message);
        this.status = status;
        this.mensaje = mensaje;        
    }    
}
module.exports = CustomError;