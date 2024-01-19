import { LinkedList } from "./LinkedList";

function hashMap() {

  let capacity = 16;
  const loadFactor = 0.75;
  let buckets = new Array(capacity);
  let numberOfEntries = 0;

  let keysArray = [];
  let valuesArray = [];
  let entriesArray = [];



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

  function fetchIndexFromEntriesArray(key) {
    for (let i = 0; i < entriesArray.length; i += 1) {
      if (entriesArray[i].key === key) {
        return entriesArray[i].index;
      }
    }
  }

  function checkCapacity() {
    let currentLoadfactor = numberOfEntries/capacity;

    if (currentLoadfactor >= loadFactor) {
      increaseCapacity();
      increaseBuckets();
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

  function addToKeysArray(key) {
    keysArray.push(key);
  }

  function addToValuesArray(value) {
    valuesArray.push(value);
  }

  function addToEntriesArray(entry) {
    entriesArray.push(entry);
  }

  function removeFromKeysArray(key) {
    let index = keysArray.indexOf(key);
    keysArray.splice(index, 1);
  }

  function removeFromValuesArray(value) {
    let index = valuesArray.indexOf(value);
    valuesArray.splice(index, 1);
  }

  function removeFromEntriesArray(entry) {
    for (let i = 0; i < entriesArray.length; i += 1) {
      if (entriesArray[i].key === entry.key && entriesArray[i].value === entry.value) {
        entriesArray.splice(i, 1);
        return;
      }
    }
  }

  function updateValuesArray(oldValue, newValue) {
    for (let i = 0; valuesArray.length; i += 1) {
      if (valuesArray[i] === oldValue) {
        valuesArray[i] = newValue;
        break;
      }
    }
  }

  function updateEntriesArray(key, newValue) {
    for (let i = 0; entriesArray.length; i += 1) {
      if (entriesArray[i].key === key) {
        entriesArray[i].value = newValue;
        break;
      }
    }
  }

  function updateValue(key, oldValue, newValue) {
    updateValuesArray(oldValue, newValue);
    updateEntriesArray(key, newValue);
  }


  
  function hash(key) {
    return stringToNumber(key);
  }

  function length() {
    return numberOfEntries;
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
      addToKeysArray(key);
      addToValuesArray(value);
      addToEntriesArray(nodeItem);
      checkCapacity();
    } else {
      const linkedList = buckets[index];
      let node = linkedList.find(key);

      if (node === null) {
        linkedList.append(key, value, index);

        let nodeItem = new Node(key, value, index, null);

        increaseEntries();
        addToKeysArray(key);
        addToValuesArray(value);
        addToEntriesArray(nodeItem);
        checkCapacity();
      } else {
        let oldValue = node.value;
        
        node.value = value;
        updateValue(key, oldValue, value);
      }
    }
  }

  function get(key) {
    const index = modIndex(hash(key));

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
    const index = modIndex(hash(key));

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
    let index = fetchIndexFromEntriesArray(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const linkedList = buckets[index];
  
    if (linkedList === undefined) {
      return false;
    }
    
    const listIndex = linkedList.getIndex(key);
  
    if (listIndex === null) {
      return false;
    }

    let node = linkedList.removeAt(listIndex);

    if (linkedList.size() === 0) {
      delete buckets[index];
    }

    removeFromKeysArray(node.key);
    removeFromValuesArray(node.value);
    removeFromEntriesArray(node);
    decreaseEntries();
    return true;
  }
  
  function clear() {
    for (let i = 0; i < capacity; i += 1) {
      delete buckets[i];
    }

    capacity = 16;
    numberOfEntries = 0;
    buckets.length = capacity;
    keysArray = [];
    valuesArray = [];
    entriesArray = [];
  }
  
  function keys() {
    return keysArray;
  }
  
  function values() {
    return valuesArray;
  }
  
  function entries() {
    return entriesArray;
  }

  return { hash, set, get, has, remove, length, clear, keys, values, entries };
}