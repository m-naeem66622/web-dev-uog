const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            status: "FAILED",
            error: {
                statusCode: 403,
                message: "Forbidden",
                identifier: "0x001300",
            },
        });
    }
    next();
};

const isCustomer = (req, res, next) => {
    if (req.user.role !== "customer") {
        return res.status(403).json({
            status: "FAILED",
            error: {
                statusCode: 403,
                message: "Forbidden",
                identifier: "0x001303",
            },
        });
    }
    next();
};

const isSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            status: "FAILED",
            error: {
                statusCode: 403,
                message: "Forbidden",
                identifier: "0x001304",
            },
        });
    }
    next();
};

module.exports = { isAdmin, isCustomer, isSeller };
