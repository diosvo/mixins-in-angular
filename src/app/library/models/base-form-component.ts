interface BaseFormComponent {
  isFormValid?: () => boolean;
  onChange?: (value: unknown) => void;
  onTouched?: () => void;
}

export { BaseFormComponent };

