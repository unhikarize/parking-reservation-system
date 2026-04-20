import { HTTP_STATUS } from "@/shared/constants/httpStatus";

export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string = "Unauthorized") {
    super(message);
    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }
}
