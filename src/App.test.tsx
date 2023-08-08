import { describe, test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import { act } from 'react-dom/test-utils';

describe('<App />', () => {
  test('App mounts properly', () => {
    const wrapper = render(<App />)
    expect(wrapper).toBeTruthy()

    // Get by h1
    const h1 = wrapper.container.querySelector('h1')
    expect(h1?.textContent).toMatch(/Gordle v(\d+\.)?(\d+\.)?(\*|\d+)$/)

    act(() => {
      var event = new KeyboardEvent('keydown', {key: 'a'});
      document.dispatchEvent(event);

      var event = new KeyboardEvent('keydown', {key: 'a'});
      document.dispatchEvent(event);

      var event = new KeyboardEvent('keydown', {key: 'r'});
      document.dispatchEvent(event);

      var event = new KeyboardEvent('keydown', {key: 'd'});
      document.dispatchEvent(event);

      var event = new KeyboardEvent('keydown', {key: 'e'});
      document.dispatchEvent(event);

      var backspace = new KeyboardEvent('keydown', {key: 'Backspace'});
      document.dispatchEvent(backspace);

      var event = new KeyboardEvent('keydown', {key: 'e'});
      document.dispatchEvent(event);

      var enter = new KeyboardEvent('keydown', {key: 'Enter'});
      document.dispatchEvent(enter);
      
      var event = new KeyboardEvent('keydown', {key: 'a'});
      document.dispatchEvent(event);

      var event = new KeyboardEvent('keydown', {key: 'r'});
      document.dispatchEvent(event);

      var enter = new KeyboardEvent('keydown', {key: 'Enter'});
      document.dispatchEvent(enter);
    });
  })
});