import React, { lazy, Suspense } from 'react'
import LoadingArtifact from 'atoms/LoadingArtifact'

export default function Lazy({ importItem }) {
  const LazyItem = lazy(() => importItem)
  return (
    <Suspense fallback={LoadingArtifact}>
      <LazyItem />
    </Suspense>
  )
}
