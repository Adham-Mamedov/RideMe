import { ApiProperty } from '@nestjs/swagger';

export class SuccessEntity {
  @ApiProperty()
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}
