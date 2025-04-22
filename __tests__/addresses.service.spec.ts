import { AddressesService } from '../src/addresses/addresses.service';
import { Address } from '../src/addresses/address.entity';

describe('AddressesService', () => {
  let service: AddressesService;

  beforeEach(() => {
    service = new AddressesService({
      save: async (address: Address) => ({ ...address, id: 1 })
    } as any);
  });

  it('devrait sauvegarder une adresse simulée', async () => {
    const result = await service.create('8 bd du Port');
    expect(result).toHaveProperty('label');
  });
});
