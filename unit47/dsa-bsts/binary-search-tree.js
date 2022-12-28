class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }


  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val)

      return this
    }

    let current = this.root
    
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val)

          return this
        } else {
          current = current.left
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val)

          return this
        }
      } else {
        current = current.right
      }
    }
  }


  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (this.root === null) {
      this.root = new Node(val)

      return this
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val)

        return this
      }

      return this.insertRecursively(val, current.left)
    } else {
      if (current.right === null) {
        current.right = new Node(val)

        return this
      }

      return this.insertRecursively(val, current.right)
    }
  }


  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root

    while (currentNode) {
      if (currentNode.val === val) return currentNode

      if (currentNode.val > val) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    return currentNode ? currentNode : undefined
  }


  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root) {
    if (this.root === null) return undefined

    if (val < currentNode.val) {
      if (currentNode.left === null) return undefined

      return this.findRecursively(val, currentNode.left)
    } else if (val > currentNode.val) {
      if (currentNode.right === null) return undefined

      return this.findRecursively(val, currentNode.right)
    }

    return currentNode
  }


  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
   const nodes = []

   function traverse(current) {
    nodes.push(current.val)

    if (current.left) traverse(current.left)
    if (current.right) traverse(current.right)
   }
   
   traverse(this.root)
   
   return nodes
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const nodes = []

    function traverse(node) {
      if (node.left) traverse(node.left)

      nodes.push(node.val)

      if (node.right) traverse(node.right)
    }

    traverse(this.root)

    return nodes
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const nodes = []

    function traverse(node) {
      if (node.left) traverse(node.left)

      if (node.right) traverse(node.right)

      nodes.push(node.val)
    }

    traverse(this.root)
    
    return nodes
  }


  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (this.root === null) return []

    const nodes = []
    const queue = [this.root]

    while(queue.length) {
      const current = queue.shift()

      nodes.push(current.val)

      if (current.left) {
        queue.push(current.left)
      }

      if (current.right) {
        queue.push(current.right)
      }
    }
    
    return nodes
  }


  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
