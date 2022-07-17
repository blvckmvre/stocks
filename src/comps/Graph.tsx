import {FC, useMemo} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IStockResponse } from '../types/stocks';
import { colors, options } from '../graph/options';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  
interface GraphProps {
    stocks: IStockResponse[];
}

const Graph:FC<GraphProps> = ({stocks}) => {
    const labels = useMemo(() => 
        stocks.length ? 
            stocks[0].timestamp.map(time=>new Date(time*1000).toLocaleDateString()) : 
            []
    , [stocks]);

    const datasets = useMemo(() =>
        stocks.length
            ?
            stocks.map((stock: any, i)=>({
                label: stock.symbol,
                data: stock.close,
                ...colors[i]
            }))
            :
            []
    , [stocks]);

    const data = useMemo(()=>({
        labels,
        datasets
    }), [labels, datasets]);

    return (
        <>
        {stocks.length 
        ?
        <div className='h-[50vh] p-5 border border-slate-500'>
            <Line options={options} data={data} />
        </div>
        :
        <h1 className='text-center font-bold text-xl'>No stocks to show</h1>
        }
        </>
    )
}

export default Graph