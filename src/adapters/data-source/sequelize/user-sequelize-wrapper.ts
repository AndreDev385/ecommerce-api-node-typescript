export interface SequelizeWrapper {
  findAll(query: object): Promise<any[]>;
  create(doc: any): Promise<any>;
  findOne(query: object): Promise<any>
  updateRole(id: number, role: string): Promise<any>
  deleteOne(id: number): Promise<any>
}
