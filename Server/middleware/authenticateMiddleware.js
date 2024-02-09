const admin = require('firebase-admin');
const { auth } = require("../firebase/config");

const authenticateMiddleware = async (req, res, next) => {
    try {
        console.log("Authenticating...")
        const { authorization } = req.headers;
        console.log(authorization)
        
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).send({ error: 'Unauthorized', status: "Guest" });
        }

        const idToken = authorization.split('Bearer ')[1];

        const decodedToken = await auth.verifyIdToken(idToken);
        req.user = decodedToken; // Attach user information to the request object
        console.log('User is authenticated')
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send({ error: 'Unauthorized', status: "Guest" });
    }
};

module.exports = authenticateMiddleware;
