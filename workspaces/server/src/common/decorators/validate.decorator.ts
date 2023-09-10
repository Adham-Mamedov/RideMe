import { registerDecorator, ValidationOptions } from 'class-validator';
import { expDateValidator } from '@shared/utils/string.utils';

export const IsValidExpDate = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsValidExpDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && expDateValidator(value);
        },
      },
    });
  };
};
