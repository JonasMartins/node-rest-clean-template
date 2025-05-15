export abstract class Repository<T> {
  protected items: Map<string, T>;

  constructor(table: Map<string, T>) {
    this.items = table;
  }

  insert(id: string, item: T): void {
    if (!this.items.has(id)) {
      this.items.set(id, item);
    }
  }

  update(id: string, item: T): void {
    this.items.set(id, item);
  }

  getAll(): Array<T> {
    return Array.from(this.items.values());
  }

  clearAll(): void {
    this.items.clear();
  }
}
