export interface AuthenticatorParams {
  emailAddress: string;
  password: string;
}

export interface AuthenticatorResponse {
  accessToken: string;
  user: {
    emailAddress: string;
    businessPartner: number;
    businessPartnerName: string;
    businessUserFirstName: string;
    businessUserLastName: string;
    businessUserFullName: string;
    language: string;
  }
}
