import { Injectable } from '@nestjs/common';
import { AuthGuard as AG } from '@nestjs/passport';

@Injectable()
export class RefreshJWTGuard extends AG('jwt-refresh') {}
