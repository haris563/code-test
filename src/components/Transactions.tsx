import React, { useEffect } from 'react'
import './Transactions.scss'
import useAPI from '../hooks/useAPI'
import useQuery from '../hooks/useQuery';
import { useSelector, actions, useDispatch } from '../store';

function Transactions() {
    const { query, setQuery } = useQuery();
    const {getTransactions, deleteTranscation} = useAPI()
    const dispatch = useDispatch()
    const transactions = useSelector((state) => state.transactions);

    
    useEffect(() => {
     (async () => {
        const transactions = await getTransactions()
        setQuery({page: '0'})
        dispatch(actions.removeTransactions({}))
        dispatch(actions.addTransactions({transactions}));
     })()
    }, [])

    const moreTransactions = async () => {
        const transactions = await getTransactions()
        setQuery({page:Number(query.page)+1})
        dispatch(actions.addTransactions({transactions}));
    }
    
    const deleteHandler = async (id:string) => {
        const data = await deleteTranscation(id)
        if(data.id) {
            let filteredTransactions = Object.values(transactions).filter((item)=>item.id !== data.id )
            console.log(filteredTransactions)
            dispatch(actions.deleteTransaction({transactions:filteredTransactions}));
        }
        
    }
  return (
    <div className='data__table'>
        <table>
            <thead>
                <tr>
               
                    <th>from</th>
                    <th>to</th>
                    <th>amount</th>
                    <th>token</th>
                    <th>token name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(transactions).map((item,index)=>{
                    return (
                        <tr>
                        
                        <td>{item.from}</td>
                        <td>{item.to}</td>
                        <td>{item.amount}</td>
                        <td>{item.token}</td>
                        <td>{item.tokenName}</td>
                        <td><button onClick={()=>deleteHandler(item.id)}>Delete</button></td>
                        
                    </tr>
                    )
                })}
            
            </tbody>
        </table>
        <button className='more__btn' onClick={moreTransactions}>More</button>
    </div>
  )
}

export default Transactions