import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { firstValueFrom, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { LoginData, OAuthProvider, ResetPasswordData, SignUpData } from '../types/login';
import { User, UserData } from '../types/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly user$: Observable<User | null>;

  constructor(
    private firestore: Firestore, 
    private auth: Auth, 
  ) { 
    this.user$ = authState(this.auth).pipe(
      switchMap(user => user ? this.mapUser(user) : of(null)),
      shareReplay(1),
    );
  }

  private mapUser(user: FirebaseUser): Observable<User> {
    return (docData(doc(this.firestore, `users/${user.uid}`)) as Observable<UserData>).pipe(
      map((data: UserData) => ({
        uid: user.uid,
        email: user.email as string,
        displayName: user.displayName as string,
        photoURL: user.photoURL as string,
        saved: data.saved,
        isPro: data.isPro,
      })),
    );
  }

  async createAccount(data: SignUpData): Promise<void> {
    if (!data.displayName || !data.email || !data.password)
      throw Error('Insufficient information');
    
    const credential = await createUserWithEmailAndPassword(
      this.auth, 
      data.email, 
      data.password
    );
    
    await Promise.all([
      updateProfile(credential.user, { displayName: data.displayName }),
      this.updateUserDoc(credential.user)
    ]); 

    // this.router.navigateByUrl(this.userInRedirect);
  }

  async login(data: LoginData): Promise<void> {
    if (!data.email || !data.password)
      throw Error('Invalid credentials');
    
    const credential = await signInWithEmailAndPassword(
      this.auth, 
      data.email, 
      data.password
    );

    // this.router.navigateByUrl(this.userInRedirect);
  }

  async oAuthLogin(provider: OAuthProvider): Promise<void> {
    const credential = await signInWithPopup(this.auth, provider);
    
    const exists = await firstValueFrom(
      docData(doc(this.firestore, `users/${credential.user.uid}`))
    );

    if (!exists) {
      await this.updateUserDoc(credential.user);
    }

    // this.router.navigateByUrl(this.userInRedirect);
  }

  async updateUserDoc(user: User | FirebaseUser, data?: UserData): Promise<void> {
    const payload: UserData = {
      isPro: false,
      saved: [],
    }

    if (data && data.isPro) payload.isPro = data.isPro;
    if (data && data.saved) payload.saved = data.saved;

    await setDoc(
      doc(this.firestore, `users/${user.uid}`), 
      payload, 
      { merge: true }
    );
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    if (!data.email) 
      throw Error('Email required');
    
    await sendPasswordResetEmail(this.auth, data.email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    // this.router.navigateByUrl(this.userOutRedirect);
  }

}
