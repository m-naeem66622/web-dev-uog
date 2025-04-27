const jwt = require("jsonwebtoken");

// Middleware for checking if JWT token exists and verifying it if it does
const authenticateJWT = (req, res, next) => {
    // const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const token = req.headers.authorization?.replace("Bearer ", ""); // Bearer <token>
    if (!token) {
        return res.status(401).json({
            status: "FAILED",
            error: {
                statusCode: 401,
                message: "Unauthorized",
                identifier: "0x001200",
            },
        });
    }

    console.log("Verifying token...");

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decodedToken);
        req.user = decodedToken;
        next();
    } catch (err) {
        res.status(401).json({
            status: "FAILED",
            error: {
                statusCode: 401,
                message: "Unauthorized",
                identifier: "0x001201",
            },
        });
    }
};

module.exports = authenticateJWT;
