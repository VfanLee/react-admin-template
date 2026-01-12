import { Suspense } from 'react'

const Test = () => {
  return (
    <>
      <h1>Test</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Child />
      </Suspense>
    </>
  )
}

const Child = () => {
  return <div>Child Component</div>
}

export default Test
