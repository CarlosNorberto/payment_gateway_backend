const CustomError = require("./custom_error");

const errorHandler = (err, req, res, next) => {
    
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            status: err.status,
            error: err.message,
            description: err.mensaje || "Hubo un error al procesar la solicitud.",            
        });
    }

    console.error(err); // Para depuración en el servidor

    res.status(500).json({
        status: 500,
        error: err.message || "Error inesperado",
        description: "Ocurrió un error en el servidor.",        
    });
};

module.exports = errorHandler;