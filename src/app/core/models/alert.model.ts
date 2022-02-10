export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: AlertType;
  text: string;
}
