import { PartialType } from '@nestjs/swagger';
import { CreateOrganizationDto } from './create-organization.dto';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {} // PartialType is a function imported from @nestjs/swagger that extends the wanted class with making all properties not required
