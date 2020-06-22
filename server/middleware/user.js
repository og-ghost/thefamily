import statusCodes from '../helpers/statuscodes';
import help from '../helpers/help';

/**
 * @class UserValidate
 */
class UserValidate {
  // eslint-disable-next-line consistent-return
  static validateuser(request, response, next) {
    const {
      name,
      message,
      email,
    } = request.body;

    if (!name || name.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        message: 'name is required',
      });
    }

    if (!email || email.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        message: 'Email is required',
      });
    }

    if (!message || message.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        message: 'Message is required',
      });
    }
    next();
  }

  // eslint-disable-next-line consistent-return
  static validateSignup(request, response, next) {
    const {
      firstName, lastName, email, phoneNumber, password, confirmPassword,
    } = request.body;

    if (!firstName || firstName.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'First name is required',
      });
    }

    if (!lastName || lastName.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Last name is required',
      });
    }

    if (!email || email.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email is required',
      });
    }
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Phone Number is required',
      });
    }
    if (email) {
      const isValid = help.emailValidator(email);
      if (!isValid) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Invalid email address',
        });
      }

      if (!password || password.trim().length === 0) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Password is required',
        });
      }

      if (password !== confirmPassword) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Passwords do not match',
        });
      }
      next();
    }
  }

  // eslint-disable-next-line consistent-return
  static validateSignin(request, response, next) {
    const { email, password, } = request.body;
    if (!email || email.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email is required',
      });
    }

    if (email) {
      const isValid = help.emailValidator(email);
      if (!isValid) {
        return response.status(400).json({
          status: statusCodes.badRequest,
          error: 'Invalid login details, email or password is wrong',
        });
      }
    }

    if (!password || password.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Password is required',
      });
    }
    next();
  }
}

export default UserValidate;
