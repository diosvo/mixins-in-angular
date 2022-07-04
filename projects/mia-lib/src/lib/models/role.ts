interface IRoles {
  guest: boolean;
  admin: boolean;
  subscriber: boolean;
}

enum ERole {
  ADMIN = 'admin',
  GUEST = 'guest',
  SUBSCRIBER = 'subscriber'
}

export { ERole, IRoles };
