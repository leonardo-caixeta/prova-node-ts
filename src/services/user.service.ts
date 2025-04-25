import { IUserService } from "../interfaces/IServiceResponse";
import { ValidationResult } from "../types";
import { ServiceResponse } from "../types/ServiceResponse";
import { GetUser, IUserCreate } from "../types/User";

export class UserService implements IUserService{
    getAll(): Promise<ServiceResponse<GetUser[]>> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<ServiceResponse<GetUser | string>> {
        throw new Error("Method not implemented.");
    }
    create(data: IUserCreate): Promise<ServiceResponse<string> | ValidationResult> {
        throw new Error("Method not implemented.");
    }
    update(req: {
        body: IUserCreate;
        params: { id: number };
      }): Promise<ServiceResponse<string> | ValidationResult> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: number): Promise<ServiceResponse<string | GetUser>> {
        throw new Error("Method not implemented.");
    }
}