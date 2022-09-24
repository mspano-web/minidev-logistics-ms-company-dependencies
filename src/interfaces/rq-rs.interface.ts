import { CompanyDependency } from '@prisma/client';

import { BusinessCompanyDependency } from 'src/business-entity.ts/business.company-dependency.entity';
import {
  RqCreateCompanyDependencyDto,
  RsCreateCompanyDependencyDto,
  RsGetCompanyDependencyDto,
} from 'src/dto';
import { RqGetZoneDto } from 'src/dto/rq-get-zone.dto';
import { RsGetCompanyDependencyByZoneDto } from 'src/dto/rs-get-company-dependency-by-zone.dto';

/*  -------------------------------------------------- */

//   interface and provide that token when injecting to an interface type.
export const RQ_RS_FACTORY_SERVICE = 'RQ_RS_FACTORY_SERVICE';

/* ----------------------------------------------------- */

export interface IRqRsFactory {
  DTORequesttoBusinessCompanyDependencyEntity(
    rqCreateCompanyDependencyDto: RqCreateCompanyDependencyDto,
  ): BusinessCompanyDependency;

  /*  --------------- */

  createRqGetZoneDto(zone_id: number): RqGetZoneDto;

  /*  --------------- */

  createCompanyDependencyEntityToDTOResponse(
    statusCode: number,
    message: string,
    companyDependency: CompanyDependency,
  ): RsCreateCompanyDependencyDto;

  /*  --------------- */

  getCompanyDependencyEntityToDTOResponse(
    statusCode: number,
    message: string,
    companyDependency: CompanyDependency,
  ): RsGetCompanyDependencyDto;

  /*  --------------- */

  getCompanyDependencyByZoneEntityToDTOResponse(
    statusCode: number,
    message: string,
    companyDependency: CompanyDependency[],
  ): RsGetCompanyDependencyByZoneDto;
}

/*  -------------------------------------------------- */
