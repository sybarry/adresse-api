"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./address.entity");
const axios_1 = require("axios");
let AddressesService = class AddressesService {
    addressRepo;
    constructor(addressRepo) {
        this.addressRepo = addressRepo;
    }
    async createFromQuery(q) {
        try {
            const res = await axios_1.default.get('https://api-adresse.data.gouv.fr/search/', {
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
        }
        catch (err) {
            console.error('Erreur API BAN :', err.message);
            throw err;
        }
    }
    async getRisksByAddressId(id) {
        const address = await this.addressRepo.findOneBy({ id });
        if (!address) {
            throw new common_1.HttpException({ error: 'Adresse non trouvée.' }, common_1.HttpStatus.NOT_FOUND);
        }
        const { citycode } = address;
        try {
            const response = await axios_1.default.get('https://www.georisques.gouv.fr/api/v1/gaspar/risques', {
                params: {
                    code_insee: citycode,
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                },
            });
            return response.data;
        }
        catch (err) {
            console.error('Erreur appel API Géorisques:', err.message);
            throw new common_1.HttpException({
                error: 'Erreur serveur : échec de la récupération des données de Géorisques.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressesService);
//# sourceMappingURL=addresses.service.js.map