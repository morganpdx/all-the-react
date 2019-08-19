import React from 'react'
import ReactDOM from 'react-dom'

// Components can manage their own state, and then compose them all together
// Components have lifecycle; fetching data and such
// State
// UI - Not a violation of concerns, since the

class App extends React.Component {
  render () {
    return (
      <div>
        Hello World!
      </div>
    )
  }
}

// (React Element, Where to render the React Element to)
ReactDOM.render(
  <App />,
  document.getElementById('app')
)
