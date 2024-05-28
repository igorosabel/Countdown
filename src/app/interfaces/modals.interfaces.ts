export interface Modal {
  modalColor: 'blue' | 'yellow' | 'red';
  modalTitle: string;
  css?: string;
  contentCss?: string;
  hideCloseBtn?: boolean;
}
