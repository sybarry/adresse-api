import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import axios from 'axios';

@Injectable()
export class AddressesService {
  [x: string]: any;
  constructor(
    @InjectRepository(Address)
    private addressRepo: Repository<Address>,
  ) {}

  async createFromQuery(q: string): Promise<Address | null> {
    try {
      const res = await axios.get('https://api-adresse.data.gouv.fr/search/', {
        params: { q, limit: 1 },
      });

      const data = res.data;

      if (!data.features || data.features.length === 0) {
        return null;
      }

      const props = data.features[0].properties;
      const coords = data.features[0].geometry.coordinates;

      const newAddress = this.addressRepo.create({
        label: props.label,
        housenumber: props.housenumber || '',
        street: props.street || '',
        postcode: props.postcode,
        citycode: props.citycode,
        longitude: coords[0],
        latitude: coords[1],
      });

      return await this.addressRepo.save(newAddress);
    } catch (err) {
      console.error('Erreur API BAN :', err.message);
      throw err;
    }
  }

  async getRisksByAddressId(id: number): Promise<any> {
    const address = await this.addressRepo.findOneBy({ id });
  
    if (!address) {
      throw new HttpException(
        { error: 'Adresse non trouvée.' },
        HttpStatus.NOT_FOUND,
      );
    }
  
    const { citycode } = address;  // Utilisation de citycode
  
    try {
      const response = await axios.get(
        'https://www.georisques.gouv.fr/api/v1/gaspar/risques',
        {
          params: {
            code_insee: citycode,  // Remplacer par code_insee
          },
          headers: {
            'User-Agent': 'Mozilla/5.0',
          },
        },
      );
      
      // Retourne la réponse complète de Géorisques
      return response.data;
    } catch (err) {
      console.error('Erreur appel API Géorisques:', err.message);
  
      throw new HttpException(
        {
          error: 'Erreur serveur : échec de la récupération des données de Géorisques.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  
  
}
