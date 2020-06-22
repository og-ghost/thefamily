import Debug from 'debug';
import pool from './database';

/**
  * @function query
  * @description queries the db with the specified string
  * @param {string} queryString - the query string
  * @returns {*} nothing
  */
const debug = Debug('http');
const query = async (queryString) => {
  pool.on('connect', () => { debug('connected to the db'); });
  pool.query(queryString)
    .then((res) => {
      debug(res);

      pool.end();
    })

    .catch((err) => {
      debug(err);

      pool.end();
    });


  pool.on('remove', () => {
    debug('client removed');

    process.exit(0);
  });
};
export default query;
