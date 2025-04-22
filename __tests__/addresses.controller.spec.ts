import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from '../src/addresses/addresses.controller';
import { AddressesService } from '../src/addresses/addresses.service';

describe('AddressesController', () => {
  let controller: AddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [
        {
          provide: AddressesService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('devrait lever une erreur si le champ "q" est vide', async () => {
    const body = { q: '' };

    try {
      await controller.create(body);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toEqual({
        error: "Le champ 'q' est requis et doit être une chaîne non vide.",
      });
    }
  });
});
