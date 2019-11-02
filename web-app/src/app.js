import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom'

import LoadingArtifact from 'atoms/LoadingArtifact'
import Home from 'components/pages/Home'
import { globalContext, useSession, useGlobal } from 'src/globalState'

function DataPanel() {
  const { data } = useSession()
  if(!data) {
    return <div>Nothing in here</div>
  }

  let dataList = []
  for(const key in data) {
    dataList.push([key, data[key]])
  }

  return (
    <ul>
      {dataList.map((dataItem, it) => (
        <>
          <li key={2*it}>{dataItem[0]}</li>
          <li key={(2*it)+1}>{dataItem[1]}</li>
        </>
      ))}
    </ul>
  )
}

function App() {
  const { initializing, data } = useGlobal()
  if(initializing) {
    return <LoadingArtifact />
  }

  return (
    <globalContext.Provider value={{ state: { data } }}>
      <DataPanel />
      <Router>
        <Route
          path='/'
          exact={true}
          component={Home}
        />
      </Router>
    </globalContext.Provider>
  )
}
class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact={true} component={Home}/>
      </Router>
    )
  }
}

render(<App />, document.getElementById('app'))
