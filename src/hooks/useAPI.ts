import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Task } from '../types';

const useAPI = () => {
  const getTasks = useCallback(async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return [];
  }, []);

  const getUser = async (user: {email:string, password:string}) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
        method: 'POST',
        headers:{'Content-Type' : 'application/json'},
        mode: 'cors',
        body:JSON.stringify(user)
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });
        return [];
      }

      const data = await response.json();
      return data
      
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

  }

  const getTransactions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });
        return [];
      }

      const transactions = await response.json();
      return transactions
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }
  }

  const deleteTranscation = async (id:string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/delete/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });
        return {}
      }
      const data = await response.json();
      return data
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

  }

  return {
    getTasks,
    getUser,
    getTransactions,
    deleteTranscation 
  };
};

export default useAPI;
