interface DeactivateComponent {
  canDeactivate: () => boolean;
  saveChanges: (url: string) => void;
}

export { DeactivateComponent };

