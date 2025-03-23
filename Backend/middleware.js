import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader?.split(' ')[1]

    try {
        const decoded = jwt.decode(token, process.env.AUTH_JWT_TOKEN, {
            algoithms: ['RS256']
        })

        if(decoded?.sub) {
            req.userId = decoded?.sub
            next();
        }
    } catch (error) {
        res.status(403).json({
            message: 'Error while decoding'
        })
    }
}