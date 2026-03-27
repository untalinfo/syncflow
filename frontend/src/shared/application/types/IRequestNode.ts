export interface IRequestNode {
  id: string;
  name: string;
  count(): number;
  flatten(): SyncRequest[];
}

export type Status = 'Pending' | 'Processed' | 'Failed';

export interface SyncRequest extends IRequestNode {
  payload: string;
  status: Status;
  type: string;
  createdAt: string;
}
