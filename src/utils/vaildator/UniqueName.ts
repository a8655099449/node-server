import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from "class-validator";
import AppDataSource from "../../db";

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [entityClass, propertyName] = args.constraints;
    const repository = AppDataSource.getRepository(entityClass);

    const entity = await repository.findOne({
      where: {
        [propertyName]: value,
      },
    });

    return !entity;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exists`;
  }

}


export function IsUnique(entityClass: Function, propertyName: string, name:string) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${name} 已存在`,
      },
      constraints: [entityClass, propertyName],
      validator: IsUniqueConstraint,
    });
  };
}
