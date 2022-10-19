import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

export type LoginFormState = 'login' | 'sign up' | 'reset password';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  displayName: string;
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export type OAuthProvider = GoogleAuthProvider | GithubAuthProvider;