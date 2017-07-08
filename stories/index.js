import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Ferrofluid, { Polarize } from '../src'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Ferrofluid', module)
  .add('test', () => {
    return (
      <section>
        <h3>div</h3>
        <div style={{ width: 300, height: 300 }}>
          <Ferrofluid />
        </div>
        <h3>button</h3>
        <button style={{ background: 'transparent', position: 'relative' }}>
          <Ferrofluid style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
          test
        </button>
      </section>
    )
  })
  