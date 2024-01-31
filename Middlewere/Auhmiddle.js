import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Authentication failed. Token not provided.'
            });
        }

        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed'
                });
            } else {
                req.body.userId = decode.userId;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in authentication"
        });
    }
};
