import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {from, Observable} from 'rxjs';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseInterfaceService {

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter) { }

  private db$: Observable<SQLiteObject>;
  private sqlDump: any;

  init() {
    this.sqlDump =
    this.db$ = from(this.sqlite.create({
      name: 'gostyle_app-db',
      location: 'default',
    }));

  }

  importData(db$: Observable<SQLiteObject>, sqlDump: any) {
    db$.subscribe((database: SQLiteObject) => this.sqlitePorter.importJsonToDb(database, sqlDump));
  }
}
