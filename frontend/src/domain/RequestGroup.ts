import type { IRequestNode, SyncRequest } from './IRequestNode';

/**
 * Patrón Composite: Representa una agrupación que puede contener tanto 
 * Solicitudes individuales como otras Agrupaciones.
 */
export class RequestGroup implements IRequestNode {
  public id: string;
  public name: string;
  private children: IRequestNode[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public add(child: IRequestNode): void {
    this.children.push(child);
  }

  public remove(childId: string): void {
    this.children = this.children.filter(c => c.id !== childId);
  }

  public count(): number {
    return this.children.reduce((total, child) => total + child.count(), 0);
  }

  public flatten(): SyncRequest[] {
    const allReqs: SyncRequest[] = [];
    for (const child of this.children) {
      allReqs.push(...child.flatten());
    }
    return allReqs;
  }
}
