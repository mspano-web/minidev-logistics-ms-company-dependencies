import { DependencyType } from "@prisma/client";

/* ----------------------------------- */

export class BusinessCompanyDependency {
  description: string;
  dependencyType: DependencyType;
  zone_id: number;
  address: string;
  latitude: number;
  longitude: number; 
}

/* ----------------------------------- */

