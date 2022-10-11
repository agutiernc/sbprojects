const App = () => (
  <div>
    <Tweet 
      name="Bob"
      username="bob"
      message="This is message #1"
      date={new Date().toDateString()}
    />
    <hr />
    <Tweet 
      name="Tom"
      username="tom"
      message="This is message #2"
      date={new Date().toDateString()}
    />
    <hr />
    <Tweet 
      name="Bill"
      username="bill"
      message="This is message #3"
      date={new Date().toDateString()}
    />
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))