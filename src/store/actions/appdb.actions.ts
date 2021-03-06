import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/debounceTime";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../application.state";
import {Observable} from "rxjs";

export const APP_INIT = 'APP_INIT';
export const ACTION_INJECT_SDK = 'ACTION_INJECT_SDK';
export const ACTION_TWO_FACTOR_REMOVED = 'ACTION_TWO_FACTOR_REMOVED';

export enum AuthenticateFlags {
    NONE,
    USER_ACCOUNT,
    ENTERPRISE_ACCOUNT,
    WRONG_TWO_FACTOR,
    WRONG_PASS,
    TWO_FACTOR_ENABLED,
    AUTH_PASS_NO_TWO_FACTOR,
    TWO_FACTOR_CHECK,
    TWO_FACTOR_FAIL,
    TWO_FACTOR_PASS,
    TWO_FACTOR_UPDATE_PASS,
    TWO_FACTOR_UPDATE_FAIL
}

@Injectable()
export class AppdbAction {

    constructor(private store: Store<ApplicationState>, private http: Http) {
    }

    public initAppDb() {
        return {
            type: APP_INIT,
            payload: Date.now()
        }
    }

    public getQrCodeTwoFactor(): Observable<string> {
        return this.store.select(store => store.appDb.appBaseUrlCloud)
            .take(1)
            .mergeMap(appBaseUrlCloud => {
                var url = appBaseUrlCloud.replace('END_POINT', 'twoFactorGenQr');
                return this.http.get(url)
                    .catch((err: any) => {
                        return Observable.throw(err);
                    })
                    .map(res => {
                        this.store.dispatch({type: ACTION_TWO_FACTOR_REMOVED})
                        return res.text();
                    })
            })
    }
}
