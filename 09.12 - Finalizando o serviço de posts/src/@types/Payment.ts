import { AlgaNews } from "./AlgaNews";

export namespace Payment {
  export type Input = AlgaNews.components['schemas']['PaymentInput']
  export type Detailed = AlgaNews.components['schemas']['PaymentDetailed']
  export type Summary = AlgaNews.components['schemas']['PaymentSummary']
  export type Preview = AlgaNews.components['schemas']['PaymentPreview']
  export type PreviewInput = AlgaNews.components['schemas']['PaymentPreviewInput']
  export type Paginated = AlgaNews.components['schemas']['PaymentsPaginated']
  export type PostWithEarnings = AlgaNews.components['schemas']['PostWithEarnings']

  export type Query = {
    payeeId?: number;
    payeeEmail?: number;
    scheduledToMonth?: string;
    page?: number;
    size?: number;
    sort: [keyof Summary, 'asc' | 'desc'];
  };
}