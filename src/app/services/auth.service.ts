import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable, Inject } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth, AuthProviders, AuthMethods, AngularFire, FirebaseApp } from 'angularfire2';
import { UserInfo } from './user-info';
import { Observable, Subject, ReplaySubject, AsyncSubject } from 'rxjs/Rx';
import Auth = firebase.auth.Auth;

@Injectable()
export class AuthService {
    private _userInfoSubject: ReplaySubject<UserInfo>;
    private _user: User;
    private _fbAuth: Auth;

    constructor(
        private _afAuth: AngularFireAuth,
        private _db: AngularFireDatabase,
        @Inject(FirebaseApp) firebaseApp: any
    ) {
        this._initUserInfoSubject();
        this._fbAuth = firebaseApp.auth();

        _afAuth.subscribe(auth => {

            const userInfo = new UserInfo();
            if (auth != null) {
                this._user = auth.auth;
                userInfo.isAnonymous = auth.auth.isAnonymous;
                userInfo.email = auth.auth.email;
                userInfo.displayName = auth.auth.displayName;
                userInfo.providerId = auth.auth.providerId;
                userInfo.photoURL = auth.auth.photoURL;
                userInfo.uid = auth.auth.uid;
            } else {
                this._user = null;
                userInfo.isAnonymous = true;
            }
            this._userInfoSubject.next(userInfo);
        });
    }

    login(email: string, password: string): Observable<string> {
        const result = new Subject<string>();
        this._initUserInfoSubject();
        this._afAuth.login({ email: email, password: password })
            .then(() => result.next('success'))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    private _initUserInfoSubject() {
        this._userInfoSubject = new ReplaySubject<UserInfo>(1);
    }

    currentUser(): Observable<UserInfo> {
        return this._userInfoSubject.asObservable();
    }

    logout(): Observable<string> {
        const result = new Subject<string>();
        this._initUserInfoSubject();
        this._afAuth.logout()
            .then(() => result.next('success'))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    isLoggedIn(): Observable<boolean> {
        const isLoggedInBS = new AsyncSubject<boolean>();
        this._userInfoSubject.subscribe(ui => {
            isLoggedInBS.next(!ui.isAnonymous);
            isLoggedInBS.complete();
        });
        return isLoggedInBS;
    }

    isAdministrator(): Observable<boolean> {
        return this._userInfoSubject
            .switchMap(u => Observable.from(
                this._db.object(`/administrators/${u.uid}`)))
            .map(x => x.$value === true);
    }

    isModerator(): Observable<boolean> {
        return this._userInfoSubject
            .switchMap(u => Observable.from(
                this._db.object(`/moderators/${u.uid}`)))
            .map(x => x.$value === true);
    }

    updateDisplayName(displayName: string): Observable<string> {
        const result = new Subject<string>();
        this._user.updateProfile({ displayName: displayName, photoURL: null }).then(a => {
            result.next('onSuccess');
        }).catch(err => result.error(err));
        return result;
    }

    createUser(email: string, password: string, displayName: string): Observable<string> {
        const result = new Subject<string>();
        this._afAuth.createUser({ email: email, password: password })
            .then(auth => {
                auth.auth.updateProfile({ displayName: displayName, photoURL: null });
                result.next('success');
            })
            .catch(err => result.error(err));
        return result.asObservable();
    }

    updateEmail(email: string): Observable<string> {
        const result = new Subject<string>();
        this._user.updateEmail(email).then(a => {
            result.next('success');
        }).catch(err => result.error(err));
        return result.asObservable();
    }

    updatePassword(password: string): Observable<string> {
        const result = new Subject<string>();
        this._user.updatePassword(password).then(a => {
            result.next('success');
        }).catch(err => result.error(err));
        return result.asObservable();
    }

    sendPasswordResetEmail(email: string): Observable<string> {
        const result = new Subject<string>();
        this._fbAuth.sendPasswordResetEmail(email)
            .then(() => result.next('success'))
            .catch(err => result.error(err));
        return result;
    }

    loginViaProvider(provider: string): Observable<String> {
        const result = new Subject<string>();
        if (provider === 'google') {
            this._afAuth
                .login({ provider: AuthProviders.Google, method: AuthMethods.Popup })
                .then(auth => result.next('success'))
                .catch(err => result.error(err));
            return result.asObservable();
        } else if (provider === 'twitter') {
            this._afAuth
                .login({ provider: AuthProviders.Twitter, method: AuthMethods.Popup })
                .then(auth => result.next('success'))
                .catch(err => result.error(err));
            return result.asObservable();
        } else if (provider === 'facebook') {
            this._afAuth
                .login({ provider: AuthProviders.Facebook, method: AuthMethods.Popup })
                .then(auth => result.next('success'))
                .catch(err => result.error(err));
            return result.asObservable();
        }
        result.error('Not a supported authentication method: ' + provider);
        return result.asObservable();
    }
}