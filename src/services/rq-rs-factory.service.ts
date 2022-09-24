import { Injectable } from '@nestjs/common';
import { CompanyDependency } from '@prisma/client';
import { BusinessCompanyDependency } from 'src/business-entity.ts/business.company-dependency.entity';
import {
  RqCreateCompanyDependencyDto,
  RsCreateCompanyDependencyDto,
  RsGetCompanyDependencyByZoneDto,
  RsGetCompanyDependencyDto,
} from 'src/dto';
import { RqGetZoneDto } from 'src/dto/rq-get-zone.dto';
import { RsGetCompanyDependencyDataByZoneDto } from 'src/dto/rs-get-company-dependency-by-zone.dto';
import { IRqRsFactory } from 'src/interfaces';

/* ------------------------------------------------------- */

@Injectable()
export class RqRsFactoryService implements IRqRsFactory {
  DTORequesttoBusinessCompanyDependencyEntity(
    rqCreateCompanyDependencyDto: RqCreateCompanyDependencyDto,
  ): BusinessCompanyDependency {
    const bcd = new BusinessCompanyDependency();
    bcd.address = rqCreateCompanyDependencyDto.address;
    bcd.dependencyType = rqCreateCompanyDependencyDto.dependencyType;
    bcd.description = rqCreateCompanyDependencyDto.description;
    bcd.zone_id = rqCreateCompanyDependencyDto.zone_id;
    bcd.latitude = rqCreateCompanyDependencyDto.location.latitude;
    bcd.longitude = rqCreateCompanyDependencyDto.location.longitude;
    return bcd;
  }

  /* ------------------- */

  createRqGetZoneDto(zone_id: number): RqGetZoneDto {
    return new RqGetZoneDto(zone_id);
  }

  /* ------------------- */

  createCompanyDependencyEntityToDTOResponse(
    statusCode: number,
    message: string,
    companyDependency: CompanyDependency,
  ): RsCreateCompanyDependencyDto {
    return new RsCreateCompanyDependencyDto(
      { statusCode, message }, // header
      companyDependency // Check if user information is available
        ? {
            // add data
            id: companyDependency.id,
          }
        : null, // without data
    );
  }

  /* ------------------- */

  getCompanyDependencyEntityToDTOResponse(
    statusCode: number,
    message: string,
    companyDependency: CompanyDependency,
  ): RsGetCompanyDependencyDto {
    return new RsGetCompanyDependencyDto(
      { statusCode, message }, // header
      companyDependency // Check if user information is available
        ? {
            // add data
            description: companyDependency.description,
            dependencyType: companyDependency.dependencyType,
            zone_id: companyDependency.zone_id,
            address: companyDependency.address,
            position: {
              latitude: companyDependency.latitude,
              longitude: companyDependency.longitude,
            },
          }
        : null, // without data
    );
  }

  /* ------------------- */

  getCompanyDependencyByZoneEntityToDTOResponse(
    statusCode: number,
    message: string,
    companyDependencies: CompanyDependency[],
  ): RsGetCompanyDependencyByZoneDto {
    const data: RsGetCompanyDependencyDataByZoneDto[] = [];
    companyDependencies.forEach((cd) => {
      data.push({
        id: cd.id,
        description: cd.description,
        dependencyType: cd.dependencyType,
        zone_id: cd.zone_id,
        address: cd.address,
        position: {
          latitude: cd.latitude,
          longitude: cd.longitude,
        },
      });
    });

    return new RsGetCompanyDependencyByZoneDto(
      { statusCode, message }, // header
      companyDependencies // Check if user information is available
        ? // add data
          data
        : null, // without data
    );
  }
}

/* ------------------------------------------------------- */
