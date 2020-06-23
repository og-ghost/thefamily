import Paypal from 'paypal-rest-sdk';


Paypal.configure({
  mode: 'sandbox',
  client_id: 'ASKmTI962e48me5CHEwGLMb5jPQdoGAulsGIk6rbymv5WLG4K35HewsXqvYJLhfF-W03wtqOjmQ5kkat',
  client_secret: 'EMO8p36mCTKQA2pKWrZib1VtEvioJsb9rOHm8ev-4xS9vAAQ45f_Xv3WwOKNGadelqFyn7P28iOtL2Wy'
});


class PayPalController {
  /**
   * creates new user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */
  static async paypal(req, res) {
    try {
      console.log(req.body);

      const createPaymentJson = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        redirect_urls: {
          return_url: `https://securetheadoptfamily.herokuapp.com/api/v1/success?amount=${req.body.price}`,
          cancel_url: 'https://securetheadoptfamily.herokuapp.com/api/v1/cancel'
        },
        transactions: [{
          item_list: {
            items: [{
              name: req.body.name,
              sku: '001',
              price: req.body.price,
              currency: 'USD',
              quantity: 1
            }]
          },
          amount: {
            currency: 'USD',
            total: req.body.price
          },
          description: req.body.description
        }]
      };

      Paypal.payment.create(createPaymentJson, (error, payment) => {
        console.log('i got');
        if (error) {
          console.log('i got error');
          return res.send({
            status: 400,
            error: error.response,
          });
        }
        console.log(payment); // eslint-disable-next-line no-plusplus
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            return res.send({
              status: 200,
              message: payment.links[i].href
            });
          }
        }
      });
    } catch (err) {
      return res.send({
        status: 400,
        err,
      });
    }
  }

  static async success(req, res) {
    try {
      console.log(req.query);
      const pay = req.query.PayerID;
      const { paymentId } = req.query;
      // eslint-disable-next-line camelcase
      const execute_payment_json = {
        payer_id: pay,
        transactions: [{
          amount: {
            currency: 'USD',
            total: req.query.amount
          }
        }]
      };
      Paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error) {
          return res.send({
            status: 400,
            error: error.response,
          });
        }

        if (payment.state === 'approved') {
          console.log(payment.state);
          return res.redirect('http://theadoptfamily.com/success.html');
        }

        // return res.send({
        //   status: 200,
        //   payment,
        // });
        // window.location.href('https://theadoptfamily.com?')
      });
    } catch (err) {
      return res.send({
        status: 400,
        err,
      });
    }
  }


  static async cancel(req, res) {
    try {
      return res.redirect('http://theadoptfamily.com/cancel.html');
    } catch (err) {
      return res.send({
        status: 400,
        err
      });
    }
  }
}
export default PayPalController;
