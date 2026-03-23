import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectF1SessionDto {
    @IsNotEmpty()
    @IsString()
    f1Fantasy007: string;

    @IsNotEmpty()
    @IsString()
    loginSession: string;

    @IsNotEmpty()
    @IsString()
    reese84: string;
}
