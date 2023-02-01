import { ApiProperty } from "@nestjs/swagger";
import { IsCreditCard, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class ReturnedStudentScheduleDto { 
    @ApiProperty({ example: '1e234', required: true })
    @IsString()
    @IsNotEmpty()
    groupId: String;
    @ApiProperty({ example: 'group 1', required: true })
    @IsString()
    @IsNotEmpty()
    groupName: String;
    @ApiProperty({ example: 'Omar Fareed', required: true })
    @IsString()
    @IsNotEmpty()
    teacherName: String;
    @ApiProperty({ example: '12:00:00Z', required: true })
    @IsString()
    @IsNotEmpty()
    appointment: String;
    @ApiProperty({ example: '1e2168', required: false })
    @IsString()
    @IsOptional()
    organizationId: String;
    @ApiProperty({ example: 'organization 1', required: false })
    @IsString()
    @IsOptional()
    organizationName: String;
    
    
}