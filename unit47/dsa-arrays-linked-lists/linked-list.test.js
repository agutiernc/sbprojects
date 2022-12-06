const LinkedList = require("./linked-list");

// describe("push", function() {
//   it("appends node and increments length", function() {
//     let lst = new LinkedList();

//     lst.push(5);
//     expect(lst.length).toBe(1);
//     expect(lst.head.val).toBe(5);
//     expect(lst.tail.val).toBe(5);

//     lst.push(10);
//     expect(lst.length).toBe(2);
//     expect(lst.head.val).toBe(5);
//     expect(lst.head.next.val).toBe(10);
//     expect(lst.tail.val).toBe(10);

//     lst.push(15);
//     expect(lst.length).toBe(3);
//     expect(lst.head.val).toBe(5);
//     expect(lst.head.next.next.val).toBe(15);
//     expect(lst.tail.val).toBe(15);
//   });
// });


// describe("unshift", function() {
//   it("adds node at start and increments length", function() {
//     let lst = new LinkedList();

//     lst.unshift(5);
//     expect(lst.length).toBe(1);
//     expect(lst.head.val).toBe(5);
//     expect(lst.tail.val).toBe(5);

//     lst.unshift(10);
//     expect(lst.length).toBe(2);
//     expect(lst.head.val).toBe(10);
//     expect(lst.head.next.val).toBe(5);
//     expect(lst.tail.val).toBe(5);

//     lst.unshift(15);
//     expect(lst.length).toBe(3);
//     expect(lst.head.val).toBe(15);
//     expect(lst.head.next.next.val).toBe(5);
//     expect(lst.tail.val).toBe(5);
//   });
// });


// describe("pop", function() {
//   it("removes node at end and decrements length", function() {
//     let lst = new LinkedList([5, 10]);

//     expect(lst.pop()).toBe(10);
//     expect(lst.head.val).toBe(5);
//     expect(lst.tail.val).toBe(5);
//     expect(lst.length).toBe(1);

//     expect(lst.pop()).toBe(5);
//     expect(lst.tail).toBe(null);
//     expect(lst.head).toBe(null);
//     expect(lst.length).toBe(0);
//   });
// });


// describe("shift", function() {
//   it("removes node at start and decrements length", function() {
//     let lst = new LinkedList([5, 10]);

//     expect(lst.shift()).toBe(5);
//     expect(lst.tail.val).toBe(10);
//     expect(lst.length).toBe(1);

//     expect(lst.shift()).toBe(10);
//     expect(lst.tail).toBe(null);
//     expect(lst.head).toBe(null);
//     expect(lst.length).toBe(0);
//   });
// });


// describe("getAt", function() {
//   it("gets val at index", function() {
//     let lst = new LinkedList([5, 10]);

//     expect(lst.getAt(0)).toBe(5);
//     expect(lst.getAt(1)).toBe(10);
//   });
// });


// describe("setAt", function() {
//   it("sets val at index", function() {
//     let lst = new LinkedList([5, 10]);

//     expect(lst.setAt(0, 1));
//     expect(lst.setAt(1, 2));
//     expect(lst.head.val).toBe(1);
//     expect(lst.head.next.val).toBe(2);
//   });
// });


describe("insertAt", function() {
  it("inserts node and adjusts nearby nodes", function() {
    let lst = new LinkedList([5, 10, 15, 20]);

    lst.insertAt(2, 12);
    expect(lst.length).toBe(5);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.head.next.next.val).toBe(12);
    expect(lst.head.next.next.next.val).toBe(15);
    expect(lst.head.next.next.next.next.val).toBe(20);

    lst.insertAt(5, 25);
    expect(lst.head.next.next.next.next.next.val).toBe(25);
    expect(lst.tail.val).toBe(25);
  });

  it("inserts into empty list", function() {
    let lst = new LinkedList();

    lst.insertAt(0, 5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });
});


// describe("removeAt", function() {
//   it("removes from item lists", function() {
//     let lst = new LinkedList(["a"]);
//     let lst2 = new LinkedList([1, 3, 5]);
//     let lst3 = new LinkedList([5, 10])

//     // remove first item
//     lst.removeAt(0);

//     expect(lst.length).toBe(0);
//     expect(lst.head).toBe(null);
//     expect(lst.tail).toBe(null);

//     // // remove middle item
//     lst2.removeAt(1)

//     expect(lst2.length).toBe(2);

//     // // remove last element
//     lst2.removeAt(2)

//     expect(lst2.length).toBe(2);


//     lst3.removeAt(1)

//     expect(lst3.length).toEqual(1)
//     expect(lst3.head.val).toEqual(5)
//     expect(lst3.tail.val).toEqual(5)
//   });
// });


// describe("average", function() {
//   it("calculates the average of items in a list", function() {
//     let lst = new LinkedList([2, 3, 1, 1, 7, 6, 9]);
//     expect(lst.average()).toBeCloseTo(4.1429, 4);
//   });

//   it("returns 0 for empty lists", function() {
//     let lst = new LinkedList();
//     expect(lst.average()).toBe(0);
//   });
// });
