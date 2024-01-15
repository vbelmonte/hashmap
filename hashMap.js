import { LinkedList } from "./LinkedList";

function hashMap() {

  let capacity = 16;
  const loadFactor = 0.75;
  let buckets = new Array(capacity);
  let numberOfEntries = 0;

  let keys = [];
  let values = [];
  let entries = [];



  function stringToNumber(string) {
    let number = 0;
    const primeNumber = 31;
    for (let i = 0; i < string.length; i += 1) {
      number = primeNumber * number + string.charCodeAt(i);
    }

    return number;
  }

  function checkCapacity() {
    let currentLoadfactor = numberOfEntries/capacity;

    if (currentLoadfactor >= loadFactor) {
      increaseCapacity();
    }
  }

  function increaseCapacity() {
    capacity = capacity * 2;
  }

  function increaseEntries() {
    numberOfEntries += 1;
  }

  function decreaseEntries() {
    numberOfEntries -= 1;
  }

  function addToValuesArray(value) {
    values.push(value);
  }

  function addToEntriesArray(entry) {
    entries.push(entry);
  }

  function removeFromKeysArray(key) {
    let index = keys.indexOf(key);
    keys.splice(index, 1);
  }

  function removeFromValuesArray(value) {
    let index = values.indexOf(value);
    values.splice(index, 1);
  }

  function removeFromEntriesArray(entry) {
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i].key === entry.key && entries[i].value === entry.value) {
        entries.splice(i, 1);
        return;
      }
    }
  }


  
  function hash(key) {
    let number = stringToNumber(key);
    const hashCode = number % capacity;

    return hashCode;
  }

  function length() {
    return numberOfEntries;
  }

  function set(key, value) {
    const index = hash(key);
    
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    
    if (buckets[index] === undefined) {
      let nodeItem = new Node(key, value);
      buckets[index] = new LinkedList(nodeItem, nodeItem);

      increaseEntries();
      addToKeysArray(key);
      addToValuesArray(value);
      addToEntriesArray(nodeItem);
      checkCapacity();
    } else {
      const linkedList = buckets[index];
      let node = linkedList.find(key);

      if (node === null) {
        linkedList.append(key, value);

        let nodeItem = new Node(key, value);

        increaseEntries();
        addToKeysArray(key);
        addToValuesArray(value);
        addToEntriesArray(nodeItem);
        checkCapacity();
      } else {
        node.value = value;
      }
    }
  }

  function get(key) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const linkedList = buckets[index];
    
    if (linkedList === undefined) {
      return null;
    } else {
      const node = linkedList.find(key);

      if (node === null) {
        return null;
      } else {
        return node.value;
      }
    }
  }

  function has(key) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const linkedList = buckets[index];
  
    if (linkedList === undefined) {
      return false;
    } else {
      if (linkedList.contains(key)) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  function remove(key) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const linkedList = buckets[index];
  
    if (linkedList === undefined) {
      return false;
    } else {
      const listIndex = linkedList.getIndex(key);
  
      if (listIndex === null) {
        return false;
      } else {
        let node = linkedList.removeAt(listIndex);
        removeFromKeysArray(node.key);
        removeFromValuesArray(node.value);
        removeFromEntriesArray(node);
        decreaseEntries();
        return true;
      }
    }
  }
  
  function clear() {
    for (let i = 0; i < capacity; i += 1) {
      delete buckets[i];
    }
    capacity = 16;
    numberOfEntries = 0;
    buckets.length = capacity;
    keys = [];
    values = [];
    entries = [];
  }
  
  function keys() {
    return keys;
  }
  
  function values() {
    return values;
  }
  
  function entries() {
    return entries;
  }

  return { hash, set, get, has, remove, length, clear, keys, values, entries };
}