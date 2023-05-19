const getCurrencyGateway = require('../../gateway/GetAPIDataGateway');
const toBRL = require('../../helpers/formatBRL');
const QuotationModel = require('../../database/model/QuotationModel');

module.exports = class EurQuotationService {
  constructor () {}
  async execute () {
    // const maxRequests = 10;

    // const request = await QuotationModel.find({
    //   account_id: user_id,
    //   create_date: { $gte: new Date() - 10 * 60 * 1000 }
    // });
    // if (request.length > maxRequests) throw new Error('Too many requests');

    const response = await getCurrencyGateway();

    const json = await response.json();

    const EUR = {
      code: json.EURBRL.code,
      bid: toBRL(json.EURBRL.bid),
      high: toBRL(json.EURBRL.high),
      low: toBRL(json.EURBRL.low),
      pctChange: Number(json.EURBRL.pctChange),
      create_date: json.EURBRL.create_date
      // account_id: user_id
    };

    await QuotationModel.create(EUR);

    return { EUR };
  };
};
