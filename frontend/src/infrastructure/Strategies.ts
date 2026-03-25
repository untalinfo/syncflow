import type { IPayloadProcessorStrategy } from '../domain/PayloadProcessorStrategy';
import type { SyncRequest } from '../domain/IRequestNode';

export class TextTransformStrategy implements IPayloadProcessorStrategy {
  canProcess(type: string): boolean {
    return type === 'text-transform';
  }

  process(request: SyncRequest): SyncRequest {
    // Ejemplo de regla: pasa a Mayúsculas el payload (si es texto puro)
    return {
      ...request,
      payload: request.payload.toUpperCase()
    };
  }
}

export class StructureModifyStrategy implements IPayloadProcessorStrategy {
  canProcess(type: string): boolean {
    return type === 'structure-modify';
  }

  process(request: SyncRequest): SyncRequest {
    // Ejemplo de regla: envuelve el texto en una estructura JSON con metadatos
    const newPayload = JSON.stringify({
      originalText: request.payload,
      modifiedAt: new Date().toISOString()
    });

    return {
      ...request,
      payload: newPayload
    };
  }
}

/** Instancia que aplica la estrategia adecuada */
export class PayloadProcessor {
  private strategies: IPayloadProcessorStrategy[];

  constructor(strategies: IPayloadProcessorStrategy[]) {
    this.strategies = strategies;
  }

  public process(request: SyncRequest): SyncRequest {
    const strategy = this.strategies.find(s => s.canProcess(request.type));
    if (strategy) {
      return strategy.process(request);
    }
    // Si no hay estrategia para este tipo, se envía inalterado
    return request;
  }
}
