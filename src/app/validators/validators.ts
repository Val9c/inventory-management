import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function productNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.trim() ? null : { productName: 'Le nom du produit est requis' };
  };
}

export function productQuantityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value >= 0 ? null : { productQuantity: 'La quantité doit être supérieure ou égale à zéro' };
  };
}

export function productCategoryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value ? null : { productCategory: 'Une catégorie doit être sélectionnée' };
  };
}
