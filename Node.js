export class Node {
  
  key = null;
  value = null;
  index = null;
  nextNode = null;

  constructor (key, value, index, nextNode) {
    if (key !== undefined) {
      this.key = key;
    }
    if (value !== undefined) {
      this.value = value;
    }
    if (index !== undefined) {
      this.index = index;
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

  get index() {
    return this._index;
  }

  set index(index) {
    this._index = index;
  }

  get nextNode() {
    return this._nextNode;
  }

  set nextNode(value) {
    this._nextNode = value;
  }
}