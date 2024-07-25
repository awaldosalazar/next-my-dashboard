'use client';

import { useAppSelector } from '@/store';
import { addOne, initCounterState, substractOne } from '@/store/counter/counterSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  value: number;
}

interface CounterResponse {
  count: number;
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const data = await fetch('/api/counter')
    .then(response => response.json())

  return data;
}

export const CartCounter = ({ value }: Props) => {
  const { count, isReady } = useAppSelector(state => state.counter)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initCounterState(value));
  // }, [])

  useEffect(() => {
    getApiCounter()
      .then(({ count }) => dispatch(initCounterState(count)))
  }, [])

  return !isReady ? (
    <div className='w-screen'>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-1/3">
          <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="px-6 py-4">
              <div className="h-6 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 w-2/3"></div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    :
    (
      <>
        <span className="text-9xl"> {count} </span>

        <div className="flex flex-row-reverse">
          <button
            onClick={() => dispatch(addOne())}
            className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
            +1
          </button>

          <button
            onClick={() => dispatch(substractOne())}
            className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
            -1
          </button>
        </div>
      </>
    )
}
