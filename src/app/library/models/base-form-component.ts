interface BaseFormComponent {
  onChange?: (value: unknown) => void;
  onTouched?: () => void;
}

interface DeactivateComponent {
  canDeactivate: () => boolean;
  saveBeforeDeactivate: (url: string) => void;
}

export { BaseFormComponent, DeactivateComponent };

