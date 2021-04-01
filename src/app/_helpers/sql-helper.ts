export enum SqlComparisonOperator{
  Equal = '=',
  NotEqual = '!=',
  LessThan = '<',
  GreatThan = '>',
  LessOrEqual = '<=',
  GreatOrEqual ='>='
}

export enum SqlLogicalOperator {
  In = 'IN',
  And = 'AND',
  Or = 'OR',
  Between = 'BETWEEN',
  Like = 'LIKE',
  Not = 'NOT',
}

interface SqlCondition {
  left: string,
  operator: SqlComparisonOperator | SqlLogicalOperator,
  right: string | SqlCondition
}


export class SqlHelper{
  select(tableName: string, columns: string[], distinct: boolean = false) {
    const stmt = `SELECT${distinct ? ' DISTINCT': ''}`
    const columnStmt = columns.filter(_ => _.trim()).map(_ => `\`${_.trim()}\``).join(',')
    const tableStmt = `FROM ${tableName}`
    return `${stmt} ${columnStmt} ${tableStmt}`
  }

  selectAll(tableName: string, distinct: boolean = false) {
    return `SELECT${distinct ? ' DISTINCT' : '' } * FROM ${tableName}`
  }

  delete(tableName: string, condition: string) {
    return `DELETE FROM ${tableName} ${condition}`
  }

  where(condition: SqlCondition) {
    return `WHERE ${this.computeCondtion(condition)}`
  }

  computeCondtion(condition: SqlCondition): string{
    const conditionRight: string = this.instanceOfSqlCondition(condition.right) ? this.computeCondtion(condition.right) : condition.right
    return `${condition.left} ${condition.operator} ${conditionRight}`
  }

  instanceOfSqlCondition(obj: any): obj is SqlCondition {
    return 'left' in obj || 'operator' in obj && 'right' in obj;
  }

}
