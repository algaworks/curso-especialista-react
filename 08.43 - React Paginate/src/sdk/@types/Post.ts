import { AlgaNews } from "./AlgaNews";

export namespace Post {
  export type Input = AlgaNews.components['schemas']['PostInput']
  export type Detailed = AlgaNews.components['schemas']['PostDetailed']
  export type Summary = AlgaNews.components['schemas']['PostSummary']
  export type Paginated = AlgaNews.components['schemas']['PostsPaginated']
  export type WithEarnings = AlgaNews.components['schemas']['PostWithEarnings']

  export type Query = {
    editorId?: number
    page?: number
    size?: number
    showAll?: boolean
    sort?: [keyof Summary, 'asc' | 'desc']
  }
}