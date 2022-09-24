import { DependencyType } from '@prisma/client';
import { RsGenericHeaderDto } from 'src/dto/rs-generic-header.dto';
import { PointDto } from './rq-create-company-dependency.dto';

/* -------------------------------------------------- */

export class RsGetCompanyDependencyDataByZoneDto {
  id: number;
  description: string;
  dependencyType: DependencyType;
  zone_id: number;
  address: string;
  position: PointDto;
}

/* --------------- */

export class RsGetCompanyDependencyByZoneDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsGetCompanyDependencyDataByZoneDto:  RsGetCompanyDependencyDataByZoneDto[];

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsGetCompanyDependencyDataByZoneDto: RsGetCompanyDependencyDataByZoneDto[],
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsGetCompanyDependencyDataByZoneDto = rsGetCompanyDependencyDataByZoneDto;
  }
}

/* -------------------------------------------------- */
