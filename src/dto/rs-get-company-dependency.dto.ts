  import { RsGenericHeaderDto } from 'src/dto/rs-generic-header.dto';
  import { PointDto } from './rq-create-company-dependency.dto';
  
  /* -------------------------------------------------- */
  
  export class RsGetCompanyDependencyDataDto {
    description: string;
    dependencyType: string;
    zone_id: number;
    address: string;
    position: PointDto;
  }
  
  /* --------------- */
  
  export class RsGetCompanyDependencyDto {
    rsGenericHeaderDto: RsGenericHeaderDto;
    rsGetCompanyDependencyDataDto: RsGetCompanyDependencyDataDto;

    constructor(
        rsGenericHeaderDto: RsGenericHeaderDto,
        rsGetCompanyDependencyDataDto: RsGetCompanyDependencyDataDto,
      ) {
        this.rsGenericHeaderDto = rsGenericHeaderDto;
        this.rsGetCompanyDependencyDataDto = rsGetCompanyDependencyDataDto;
      }
  }
  
  /* -------------------------------------------------- */
  