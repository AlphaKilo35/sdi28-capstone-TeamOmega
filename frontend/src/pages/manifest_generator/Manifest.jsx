import React, { useState } from "react";


export default function Manifest({ totalSeats = 10 }) {
    const [search, setSearch] = useState('');
    const [manifestJumpers, setManifestJumpers] = useState([]);
    const [availableJumpers] = useState([
      { id: 1, name: 'John Doe', unit: '1 SFC', jm: true },
      { id: 2, name: 'Jane Smith', unit: '1 SFC', jm: false  },
      { id: 3, name: 'Mike Johnson', unit: '1 SFC', jm: false  },
      { id: 4, name: 'Sarah Wilson', unit: '1 SFC', jm: false  },
      { id: 5, name: 'Tom Brown', unit: '1 SFC', jm: false  },
    ]);
  
    const filteredJumpers = availableJumpers.filter(jumper =>
      jumper.name.toLowerCase().includes(search.toLowerCase()) 
    );
  
 
  

  
    return (
      <div>
        <div>
          <div>
            <h2>Available Jumpers</h2>
            <div>
              <input
                type="text"
                placeholder="Search jumpers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              {filteredJumpers.map(jumper => (
                <div key={jumper.id}>
                    <div>{jumper.name}</div>
                    <div>{jumper.unit}</div>                  
                </div>
              ))}
            </div>
          </div>
  
        
          </div>
        </div>
    );
}
