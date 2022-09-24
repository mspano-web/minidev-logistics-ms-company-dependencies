import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PrismaService } from 'database/prisma.service';
import { firstValueFrom } from 'rxjs';
import { BusinessCompanyDependency } from './business-entity.ts/business.company-dependency.entity';
import {
  RqGetZoneDto,
  RsCreateCompanyDependencyDto,
  RsGetCompanyDependencyDto,
} from './dto';
import { RsGetCompanyDependencyByZoneDto } from './dto/rs-get-company-dependency-by-zone.dto';
import { IRqRsFactory, RQ_RS_FACTORY_SERVICE } from './interfaces';

/* ------------------------------------------------------------- */

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,

    @Inject(RQ_RS_FACTORY_SERVICE)
    private readonly rqRsFactoryService: IRqRsFactory,

    @Inject('RABBIT_SERVICE_ZONES') private service_zone: ClientProxy,
  ) {}

  /* -------------------- */

  async createCompanyDependency(
    data: BusinessCompanyDependency,
  ): Promise<RsCreateCompanyDependencyDto> {
    let rsCreateCompanyDependencyDto: RsCreateCompanyDependencyDto = null;

    try {
      const rqGetZone: RqGetZoneDto =
        this.rqRsFactoryService.createRqGetZoneDto(data.zone_id);
      const zoneResponse = await firstValueFrom(
        this.service_zone.send({ cmd: 'ms-get-zone-by-id' }, rqGetZone),
      );
      if (
        zoneResponse !== null &&
        zoneResponse.rsGenericHeaderDto.statusCode === HttpStatus.OK
      ) {
        const newCompanyDependency = await this.prisma.companyDependency.create(
          {
            data,
          },
        );
        if (newCompanyDependency) {
          rsCreateCompanyDependencyDto =
            this.rqRsFactoryService.createCompanyDependencyEntityToDTOResponse(
              HttpStatus.CREATED,
              '',
              newCompanyDependency,
            );
        }
      } else {
        rsCreateCompanyDependencyDto =
          this.rqRsFactoryService.createCompanyDependencyEntityToDTOResponse(
            HttpStatus.FAILED_DEPENDENCY,
            'Failed to create company dependency - invalid zone',
            null,
          );
      }
    } catch (e) {
      rsCreateCompanyDependencyDto =
        this.rqRsFactoryService.createCompanyDependencyEntityToDTOResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to create company dependency.',
          null,
        );
    }
    console.log(
      '[ms-create-company-dependency][service] (',
      rsCreateCompanyDependencyDto,
      ')',
    );

    return rsCreateCompanyDependencyDto;
  }

  /* -------------------- */

  async findOne(id: number): Promise<RsGetCompanyDependencyDto> {
    let rsGetCompanyDependencyDto: RsGetCompanyDependencyDto = null;

    try {
      const res = await this.prisma.companyDependency.findUnique({
        where: {
          id: id,
        },
      });
      if (res) {
        rsGetCompanyDependencyDto =
          this.rqRsFactoryService.getCompanyDependencyEntityToDTOResponse(
            HttpStatus.OK,
            '',
            res,
          );
      } else {
        rsGetCompanyDependencyDto =
          this.rqRsFactoryService.getCompanyDependencyEntityToDTOResponse(
            HttpStatus.NOT_FOUND,
            'Failed to get company dependency.',
            null,
          );
      }
    } catch (e) {
      rsGetCompanyDependencyDto =
        this.rqRsFactoryService.getCompanyDependencyEntityToDTOResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to get company dependency.',
          null,
        );
    }
    console.log(
      '[ms-get-company-dependency][service] (',
      rsGetCompanyDependencyDto,
      ')',
    );
    return rsGetCompanyDependencyDto;
  }

  /* -------------------- */

  async findManyByZone(id: number): Promise<RsGetCompanyDependencyByZoneDto> {
    let rsGetCompanyDependencyByZoneDto: RsGetCompanyDependencyByZoneDto = null;

    try {
      const res = await this.prisma.companyDependency.findMany({
        where: {
          zone_id: id,
        },
      });
      if (res) {
        rsGetCompanyDependencyByZoneDto =
          this.rqRsFactoryService.getCompanyDependencyByZoneEntityToDTOResponse(
            HttpStatus.OK,
            '',
            res,
          );
      } else {
        rsGetCompanyDependencyByZoneDto =
          this.rqRsFactoryService.getCompanyDependencyByZoneEntityToDTOResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Failed to get company dependency by zone.',
            null,
          );
      }
    } catch (e) {
      rsGetCompanyDependencyByZoneDto =
        this.rqRsFactoryService.getCompanyDependencyByZoneEntityToDTOResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to get company dependency by zone.',
          null,
        );
    }
    console.log(
      '[ms-get-company-dependency-by-zone][service] (',
      rsGetCompanyDependencyByZoneDto,
      ')',
    );
    return rsGetCompanyDependencyByZoneDto;
  }
}
/* ------------------------------------------------------------- */
