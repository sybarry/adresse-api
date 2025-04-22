import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('api/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

@Post()
async create(@Body() createAddressDto: CreateAddressDto) {
  const { q } = createAddressDto;

  // Validation stricte de "q"
  if (!q || typeof q !== 'string' || q.trim() === '') {
    throw new HttpException(
      { 
        error: 'Le champ \'q\' est requis et doit être une chaîne non vide.', 
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  try {
    const result = await this.addressesService.createFromQuery(q);
    if (!result) {
      throw new HttpException(
        {
          error:'Adresse non trouvée. Aucun résultat ne correspond à votre recherche.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  } catch (error) {
    if (error instanceof HttpException) throw error;
    throw new HttpException(
      {
        error: 'Erreur serveur : impossible de contacter l\'API externe.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}


  @Get(':id/risks')
  async getRisks(@Param('id') id: number) {
    try {
      const risks = await this.addressesService.getRisksByAddressId(id);
      return risks;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          error:
            'Erreur serveur : échec de la récupération des données de Géorisques.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
