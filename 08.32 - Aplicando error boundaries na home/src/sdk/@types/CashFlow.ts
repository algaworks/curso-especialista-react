import { AlgaNews } from "./AlgaNews";

export namespace CashFlow {
  export type CategoryDetailed = AlgaNews.components['schemas']['CashFlowCategoryDetailed']
  export type CategorySummary = AlgaNews.components['schemas']['CashFlowCategorySummary']
  export type CategoryIdInput = AlgaNews.components['schemas']['CashFlowCategoryIdInput']
  export type CategoryMinimal = AlgaNews.components['schemas']['CashFlowCategoryMinimal']
  export type CategoryInput = AlgaNews.components['schemas']['CashFlowCategoryInput']
  export type EntryType = AlgaNews.components['schemas']['CashFlowEntryType']
  export type EntrySummary = AlgaNews.components['schemas']['CashFlowEntrySummary']
  export type EntryDetailed = AlgaNews.components['schemas']['CashFlowEntryDetailed']
  export type EntryInput = AlgaNews.components['schemas']['CashFlowEntryInput']
}