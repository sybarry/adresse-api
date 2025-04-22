import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { Address } from './address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
