import jwt from "jsonwebtoken";
export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
        try {
            // Decoding user
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            //req.userId = decoded.id;
            res.locals.jwt = decoded;
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(403).json({
                message: "Нет доступа",
            });
        }
    }
    else {
        return res.status(401).json({
            message: "Не авторизован",
        });
    }
};
