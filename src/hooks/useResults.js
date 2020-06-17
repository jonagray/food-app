import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); 

  const searchApi = async (searchTerm) => {
   try {
     // params ojbect below turns quer into -> '/search?limit=50'
     const response = await yelp.get('/search', { 
       params: {
         limit: 50,
         term: searchTerm,
         location: 'seattle'
       }
     });
     setResults(response.data.businesses);
   } catch (err) {
     setErrorMessage('Something went wrong');
   }
  };

  useEffect(() => {
    searchApi('pasta');
  }, []);

  return [searchApi, results, errorMessage];

};