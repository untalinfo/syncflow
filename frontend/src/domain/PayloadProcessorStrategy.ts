import type { SyncRequest } from './IRequestNode';

/**
 * Patrón Strategy: Define cómo se debe tratar el payload de una solicitud.
 */
export interface IPayloadProcessorStrategy {
  /** Devuelve true si esta estrategia aplica al tipo de solicitud dado */
  canProcess(type: string): boolean;
  
  /** Ejecuta la transformación sobre la solicitud */
  process(request: SyncRequest): SyncRequest;
}
