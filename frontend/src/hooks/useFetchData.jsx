import { useState, useEffect, useCallback } from 'react';

function useFetchData ( url ) {
  const [loading, setLoading] = useState(true);
  const [dataObject, setDataObject] = useState({});

  const fetchData = useCallback( async () => {
    setLoading(true);
    let response = await fetch(url)
      .then(response => !response.ok ? Promise.reject(new Error('Failed to Fetch List')) : Promise.resolve(response.json()))
      .catch(error => { console.log(error.message); });
    let responseData = await response;
    /** Add a delay, if required by the API documentation / any other restrictions **/
    //await new Promise(resolve => setTimeout(resolve, 50)) //50 milliseconds
    //console.log(responseData)
    setDataObject(responseData);
    setLoading(false);
  }, [url]);

  useEffect( () => { fetchData(); }, [fetchData])
  //console.log(dataObject);
  return {dataObject, loading}
}

export default useFetchData;