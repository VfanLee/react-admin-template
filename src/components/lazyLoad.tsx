import React, { Suspense } from 'react'

const lazyLoad = (Component: React.LazyExoticComponent<React.FC>) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

export default lazyLoad
