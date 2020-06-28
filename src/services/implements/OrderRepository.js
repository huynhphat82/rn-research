import ModelAbstract from "../contracts/ModelAbstract";

export default class OrderRepository extends ModelAbstract {

  constructor() {
    super();
    if (!this.model) {
      this.model = {}; // use model package
    }
  }

  insert() {
    throw new Error('This method has not been implemented yet.');
  }

  update() {
    throw new Error('This method has not been implemented yet.');
  }

  destroy() {
    throw new Error('This method has not been implemented yet.');
  }

  getBy() {
    throw new Error('This method has not been implemented yet.');
  }

  searchBy() {
    throw new Error('This method has not been implemented yet.');
  }

}
