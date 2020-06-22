import statusCodes from '../helpers/statuscodes';

/**
 * @class UserValidate
 */
class TrackValidate {
  // eslint-disable-next-line consistent-return
  static validateTrack(request, response, next) {
    const {
      userid, log, lat, address, email, status
    } = request.body;

    if (!userid || userid.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'User ID is required',
      });
    }

    if (!log || log.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Logitude is required',
      });
    }

    if (!lat || lat.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Latitude is required',
      });
    }
    if (!address || address.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Address is required',
      });
    }
    function emailIsValid(emaile) {
      return /\S+@\S+\.\S+/.test(emaile);
    }
    if (!email || email.trim().length === 0 || emailIsValid(email) === false) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Email is required',
      });
    }

    if (!status || status.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Status is required',
      });
    }
    next();
  }
}

export default TrackValidate;
