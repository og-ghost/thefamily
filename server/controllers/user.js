import help from '../helpers/help';
import data from '../model/userData';
import statusCodes from '../helpers/statuscodes';
import db from '../migration/database';

/**
 * @class UserController
 *
 * @description Specifies which method handles a given request for a specific endpoint
 *
 * @exports UserController
 */

class UserController {
  /**
   * creates new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static async create(request, response) {
    const foundUser = await data.searchByEmail(request.body.Email);

    if (foundUser.rowCount > 0) {
      return response.status(409).json({
        status: statusCodes.badRequest,
        error: 'Email is already taken',
      });
    }

    const result = await data.createContact(request.body);
    const { name, email, message } = result.rows[0];

    return response.status(201).json({
      status: response.statusCode,
      data: {
        name,
        email,
        message
      },
      message: `Successful ${name}`
    });
  }

  static async read(req, res) {
    const { status } = req.query;

    if (typeof status === 'undefined') {
      const { rows } = await db.query('SELECT * FROM contact');
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } else {
      const text = 'SELECT * FROM contact WHERE status=$1';
      const { rows } = await db.query(text, [status]);
      res.status(200).json({
        status: 200,
        data: rows,
      });
    }
  }
  /**
  * @method SignIn
  *
  * @description Logs in a user
  *
  * @param {*} request - The Request Object
  * @param {*} response - - The Request Object
  *
  * @return {} JSON API Response
  */

  /**
   * creates new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static async signUp(request, response) {
    const foundUser = await data.searchByEmail(request.body.email);

    if (foundUser.rowCount > 0) {
      return response.status(409).json({
        status: statusCodes.badRequest,
        error: 'email is already taken',
      });
    }

    const result = await data.createUser(request.body);
    const {
      firstname, lastname,
      phonenumber, email, registered, status, isadmin,
    } = result.rows[0];

    return response.status(201).json({
      status: response.statusCode,
      data: {
        firstname,
        lastname,
        phonenumber,
        email,
        registered,
        status,
        isadmin,
      },
      message: `Registration Successful ${firstname}`
    });
  }


  /**
  * @method SignIn
  *
  * @description Logs in a user
  *
  * @param {*} request - The Request Object
  * @param {*} response - - The Request Object
  *
  * @return {} JSON API Response
  */

  static async signIn(request, response) {
    const { email, password } = request.body;
    const result = await data.searchByEmail(email);

    if (result.rowCount < 1 || !help.validatePassword(password, result.rows[0].password)) {
      return response.status(401).json({
        status: response.statusCode,
        error: 'Sorry, the email/password you provided is incorrect',
      });
    }

    const {
      id, firstname, lastname, isadmin
    } = result.rows[0];

    return response.status(200).json({
      status: statusCodes.success,
      data: [{
        id,
        firstname,
        lastname,
        isadmin,
        email,
      }],
      message: `Login successful ${firstname}`,
    });
  }
}
export default UserController;
