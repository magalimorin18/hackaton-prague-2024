export enum TYPE {
  PROFILES = 'Profiles',
  ASSETS = 'Assets',
  TRANSACTIONS = 'Transactions',
  RELATIONSHIPS = 'Relationships',
  COUNT_RELATIONSHIPS = 'Count_Relationships',
  PROFILES_SET = 'Profiles_Set',
}

export const iconsList: { [key: string]: string } = {
  Profiles: '🥝',
  Assets: '🥥',
  Transactions: '🍍',
};

export interface Profile {
  id: string;
  name: string;
  profileImages: [{ url: string }];
}

export interface Transaction {
  hash: string;
  profile: { id: string };
  to: string;
}

export interface Args {
  type: string;
}
