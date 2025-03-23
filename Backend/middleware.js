import { jwtVerify } from 'jose';

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader?.split(' ')[1];

    try {
        const secret = process.env.AUTH_JWT_TOKEN;
        const decoded = await jwtVerify(token, secret, {
            algorithms: ['RS256']
        });

        if (decoded.sub) {
            req.userId = decoded.sub;
            next();
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        res.status(403).json({
            message: 'Error while decoding'
        });
    }
}
