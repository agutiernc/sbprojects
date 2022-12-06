/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}


/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }


  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    }

    this.tail.next = newNode
    this.tail = newNode
    this.length += 1
  }


  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val)
    
    if (this.head === null) {
      this.head = newNode
    } else {
      // make the next of newNode the current head, then make the head the newNode
      newNode.next = this.head
      this.head = newNode
    }
    
    // if no items exist, make the only one the head and tail
    if (this.length === 0) {
      this.tail = this.head
    }

    // increment the list due to new addition
    this.length += 1
  }


  /** pop(): return & remove last item. */

  pop() {
    // loop through nodes until last one is null
    let current = this.head;

    while (current !== null) {
      if (current.next === null) {
        this.length--

        if (this.length === 1) {
          this.head.next = null
          this.tail = this.head
        }

        if (this.length === 0) {
          this.head = null
          this.tail = null
        }

        return current.val
      }
      
      current = current.next;
    }
  }


  /** shift(): return & remove first item. */

  shift() {
    let current = this.head

    // make original head's next be the new head
    this.head = current.next

    this.length-- // decrease length by 1

    if (this.length === 1) {
      this.tail = this.head
    }

    if (this.length === 0) {
      this.head = null
      this.tail = null
    }

    return current.val
  }


  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let current = this.head
    let count = 0

    while (current !== null) {
      if (idx === count) {
        return current.val
      }

      count++

      current = current.next
    }
  }


  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let current = this.head
    let count = 0

    while (current !== null) {
      if (count === idx) {
        current.val = val
      }

      count++

      current = current.next
    }
  }

  
  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // if index is out of range
    if (idx > 0 && idx > this.length) return;

    // if nothing exists, new node becomes head and tail
    if (idx === 0) {
      this.head = new Node(val)
      this.tail = this.head
      this.length++

      return;
    }

    const node = new Node(val)
    let current = this.head
    let count = 0
    let previous

    while (count < idx) {
      previous = current
      count++
      current = current.next
    }

    node.next = current
    previous.next = node
    this.tail = previous.next

    this.length++
  }

  
  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // if index is out of range
    if (idx > 0 && idx >= this.length) {
      return;
    }

    let current = this.head
    let previous
    let count = 0
   
    // remove first
    if (idx === 0) {
      this.head = current.next
    } else if (idx >= 0 && idx <= this.length) {
      while(count < idx) {
        count++
        console.log('current: ', current)
        previous = current
        current = current.next
      }

      previous.next = current.next
    }

    this.length--

    if (this.length === 0) {
      this.tail = null
      this.head = null
    }

    if (this.length === 1) {
      this.tail = this.head
    }
  }

  
  /** average(): return an average of all values in the list */

  average() {
    // if no initial value is given
    if (this.length === 0) return 0

    let current = this.head
    let sum = 0

    while (current !== null) {
      sum += current.val
      current = current.next
    }

    return sum / this.length
  }
}

module.exports = LinkedList;