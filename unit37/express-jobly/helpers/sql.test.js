const { sqlForPartialUpdate } = require('./sql')


describe('sqlForPartialUpdate function', function () {

  test("Test for 1 item", function () {
    const result = sqlForPartialUpdate(
        { field1: "testing" },
        { f1ield1: "testing", field2: "test again" });

    expect(result).toEqual({
      setCols: '"field1"=$1',
      values: ["testing"],
    });
  });


  test("Test for 2 items", function () {
    const result = sqlForPartialUpdate(
        { field1: "testing", field2: "test2" },
        { jsField2: "field2" });

    expect(result).toEqual({
      setCols: '"field1"=$1, "field2"=$2',
      values: ["testing", "test2"],
    });
  });
})