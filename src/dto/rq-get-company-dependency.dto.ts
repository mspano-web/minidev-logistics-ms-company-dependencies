import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

/* -------------------------------------------- */

@Exclude()
export class RqGetCompanyDependencyDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

/* -------------------------------------------- */
