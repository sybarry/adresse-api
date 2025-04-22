import { Repository } from 'typeorm';
import { Address } from './address.entity';
export declare class AddressesService {
    private addressRepo;
    constructor(addressRepo: Repository<Address>);
    createFromQuery(q: string): Promise<Address | null>;
    getRisksByAddressId(id: number): Promise<any>;
}
