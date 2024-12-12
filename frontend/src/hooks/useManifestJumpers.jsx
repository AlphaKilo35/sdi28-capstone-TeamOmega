import { useState, useEffect} from 'react';

//This hook will pull a list of jumpers manifested on a flight

const useManifestJumpers = (flightId) => {
    const [manifestJumpers, setManifestJumpers] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:3000/manifests/flight/${flightId}/users`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch manifested users");
          return response.json();
        })
        .then(setManifestJumpers)
        .catch((error) => console.log("Error:", error));
    }, [flightId]);
  
    return [manifestJumpers, setManifestJumpers];
  };

  export default useManifestJumpers;