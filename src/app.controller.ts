import { Controller, Inject } from '@nestjs/common';
import { MessagePattern,  } from '@nestjs/microservices';

import { AppService } from './app.service';
import { BusinessCompanyDependency } from './business-entity.ts/business.company-dependency.entity';
import {
  RqCreateCompanyDependencyDto,
  RqGetCompanyDependenciesByZoneDto,
  RqGetCompanyDependencyDto,
  RsCreateCompanyDependencyDto,
  RsGetCompanyDependencyDto,
} from './dto';
import { RsGetCompanyDependencyByZoneDto } from './dto/rs-get-company-dependency-by-zone.dto';
import { IRqRsFactory, RQ_RS_FACTORY_SERVICE } from './interfaces';

/* ---------------------------------------------------------- */

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @Inject(RQ_RS_FACTORY_SERVICE)
    private readonly rqRsFactoryService: IRqRsFactory,
  ) {}

  /* -------------------- */

  @MessagePattern({ cmd: 'ms-get-company-dependency' })
  async getCompanyDependency(
    rqGetCompanyDependencyDto: RqGetCompanyDependencyDto,
  ): Promise<RsGetCompanyDependencyDto> {
    const { id } = rqGetCompanyDependencyDto;
    return await this.appService.findOne(id);
  }

  /* -------------------- */

  @MessagePattern({ cmd: 'ms-get-company-dependency-by-zone' })
  async getCompanyDependencyByZone(
    rqGetCompanyDependenciesByZoneDto: RqGetCompanyDependenciesByZoneDto,
  ): Promise<RsGetCompanyDependencyByZoneDto> {
      const { id } = rqGetCompanyDependenciesByZoneDto;
      return await this.appService.findManyByZone(id);
  }

  /* -------------------- */

  @MessagePattern({ cmd: 'ms-create-company-dependency' })
  async createCompanyDependency(
    rqCreateCompanyDependencyDto: RqCreateCompanyDependencyDto,
  ): Promise<RsCreateCompanyDependencyDto> {
    const companyDependencyBusinessData: BusinessCompanyDependency =
      this.rqRsFactoryService.DTORequesttoBusinessCompanyDependencyEntity(
        rqCreateCompanyDependencyDto,
      );

    return this.appService.createCompanyDependency(
      companyDependencyBusinessData,
    );
  }
}

/* ---------------------------------------------------------- */
