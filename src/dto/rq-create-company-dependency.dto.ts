import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

import { DependencyType } from '../types/enums';

/* -------------------------------------------- */

export class PointDto {
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
}

/* ------------- */

export class RqCreateCompanyDependencyDto {
  @IsString()
  description: string;

  @IsEnum(DependencyType)
  dependencyType: DependencyType;

  @IsNumber()
  zone_id: number;

  @IsString()
  address: string;

  @IsNotEmpty()
  @IsObject()
  location: PointDto;
}

/* -------------------------------------------- */
