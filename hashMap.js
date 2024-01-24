import { LinkedList } from "./LinkedList.js";
import { Node } from "./Node.js";

export function hashMap() {

  let capacity = 16;
  const loadFactor = 0.75;
  let buckets = new Array(capacity);
  let numberOfEntries = 0;



  function stringToNumber(string) {
    let number = 0;
    const primeNumber = 31;
    for (let i = 0; i < string.length; i += 1) {
      number = primeNumber * number + string.charCodeAt(i);
    }

    return number;
  }

  function modIndex(value) {
    const index = value % capacity;

    return index;
  }

  function overCapacity() {
    let currentLoadfactor = numberOfEntries/capacity;

    if (currentLoadfactor >= loadFactor) {
      return true;
    } else {
      return false;
    }
  }

  function increaseCapacity() {
    capacity = capacity * 2;
  }

  function increaseBuckets() {
    buckets.length = buckets.length * 2;
  }

  function increaseEntries() {
    numberOfEntries += 1;
  }

  function decreaseEntries() {
    numberOfEntries -= 1;
  }


  
  function hash(key) {
    return stringToNumber(key);
  }

  function length() {
    return numberOfEntries;
  }

  function entries() {
    let entries = [];

    for (let i = 0; i < buckets.length; i += 1) {
      if (buckets[i] !== undefined) {
        let node = buckets[i].head;

        while (node !== null) {
          entries.push({key: node.key, value: node.value});
          node = node.nextNode;
        }
      } 
    }

    return entries;
  }

  function copyEntriesToExpandedMap() {
      increaseCapacity();
      increaseBuckets();

      //copy every entry over to an array
      let ent = entries();

      //clear buckets
      for (let i = 0; i < capacity; i += 1) {
        delete buckets[i];
      }

      //add entry to the newly expanded hash table
      for (let i = 0; i < ent.length; i += 1) {
        const key = ent[i].key;
        const value = ent[i].value;
        const hashCode = hash(key);
        const index = modIndex(hashCode);

        if (index < 0 || index >= buckets.length) {
          throw new Error("Trying to access index out of bound");
        }

        if (buckets[index] === undefined) {
          let nodeItem = new Node(key, value, index, null);
          
          buckets[index] = new LinkedList(nodeItem, nodeItem);

        } else {
          const linkedList = buckets[index];
          linkedList.append(key, value, index);
        }
      }
  }

  function set(key, value) {
    const hashCode = hash(key);
    const index = modIndex(hashCode);
    
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    
    if (buckets[index] === undefined) {
      let nodeItem = new Node(key, value, index, null);

      buckets[index] = new LinkedList(nodeItem, nodeItem);

      increaseEntries();

    } else {
      const linkedList = buckets[index];
      let node = linkedList.find(key);

      if (node === null) {
        linkedList.append(key, value, index);
        increaseEntries();

      } else {
        node.value = value;
      }
    }

    if (overCapacity()) {
      copyEntriesToExpandedMap();
    }
  }

  function get(key) {
    let search = capacity;
    let index;

    while (search >= 1) {
      index = hash(key) % search;

      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
  
      const linkedList = buckets[index];
      
      if (linkedList !== undefined) {
        const node = linkedList.find(key);
  
        if (node !== null) {
          return node.value;
        }
      }

      search = search / 2;
    }

    return null;
  }

  function has(key) {
    let search = capacity;
    let index;

    while (search >= 1) {
      index = hash(key) % search;

      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
  
      const linkedList = buckets[index];
      
      if (linkedList !== undefined) {
        const result = linkedList.contains(key);
  
        if (result) {
          return true;
        }
      }

      search = search / 2;
    }

    return false;
  }
  
  function remove(key) {
    let search = capacity;
    let index;

    while (search >= 1) {
      index = hash(key) % search;

      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
  
      const linkedList = buckets[index];
      
      if (linkedList !== undefined) {
        const nodeIndex = linkedList.getIndex(key);
  
        if (nodeIndex !== null) {
          linkedList.removeAt(nodeIndex);

          if (linkedList.size() === 0) {
            delete buckets[index];
          }
          decreaseEntries();

          return true;
        }
      }

      search = search / 2;
    }

    return false;
  }
  
  function clear() {
    for (let i = 0; i < capacity; i += 1) {
      delete buckets[i];
    }

    capacity = 16;
    numberOfEntries = 0;
    buckets.length = capacity;
  }
  
  function keys() {
    let keys = [];

    for (let i = 0; i < buckets.length; i += 1) {
      if (buckets[i] !== undefined) {
        let node = buckets[i].head;

        while (node !== null) {
          keys.push(node.key);
          node = node.nextNode;
        }
      } 
    }

    return keys;
  }
  
  function values() {
    let values = [];

    for (let i = 0; i < buckets.length; i += 1) {
      if (buckets[i] !== undefined) {
        let node = buckets[i].head;

        while (node !== null) {
          values.push(node.value);
          node = node.nextNode;
        }
      } 
    }

    return values;
  }

  return { buckets, hash, set, get, has, remove, length, clear, keys, values, entries };
}