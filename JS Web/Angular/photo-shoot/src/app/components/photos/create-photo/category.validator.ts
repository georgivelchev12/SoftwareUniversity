import { AbstractControl } from '@angular/forms';

export class CategoryValidator {
  public static minLengthCategories(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      let incCategoryNum = c.value.filter((v) => v == true || typeof v == 'object');

      if (incCategoryNum.length >= min) {
        return null;
      }

      return { minLengthCategories: { valid: false } };
    };
  }
}
