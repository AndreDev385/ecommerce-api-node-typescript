import { BrandRepository } from '../domain/repository/interface/brand-repository';

export class BrandService {
  private static instance: BrandService;
  private readonly _brandRepo: BrandRepository;

  constructor (BrandRepository: BrandRepository) {
    this._brandRepo = BrandRepository;
  }

  public static getInstance (repository: BrandRepository) {
    if (!BrandService.instance) {
      BrandService.instance = new BrandService(repository);
    }
    return BrandService.instance;
  }

  async create (input: any) {
    const brand = await this._brandRepo.create(input);
    return brand;
  }

  async find () {
    return await this._brandRepo.findAll();
  }
}
