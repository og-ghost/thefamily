import statusCodes from '../helpers/statuscodes';

/**
 * @class UserValidate
 */
class PropertyValidate {
  // eslint-disable-next-line consistent-return
  static validateProperty(request, response, next) {
    const {
      name, city, state, firstimage, description, type, feature, amount, bedrooms, age, bathrooms,
      size,
      carpark,
      posteduser
    } = request.body;

    if (!name || name.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Name is required',
      });
    }

    if (!city || city.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'City is required',
      });
    }

    if (!state || state.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'State is required',
      });
    }

    if (!firstimage || firstimage.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'First image is required',
      });
    }
    if (!description || description.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Description is required',
      });
    }

    if (!type || type.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Type is required',
      });
    }

    if (!feature || feature.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'feature is required',
      });
    }

    if (amount === undefined || typeof amount !== 'number' || amount === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Amount is required',
      });
    }

    if (bedrooms === undefined || typeof bedrooms !== 'number' || bedrooms === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Bedrooms is required',
      });
    }

    if (age === undefined || typeof age !== 'number' || age === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Age is required',
      });
    }

    if (bathrooms === undefined || typeof bathrooms !== 'number' || bathrooms === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Bathrooms is required',
      });
    }


    if (size === undefined || typeof size !== 'number' || size === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Size is required',
      });
    }
    if (carpark === undefined || typeof carpark !== 'number' || carpark === null) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Carpark is required',
      });
    }

    if (!posteduser || posteduser.trim().length === 0) {
      return response.status(400).json({
        status: statusCodes.badRequest,
        error: 'Posted User is required',
      });
    }
    next();
  }
}

export default PropertyValidate;
