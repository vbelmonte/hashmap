export class Node {
  
  value = null;
  nextNode = null;

  constructor (key, value, nextNode) {
    if (key !== undefined) {
      this.key = key;
    }
    if (value !== undefined) {
      this.value = value;
    }
    if (nextNode !== undefined) {
      this.nextNode = nextNode;
    }
  }

  get key() {
    return this._key;
  }

  set key(key) {
    this._key = key;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get nextNode() {
    return this._nextNode;
  }

  set nextNode(value) {
    this._nextNode = value;
  }
}