import React, { lazy, Suspense } from 'react';

const LazytestString = lazy(() => import('./TestString'));

const testString = props => (
  <Suspense fallback={null}>
    <LazytestString {...props} />
  </Suspense>
);

export default TestString;
