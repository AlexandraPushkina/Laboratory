import React, { lazy, Suspense } from 'react';

const LazyAdverCard = lazy(() => import('./AdverCard'));

const AdverCard = props => (
  <Suspense fallback={null}>
    <LazyAdverCard {...props} />
  </Suspense>
);

export default AdverCard;