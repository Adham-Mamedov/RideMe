import { ApiProperty } from '@nestjs/swagger';

export class SuccessEntity {
  @ApiProperty({ example: true })
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}
