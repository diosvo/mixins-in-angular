/**
 * @description router link for each component based on group
 */

enum EUrl {
  COMPONENT = 'ui-components',
  WEB = 'web-ui',
  FUNCTION = 'functions'
}

enum EComponentUI {
  BUTTON = 'button',
  CARD = 'card',
  MENU = 'menu',
  TABLE = 'table',
  FORM = 'form',
}

enum EWebUI { }

enum EFunctions {
  RXJS = 'rxjs',
}

export { EUrl, EComponentUI, EFunctions };

