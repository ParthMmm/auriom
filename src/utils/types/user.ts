/* eslint-disable @typescript-eslint/no-empty-interface */
export type PublicMetadata = {};

export type PrivateMetadata = {};

export type UnsafeMetadata = {};

export interface Verification {
  status: string;
  strategy: string;
  externalVerificationRedirectURL?: any;
  attempts?: any;
  expireAt?: any;
  nonce?: any;
}

export interface LinkedTo {
  id: string;
  type: string;
}

export interface EmailAddress {
  id: string;
  emailAddress: string;
  verification: Verification;
  linkedTo: LinkedTo[];
}

export type PublicMetadata2 = {};

export interface Verification2 {
  status: string;
  strategy: string;
  externalVerificationRedirectURL?: any;
  attempts?: any;
  expireAt: number;
  nonce?: any;
}

export interface ExternalAccount {
  id: string;
  approvedScopes: string;
  emailAddress: string;
  username?: any;
  publicMetadata: PublicMetadata2;
  label?: any;
  verification: Verification2;
}

export interface UserObject {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  createdAt: number;
  updatedAt: number;
  profileImageUrl: string;
  gender: string;
  birthday: string;
  primaryEmailAddressId: string;
  primaryPhoneNumberId?: any;
  primaryWeb3WalletId?: any;
  lastSignInAt: number;
  externalId?: any;
  username: string;
  firstName: string;
  lastName: string;
  publicMetadata: PublicMetadata;
  privateMetadata: PrivateMetadata;
  unsafeMetadata: UnsafeMetadata;
  emailAddresses: EmailAddress[];
  phoneNumbers: any[];
  web3Wallets: any[];
  externalAccounts: ExternalAccount[];
}
