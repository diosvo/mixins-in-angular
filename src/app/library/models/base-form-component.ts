interface BaseFormComponent {
  onChange?: (value: unknown) => void;
  onTouched?: () => void;
}

interface DeactivateComponent {
  canDeactivate: () => boolean;
  saveChanges: (url: string) => void;
}

export { BaseFormComponent, DeactivateComponent };

