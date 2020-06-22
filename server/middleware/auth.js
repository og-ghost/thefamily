import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import statusCodes from '../helpers/statuscodes';

dotenv.config();

const { SECRET } = process.env;

// eslint-disable-next-line consistent-return
const authentication = (request, response, next) => {
  try {
    const header = request.headers.authorization;
    if (!header || header === '') return response.status(401).json({ status: statusCodes.unAuthorized, error: 'Authentication failed' });

    const token = jwt.verify(header, SECRET);
    request.decode = token;

    next();
  } catch (e) {
    return response.status(401).json({ status: statusCodes.unAuthorized, error: 'unauthorized access!' });
  }
};
const adminRole = (request, response, next) => {
  try {
    if (request.decode.isadmin === true) {
      return next();
    } return response.status(401).json({ status: statusCodes.unAuthorized, error: 'unauthorized access!' });
  } catch (e) {
    return response.status(401).json({ status: statusCodes.unAuthorized, error: 'unauthorized access!' });
  }
};

const userRole = (request, response, next) => {
  try {
    if (request.decode.isadmin === false) {
      return next();
    } return response.status(401).json({ status: statusCodes.unAuthorized, error: 'unauthorized access!' });
  } catch (e) {
    return response.status(401).json({ status: statusCodes.unAuthorized, error: 'unauthorized access!' });
  }
};
export default { authentication, adminRole, userRole };
