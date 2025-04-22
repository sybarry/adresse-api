import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty({ message: "Le champ 'q' est requis et doit être une chaîne non vide." })
  q: string;
}
