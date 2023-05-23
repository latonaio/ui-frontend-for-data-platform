interface AuthedUser {
  emailAddress: string;
  businessPartner: number;
  businessPartnerName: string;
  businessUserFirstName: string;
  businessUserLastName: string;
  businessUserFullName: string;
  language: string;
}

interface Acceptor {
  accepter: string[];
}

export type {
  AuthedUser,
  Acceptor,
};
