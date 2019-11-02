import { useState, useEffect, useContext, createContext } from 'react'

export const dataContext = createContext({
  data: null,
})

export const useSession = () => {
  const data = useContext(dataContext)
  return data
}

function externalDataSourceStub() {
  return {
    data: 'stubby stub stubberson',
  }
}

function stubPubSub(broadcastChange) {
  // Subscribe to getting data
  const subscription = setTimeout(() => {
    broadcastChange('new data!')
  }, 8000)
  return () => {
    // unsubscribe from data
    clearTimeout(subscription)
  }
}

export const useAuth = () => {
  const [ state, setState ] = useState(() => {
    const data = externalDataSourceStub()
    return { initializing: !data, data }
  })

  function onChange(data) {
    setState({ initializing: false, data })
  }

  useEffect(() => {
    // listen for changes
    const unsubscribe = stubPubSub(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}
