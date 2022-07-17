import { useEffect } from 'react';
import {FC} from 'react'
import { io } from 'socket.io-client'
import { useState } from 'react';
import Graph from './comps/Graph';
import AddField from './comps/AddField';
import StockList from './comps/StockList';
import Loading from './comps/loading/Loading';
import { IStockResponse } from './types/stocks';

const socket = io(process.env.REACT_APP_HEROKU || "http://localhost:3001");

const App:FC = () => {
  const [input, setInput] = useState<string>("");
  const [stocks, setStocks] = useState<IStockResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(()=>{
    socket.on("connect", ()=>{
      socket.emit("request-data");
    });
    socket.on("data", (data: IStockResponse[])=>{
      setStocks(data);
    });
    socket.on("error", (message: string)=>{
      setError(message);
    })
    socket.on("load-start", ()=>{
      setError(null);
      setIsLoading(true);
    });
    socket.on("load-end", ()=>{
      setIsLoading(false);
    });
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    }
  },[])

  const add = () => {
    if(input.trim())
      socket.emit("stock-add", input);
    setInput("");
  }
  const rm = (stock: string) => {
    socket.emit("stock-rm", stock);
  }

  return (
    <div className='py-20 flex flex-col h-full w-4/5 max-w-2xl gap-5 m-auto text-slate-600'>
      {isLoading && <Loading />}
      {error && <p className='text-center bold text-red-700'>{error}</p>}
      <h1 className='text-center font-bold text-2xl'>Stock Market Trends</h1>
      <h2 className='text-center text-xl'>5 stocks max</h2>
      <AddField add={add} input={input} setInput={setInput} />
      <Graph stocks={stocks} />
      <StockList stocks={stocks} rm={rm} />
    </div>
  )
}

export default App