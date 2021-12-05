import { Request, Response } from "express";
var jwt = require('jsonwebtoken');
export const verifyToken = (token: any) => {
      return jwt.verify(token, process.env.SECRET_TOKEN, (err: any) => !err)
}

export const decodeToken = (token: any) => {
      const decodeString = jwt.decode(token);
      return decodeString ? decodeString.id : null
}

export const generateToken = (userSign: any) => {
      if (!userSign) return;
      return jwt.sign({ id: userSign }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
}

export const authenticateJWT = (req: any, res:Response,next:any) => {
      const authHeader = req.headers.authorization;
      if (authHeader) {
            const token = authHeader.split(' ')[1];
            let isValidToken =verifyToken(token);
            if(isValidToken){
                  let user = decodeToken(token);
                  req.userId = user;
                  next();
            }
            else res.sendStatus(401);
      } else {
            res.sendStatus(401);
      }
};