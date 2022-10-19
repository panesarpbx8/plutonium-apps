export interface User extends UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface UserData {
  saved: string[];
  isPro: boolean;
}
