import { UserRole } from '../../../common/enums';

export class UserResponseDto {
  id: string;
  login: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}
