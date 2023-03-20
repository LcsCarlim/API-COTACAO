import { getCurrencyGateway } from "../gateway/GetAPIDataGateway.js";
import { toBRL } from "../helpers/formatBRL.js";

export default class EurQuotationService {
    constructor() {}
    async execute() {
        
        const response = await getCurrencyGateway();
        
        const json = await response.json();

            
        const EUR = {
            code: json.EURBRL.code,
            bid: toBRL(json.EURBRL.bid),
            create_date: json.EURBRL.create_date
        };
        
        return {
            EUR

        };
    };
};