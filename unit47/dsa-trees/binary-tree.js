/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}


class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0

    function minDepthHelper(node) {
      if (node.left === null && node.right === null) return 1

      if (node.left === null) {
        return minDepthHelper(node.right) + 1
      }

      if (node.right === null) {
        return minDepthHelper(node.left) + 1
      }

      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1
    }

    return minDepthHelper(this.root)
  }


  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0
    
    function calc(node) {
      if (!node) return 0

      return Math.max(1 + calc(node.left), 1 + calc(node.right))
    }

    return calc(this.root)
  }


  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0

    let result = [this.root.val]

    function calc(node) {
      if (!node) return 0

      let leftMax = calc(node.left)
      let rightMax = calc(node.right)

      leftMax = Math.max(leftMax, 0)
      rightMax = Math.max(rightMax, 0)

      result[0] = Math.max(result[0], node.val + leftMax + rightMax)

      return node.val + Math.max(leftMax, rightMax)
    }

    calc(this.root)
    
    return result[0]
  }


  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null

    let result = []

    function nextLargerHelper(node) {
      if (!node) return null

      if (node.val > lowerBound) {
        result.push(node.val)
      }
    
      nextLargerHelper(node.left)
      nextLargerHelper(node.right)
      
      return result
    }

    nextLargerHelper(this.root)

    return result.length === 0 ? null : result[result.length - 1]
  }


  /** Further study!
   * 
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // check childs of root, which are cousins
    // check if child of the child is cousin of the other
   
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
} // end class

module.exports = { BinaryTree, BinaryTreeNode };
