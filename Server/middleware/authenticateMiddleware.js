const admin = require('firebase-admin');

const authenticateMiddleware = async (req, res, next) => {
    try {
        console.log("in middleware")
        const { authorization } = req.headers;
        console.log(authorization)
        
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).send({ error: 'Unauthorized' });
        }

        const idToken = authorization.split('Bearer ')[1];

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; // Attach user information to the request object
        console.log('user is authenticated')
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send({ error: 'Unauthorized' });
    }
};

module.exports = authenticateMiddleware;
