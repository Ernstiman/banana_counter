import { useEffect, useState } from "react"
import { UserNav } from "./Navs";
export default function FindUsers(){
 
   const [users, setUsers] = useState([]);
   const [search_term, setSearchTerm] = useState("")
   const [filtered, setFiltered] = useState([])

   async function fetch_all_users(){
      const response = await fetch("http://localhost:4747/api/get-users",
         {credentials: "include"}
      )
      const data = await response.json();
      setUsers(data);
   }

   useEffect(() => {
      fetch_all_users()

   }, [])

   useEffect(() => {
      setFiltered(
      users.filter(user => user.username.toLowerCase().includes(search_term.toLowerCase())));
   },[search_term])

   return (
      <div className="add-users-container">
         <label htmlFor="select-users" className="add-users-label">Find User</label>
         <input
            id="select-users"
            type="text"
            className="add-users-input"
            placeholder="Type a username..."
            value={search_term}
            onChange={e => setSearchTerm(e.target.value)}
            autoComplete="off"
         />
         {search_term && (
            <ul className="add-users-list scroll-list">
               {filtered.length > 0 ? (
                  filtered.map(user => (
                     <li key={user.username} className="add-users-list-item">
                        <UserNav targetUsername={user.username} />
                     </li>
                  ))
               ) : (
                  <li className="add-users-list-item no-user">No users found</li>
               )}
            </ul>
         )}
      </div>
   );
}