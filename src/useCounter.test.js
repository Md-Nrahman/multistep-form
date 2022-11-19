import { act, renderHook } from "@testing-library/react-hooks";
import { useCounter } from "./hooks/useCounter";

describe("useCounter", () => {
  test(`Check default count's value is 1`, () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(1);
  });

  test(`Check increment will add 1 to counter's default value`, () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.counter).toBe(2);
  });

  test(`Check decrement will remove 1 from counter's default value`, () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrement();
    });

    expect(result.current.counter).toBe(0);
  });

  test(`Check increment will add 1 with value passed`, () => {
    const { result } = renderHook(() => useCounter(45));

    act(() => {
      result.current.increment();
    });

    expect(result.current.counter).toBe(46);
  });

  test(`Check decrement will remove 1 from value passed`, () => {
    const { result } = renderHook(() => useCounter(45));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.counter).toBe(44);
  });
});
