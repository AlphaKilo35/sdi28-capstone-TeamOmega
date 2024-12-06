import { useState, useEffect, useCallback } from 'react';



function useFetchData ( url, numOfRecords = 1 ) {
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState([]);

  const fetchData = useCallback( async () => {
    setLoading(true);
    let responseData = [];
    for (let i = 0; i < numOfRecords; i++) {
      let response = await fetch(url)
        .then(response => !response.ok ? Promise.reject(new Error('Failed to Fetch List')) : Promise.resolve(response.json()))
        .catch(error => { console.log(error.message); });
      let data = await response;
      responseData.push(data);
      /** Add a delay, if required by the API documentation / any other restrictions **/
      //await new Promise(resolve => setTimeout(resolve, 50)) //50 milliseconds
    }
    setDataList(responseData);
    setLoading(false);
  }, [url, numOfRecords]);

  useEffect( () => { fetchData(); }, [fetchData])

  return {dataList, loading}
}

export default useFetchData;