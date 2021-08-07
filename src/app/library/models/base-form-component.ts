interface BaseFormComponent {
  onChange?: (value: unknown) => void;
  onTouched?: () => void;
}

interface DeactivateComponent {
  canDeactivate: () => boolean;
  saveBeforeDeactivate: () => void;
}

export { BaseFormComponent, DeactivateComponent };

