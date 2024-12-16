import { useState, useEffect} from 'react';

//This hook will give you a list of available users

const useAvailableJumpers = () => {
    const [availableJumpers, setAvailableJumpers] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3000/manifests/users")
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch users");
          return response.json();
        })
        .then(setAvailableJumpers)
        .catch((error) => console.log("Error:", error));
    }, []);
  
    return availableJumpers;
  };

  export default useAvailableJumpers;