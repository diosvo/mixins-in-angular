interface BaseFormComponent {
  onChange?: (value: unknown) => void;
  onTouched?: () => void;
}

interface DeactivateComponent {
  canDeactivate: () => boolean;
  onSave: () => void;
}

export { BaseFormComponent, DeactivateComponent };

