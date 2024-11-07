import React from 'react';
import ReactDOM from 'react-dom';
import AdverCard from './AdverCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdverCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});