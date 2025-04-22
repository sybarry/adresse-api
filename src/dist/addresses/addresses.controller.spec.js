"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const addresses_controller_1 = require("./addresses.controller");
const addresses_service_1 = require("./addresses.service");
describe('AddressesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [addresses_controller_1.AddressesController],
            providers: [
                {
                    provide: addresses_service_1.AddressesService,
                    useValue: {
                        findAll: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get(addresses_controller_1.AddressesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=addresses.controller.spec.js.map