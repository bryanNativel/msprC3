import {Injectable} from '@angular/core';
import {DatabaseInterfaceService} from "./database-interface.service";
import {from, Observable} from "rxjs";
import {IHistoric} from "../../interface/ihistoric";
import {SqlComparisonOperator, SqlHelper} from "../../_helpers/sql-helper";
import {concatMap, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HistoricService extends DatabaseInterfaceService {

  private tableName: string = "historic";
  private sqlHelper: SqlHelper = new SqlHelper()

  getAll(): Observable<IHistoric[]> {
    return this.isReady().pipe(concatMap(_ => _ ? this.getAllQuery() : []))
  }

  getAllForUser(userId: number): Observable<IHistoric[]> {
    return this.getAll().pipe(map(historic => historic.filter(_=> _.scannedBy == userId)))
  }

  private getAllQuery(): Observable<IHistoric[]> {

    const sqlStmt = this.sqlHelper.selectAll(this.tableName)
    return this.db$.pipe(concatMap(db => db.executeSql(sqlStmt, []).then(res => [...new Array<IHistoric>(res.rows.length)].map((_, i) => res.rows.item(i)))))
    /*return from(this.dbSnapshot.executeSql(sqlStmt, []).then(res =>
      [...new Array<IHistoric>(res.rows.length)].map((_, i) => res.rows.item(i))
    ))*/
  }
  getOne(id: number): Observable<IHistoric> {
    const sqlStmt = this.sqlHelper.selectAll(this.tableName) + this.sqlHelper.where({left: 'couponId', operator: SqlComparisonOperator.Equal, right: '?'})
    return from(this.dbSnapshot.executeSql(sqlStmt, [id]).then(res => res.rows.item(0) || null
    ))
  }

}
