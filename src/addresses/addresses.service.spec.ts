import { AddressesService } from './addresses.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AddressesService', () => {
  let service: AddressesService;

  const mockRepo = {
    create: jest.fn((addr) => addr),
    save: jest.fn(async (addr) => ({ id: 1, ...addr })),
  };

  beforeEach(() => {
    service = new AddressesService(mockRepo as any);
    jest.clearAllMocks();
  });

  it('devrait créer une adresse à partir d’une requête valide', async () => {
    // Mock retour de l’API BAN
    mockedAxios.get.mockResolvedValue({
      data: {
        features: [
          {
            geometry: {
              coordinates: [2.123, 48.987],
            },
            properties: {
              label: '8 Boulevard du Port 95000 Cergy',
              housenumber: '8',
              street: 'Boulevard du Port',
              postcode: '95000',
              citycode: '95127',
            },
          },
        ],
      },
    });

    const result = await service.createFromQuery('8 boulevard du port, Cergy');

    expect(result).toEqual({
      id: 1,
      label: '8 Boulevard du Port 95000 Cergy',
      housenumber: '8',
      street: 'Boulevard du Port',
      postcode: '95000',
      citycode: '95127',
      longitude: 2.123,
      latitude: 48.987,
    });

    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('devrait retourner null si aucune adresse n’est trouvée', async () => {
    mockedAxios.get.mockResolvedValue({ data: { features: [] } });

    const result = await service.createFromQuery('adresse introuvable');
    expect(result).toBeNull();
  });
});
