/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let newNode = new Node(val)

    if (this.size === 0) {
      this.first = newNode
      this.last = newNode
    } else {
      let prev = this.last

      prev.next = newNode
      this.last = newNode
    }

    this.size++
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    // make the first.next the first instead
    // return the first original value
    if (this.size === 0) {
      throw new Error('Unable to dequeue due to empty queue')
    }

    const node = this.first

    if (this.first === this.last) {
      this.last = null
    }

    this.first = this.first.next

    this.size--

    return node.val
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first.val
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size === 0
  }
}

module.exports = Queue;
