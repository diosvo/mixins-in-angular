enum ERole {
  ADMIN = 'admin',
  GUEST = 'guest',
  SUBSCRIBER = 'subscriber'
}

type TRole = Lowercase<keyof typeof ERole>

export { ERole, TRole };
