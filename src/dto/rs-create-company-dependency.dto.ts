import { RsGenericHeaderDto } from './rs-generic-header.dto';

/* -----------------------------------------------------------  */

export class RsCreateCompanyDependencyDataDto {
  id: number;
}

/* ----------------------------------- */

export class RsCreateCompanyDependencyDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsCreateCompanyDependencyDataDto: RsCreateCompanyDependencyDataDto;

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsCreateCompanyDependencyDataDto: RsCreateCompanyDependencyDataDto,
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsCreateCompanyDependencyDataDto = rsCreateCompanyDependencyDataDto;
  }

}

/* -----------------------------------------------------------  */
