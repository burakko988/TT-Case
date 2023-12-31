import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    title: string;
}
