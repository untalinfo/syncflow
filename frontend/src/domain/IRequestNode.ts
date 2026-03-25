export interface IRequestNode {
  /** Un identificador único */
  id: string;
  
  /** Nombre del nodo (solicitud o grupo) */
  name: string;
  
  /** Retorna el número de solicitudes contenidas (1 si es simple, N si es grupo) */
  count(): number;
  
  /** Retorna una vista plana de todas las solicitudes que contiene */
  flatten(): SyncRequest[];
}

export type Status = 'Pending' | 'Processed' | 'Failed';

export interface SyncRequest extends IRequestNode {
  payload: string;
  status: Status;
  type: string;
  createdAt: string;
}
