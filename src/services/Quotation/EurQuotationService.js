const GetEURDataGateway = require('../../gateway/GetEURDataGateway');
const toBRL = require('../../helpers/formatBRL');
const QuotationModel = require('../../database/model/QuotationModel');
const formatBRL = require('../../helpers/formatBRL');

module.exports = class EurQuotationService {
  constructor () {}

  async execute () {
    const response = await GetEURDataGateway();

    const json = await response.json();

    const quotations = await Promise.all(
      json.slice(1).map(async (quotation) => {
        return {
          bid: toBRL(quotation.bid),
          high: toBRL(quotation.high),
          low: toBRL(quotation.low),
          pctChange: Number(quotation.pctChange),
          create_date: quotation.create_date
        };
      })
    );
    await QuotationModel.create(quotations);
    return {
      code: 'EUR',
      name: 'Euro',
      bid: formatBRL(json.at(0).bid),
      high: formatBRL(json.at(0).high),
      low: formatBRL(json.at(0).low),
      pctChange: Number(json.at(0).pctChange),
      image: 'https://live.staticflickr.com/65535/52906488642_2485d59f42.jpg',
      description: 'O euro é a moeda comum utilizada por 19 países da União Europeia. É a segunda moeda mais negociada no mundo e é reconhecido como um importante meio de pagamento e reserva internacional.',
      history: quotations
    };
  };
};
