import {FC} from 'react'
import { IStockResponse } from '../types/stocks';

interface StockListProps {
    rm: (stock: string)=>void;
    stocks: IStockResponse[];
}

const StockList:FC<StockListProps> = ({rm, stocks}) => {
    return (
        <>
        {!!stocks.length &&
        <div className='flex flex-col p-5 border border-slate-500'>
            {stocks.map(stock=>
                <div 
                    className='p-1 my-1 bg-slate-200 text-slate-500 border border-slate-400 hover:bg-slate-400 hover:text-slate-200' 
                    key={stock.symbol} 
                    onClick={()=>rm(stock.symbol)}
                >{stock.symbol}</div>  
            )}
        </div>
        }
        </>
    ) 
}

export default StockList