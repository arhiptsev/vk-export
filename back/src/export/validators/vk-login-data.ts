import { IsNotEmpty, IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VkLoginData {
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    public username: string;
    
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty()
    public password: string;
    
    @IsString()
    @ApiProperty()
    public code?: number;
}