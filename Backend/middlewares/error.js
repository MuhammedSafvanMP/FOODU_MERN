export const TrycatchMiddleware = (TrycatchHandler) => {
    return async (req, res, next) => {
        try {
            await TrycatchHandler(req, res, next);
        } catch (error) {
            console.error(error);

            const statusCode = 500;
            const message = "Internal Server Error";
            const errorObject = {
                statusCode: statusCode,
                message: message
            };

            res.status(statusCode).json(errorObject);
            return; 
        }
    };
};
