const jwt = require('jsonwebtoken');
const config = require('../config/config');

// const checkAuth1 = () => {
//     return (req, res, next) => {
//         console.log("Authorization middleware");

//         // find JWT in Headers
//         const token = req.headers['authorization'];
//         if (!token) {
//             return res.status(401).send("Access Denied");
//         } else {
//             // Validate JWT
//             const tokenBody = token.slice(7);
//             jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded) => {
//                 if (err) {
//                     console.log(`JWT Error: ${err}`);
//                     return res.status(401).send("Error: Access Denied")
//                 }
//             });
//             next();
//         }
//     }
    
//     // try {
//     //     const token = req.headers.authorization.split(" ")[1];
//     //     console.log(req.body.token)
//     //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     //     next();
//     // } catch (error) {
//     //     return res.status(401).json({ status: false, message: 'Auth failed'});
//     // }
// }

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = { checkAuth };
