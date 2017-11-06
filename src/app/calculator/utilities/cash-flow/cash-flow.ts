export interface CashFlowForm {
  lifeYears?: number,
  energySavings?: number,
  salvageInput?: number,
  installationCost?: number,
  operationCost?: number,
  fuelCost?: number,
  disposal?: number
}

export interface CashFlowResults {
  benefits?: number,
  cost?: number,
  results?: number,
  payback?: number
}
