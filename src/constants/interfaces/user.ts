interface AuthedUser {
  emailAddress: string;
  businessPartner: number;
  businessPartnerName: string;
  businessUserFirstName: string;
  businessUserLastName: string;
  businessUserFullName: string;
  language: string;
}

interface UIKeyGeneral {
  language: AuthedUser['language'];
  userId: AuthedUser['emailAddress'];
  businessPartner: AuthedUser['businessPartner'];
}

export type {
  AuthedUser,
  UIKeyGeneral,
};
