import React, {useState, useEffect} from 'react'

export default function useUserData(userId) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      if (!userId) return;
  
      fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUserData(data[0]);
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
         
        });
    }, [userId]);
  
    return userData ;
}
