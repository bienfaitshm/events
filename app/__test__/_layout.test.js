import * as React from 'react';
import renderer from 'react-test-renderer';

import {default as Layout ,RootLayoutNav } from '../_layout';

it(`renders correctly Layout`, () => {
  const tree = renderer.create(<Layout />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`renders correctly RootLayoutNav`, () => {
  const tree = renderer.create(<RootLayoutNav />).toJSON();
  expect(tree).toMatchSnapshot();
});

