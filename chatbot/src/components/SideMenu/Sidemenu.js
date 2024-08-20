// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Sidemenu.css';

// const SideMenu = () => {
//   const navigate = useNavigate();
//   const [history, setHistory] = useState([]);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   };


//   // Fetch history from local storage or an API
//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("history") || '[]');
//     setHistory(storedHistory);
//   }, []);

//   return (
//     <aside className='sidemenu'>
//       <div className='sidemenu-button'>
//         <span>+</span>
//         New Chat Questions
//       </div>
//       <div className='sidemenu-buttons'>
//         <Link className="btn btn-outline mb-2" to="/quiz">Quiz App</Link>
//       </div>
//       <div className='history-section'>
//         <h5>History</h5>
//         <ul>
//           {history.length > 0 ? (
//             history.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))
//           ) : (
//             <li>No history available</li>
//           )}
//         </ul>
//       </div>
//       <div className='auth-buttons'>
//         <Link className="btn btn-outline-danger" to="/login">
//           Login
//         </Link>
//         <Link className="btn btn-outline-success ms-2" to="/register">
//           Register
//         </Link>
//       </div>
//     </aside>
//   );
// };

// export default SideMenu;

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getDataByUserId } from '../../apis/Api';
// import './Sidemenu.css';

// const SideMenu = () => {
//   const navigate = useNavigate();
//   const [user_history, set_user_history] = useState([])
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   };
//   const fetchHistory = async () => {
//     console.log(localStorage.getItem('user_id'))

//     try {

//       const user_id = localStorage.getItem('user_id'); // Retrieve the user ID from local storage or other means
//       if (user_id) {
//         const fetchedHistory = await getDataByUserId({ id: user_id });
//         console.log(fetchedHistory);
//         set_user_history(fetchedHistory);
//       } else {
//         setError('User ID not found');
//       }
//     } catch (err) {
//       setError('Failed to fetch chat history');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch history from API
//   useEffect(() => {

//     fetchHistory();
//   }, []);

//   return (
//     <aside className='sidemenu'>
//       {/* <div className='sidemenu-button'>
//         <span>+</span>
//         New Chat Questions
//       </div> */}
//       {/* <div className='sidemenu-buttons'>
//         <Link className="btn btn-outline mb-2" to="/quiz">Quiz App</Link>
//       </div> */}
//       <div className='history-section'>
//         <h5>History</h5>
//         {loading && <p>Loading...</p>}
//         {error && <p className='text-danger'>{error}</p>}
//         <ul>
//           {user_history.length > 0 ? (
//             user_history.map((item, index) =>
//               item?.type == "USER" && (
//                 <li key={index}>{item?.userMsc}</li>
//               )
//             )
//           ) : (
//             <li>No history available</li>
//           )}
//         </ul>

//       </div>
      
//       <div className='auth-buttons'>
//         <Link className="btn btn-outline-danger" to="/login" onClick={handleLogout}>
//           Logout
//         </Link>
//         {localStorage.getItem('user_id') === null || localStorage.getItem('user_id') === '' ? (
//           <Link className="btn btn-outline-success ms-2" to="/register">
//             Register
//           </Link>
//         ) : null}
//       </div>
//     </aside>
//   );
// };

// export default SideMenu;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDataByUserId } from '../../apis/Api';
import './Sidemenu.css';

const SideMenu = () => {
  const navigate = useNavigate();
  const [user_history, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const fetchHistory = async () => {
    try {
      const user_id = localStorage.getItem('user_id'); // Retrieve the user ID from local storage
      if (user_id) {
        const fetchedHistory = await getDataByUserId({ id: user_id });
        setUserHistory(fetchedHistory);
      } else {
        setError('User ID not found');
      }
    } catch (err) {
      setError('Failed to fetch chat history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch history from API
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <aside className='sidemenu'>
      <div className='history-section'>
        <h5>History</h5>
        {loading && <p>Loading...</p>}
        {error && <p className='text-danger'>{error}</p>}
        <ul>
          {user_history.length > 0 ? (
            user_history.map((item, index) =>
              item?.type === "USER" && (
                <li key={index}>{item?.userMsc}</li>
              )
            )
          ) : (
            <li>No history available</li>
          )}
        </ul>
      </div>
      
      <div className='auth-buttons'>
        <Link className="btn btn-outline-danger" to="/login" onClick={handleLogout}>
          Logout
        </Link>
        {localStorage.getItem('user_id') === null || localStorage.getItem('user_id') === '' ? (
          <Link className="btn btn-outline-success ms-2" to="/register">
            Register
          </Link>
        ) : null}
      </div>
    </aside>
  );
};

export default SideMenu;
