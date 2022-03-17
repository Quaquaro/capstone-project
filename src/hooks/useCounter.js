import { useState } from 'react';

export default function useCounter({ initialState, step, minCount, maxCount }) {
  const [count, setCount] = useState(initialState);
  const decrement = () => {
    if (count === minCount) {
      return;
    }
    setCount(count - step);
  };
  const increment = () => {
    if (count === maxCount) {
      return;
    }
    setCount(count + step);
  };

  return { count, increment, decrement, setCount };
}
