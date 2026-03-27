import type { StoredGroup } from '../application/types/IGroup';

const GROUPS_KEY = 'syncflow_groups';

export class LocalGroupRepository {
  private read(): StoredGroup[] {
    const raw = localStorage.getItem(GROUPS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private write(groups: StoredGroup[]): void {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  }

  public getAll(): StoredGroup[] {
    return this.read();
  }

  public create(name: string): StoredGroup {
    const group: StoredGroup = {
      id: crypto.randomUUID(),
      name,
      requestIds: [],
      childGroupIds: [],
      createdAt: new Date().toISOString(),
    };
    const all = this.read();
    all.push(group);
    this.write(all);
    return group;
  }

  public addRequest(groupId: string, requestId: string): void {
    const all = this.read();
    const g = all.find((g) => g.id === groupId);
    if (g && !g.requestIds.includes(requestId)) {
      g.requestIds.push(requestId);
      this.write(all);
    }
  }

  public removeRequest(groupId: string, requestId: string): void {
    const all = this.read();
    const g = all.find((g) => g.id === groupId);
    if (g) {
      g.requestIds = g.requestIds.filter((id: string) => id !== requestId);
      this.write(all);
    }
  }

  public addChildGroup(parentId: string, childId: string): void {
    const all = this.read();
    const parent = all.find((g) => g.id === parentId);
    if (parent && !parent.childGroupIds.includes(childId)) {
      parent.childGroupIds.push(childId);
      this.write(all);
    }
  }

  public delete(groupId: string): void {
    this.write(this.read().filter((g: StoredGroup) => g.id !== groupId));
  }
}
