export interface Modal {
  modalColor: 'main' | 'yellow' | 'red';
  modalTitle: string;
  css?: string;
  contentCss?: string;
  hideCloseBtn?: boolean;
}
