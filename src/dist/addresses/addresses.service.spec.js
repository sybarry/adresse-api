"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const addresses_service_1 = require("./addresses.service");
describe('AddressesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [addresses_service_1.AddressesService],
        }).compile();
        service = module.get(addresses_service_1.AddressesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=addresses.service.spec.js.map