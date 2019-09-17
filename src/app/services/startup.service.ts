import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class StartupService {
    baseUrl = environment.BASE_URL;
    private _startupData: any;

    constructor(private http: HttpClient) { }

    load(): Promise<any> {
        this._startupData = null;
        const url = `${this.baseUrl}/rest/employee/detail`;
        const promise = this.http.get(url)
            .toPromise()
            .then((data: any) => {
            this._startupData = data['data'];
            })
            .catch((err: any) => Promise.resolve());
        return promise;
    }

    public startupData(): any {
        return this._startupData;
    }
}
