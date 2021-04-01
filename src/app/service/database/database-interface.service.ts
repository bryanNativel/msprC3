import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {Platform} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DatabaseInterfaceService {


  constructor(protected sqlite: SQLite, protected sqlitePorter: SQLitePorter, protected platform: Platform, protected httpClient: HttpClient) {
    this.platform.ready().then(() => {
      console.debug(`%c${this.constructor.name} : Platform ready.`,'color: #1cd641')
      this.init()
    })
  }

  protected dbSnapshot: SQLiteObject;
  protected dbState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  protected db$: Observable<SQLiteObject>;

  init() {
    this.httpClient.get('assets/database/gostyle_app-db.dump.sql', {responseType: 'text'}).subscribe(sqlDump => {
      console.debug(`%c${this.constructor.name} : Successfully fetched sqldump from /assets !`, 'color: #1cd641')
      this.db$ = from(this.importData(sqlDump))
    })
  }

  async importData(sqlDump: string): Promise<SQLiteObject> {
    const db: SQLiteObject = await this.sqlite.create({
      name: 'gostyle_app-db',
      location: 'default',
    });
    console.debug(`%c${this.constructor.name} : Created or fetched sqlite instance %o !`, 'color: #1cd641', db)
    await this.sqlitePorter.importSqlToDb(db, sqlDump);
    console.debug(`%c${this.constructor.name} : Imported database successfully ! DB ready.`, 'color: #1cd641')
    this.dbState.next(true)
    this.dbSnapshot = db

    return db
  }

  isReady() {
    return this.dbState.asObservable()
  }
}
