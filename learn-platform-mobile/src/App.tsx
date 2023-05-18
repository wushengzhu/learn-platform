import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FIND, UPDATE } from './graphql/demo'
import { useQuery, useMutation } from '@apollo/client'

function App() {
  const { loading, data } = useQuery(FIND, {
    variables: {
      id: ''
    }
  })
  const [update] = useMutation(UPDATE)
  const [name, setName] = useState('')

  const onChangeNameHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
    setName(v.target.value)
  }

  return (
    <div>
      <p>data:{JSON.stringify(data)}</p>
      <p>
        name:
        <input onChange={onChangeNameHandler}></input>
      </p>
    </div>
  )
}

export default App

