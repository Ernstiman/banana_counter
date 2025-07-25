import { useEffect, useState } from "react"
import { UserNav } from "./Navs";
import { fetch_all_users } from "../api/api";
export default function FindUsers(){
 
   const [users, setUsers] = useState([]);
   const [search_term, setSearchTerm] = useState("")
   const [filtered, setFiltered] = useState([])
   
   

   useEffect(() => {
      fetch_all_users()
      .then(data => setUsers(data))

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