import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { editUser, getUsers } from "../../../core/services/auth.service";
import "./ListAuthors.scss";
import { toast } from 'react-toastify';

function ListAuthors () {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, [])


  function profileAction(query){
    if(query.includes('delete') && !window.confirm('Are you sure you want to delete this user?')){
      return;
    }
    editUser({}, query).then(data => {
      toast.success(data.message, 'Success!');
      getAllUsers();
    }).catch(err => {
      toast.error(err.error.message, 'Success!');
    });
  }

  function getAllUsers(){
    getUsers().then((data) => {
      let currUsers = data.users;
      currUsers = currUsers.filter((u) => {
        if (location.pathname == '/') {
          // Showing only users with full information
          return (
            u.imgUrl !== '' &&
            u.firstName !== '' &&
            u.lastName !== '' &&
            u.email != localStorage.getItem('email') &&
            u.isDisabled != true
          );
        }
        return u.email != localStorage.getItem('email');
      });
      setUsers(currUsers);
    });
  }

  return (
    <>
      {
        users 
        ? <section className="list_authors" > 
            <div className="row">
              <div className="col">
                <h3 className="section_title text_center">Authors</h3>
              </div>
              {
                users.map(user => 
                  <div className="col medium_4 giant_3" key={user._id}>
                    <div className={user.isDisabled ? 'user disabled' : 'user'} >
                      {
                        user.isDisabled && location.pathname != '/' && localStorage.getItem('role') == 'admin' ?
                          <div className="disabled_user" >
                            <h4>DISABLED</h4>
                            <button className="btn btn_success" onClick={() => profileAction('?restore=' + user._id)}>Restore</button>
                          </div>
                        : (<></>)
                      }
                      <Link to={'/user/details/' + user._id}>
                        <img src={user.imgUrl || 'https://i2.wp.com/upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'} />
                        <div className="info">
                          <span className="name">{user.firstName} {user.lastName}</span>
                          <span className="email">{user.email}</span>
                          <span className="photo_count" >Photos uploaded: {user.photos.length}</span>
                        </div>
                      </Link>
                      {
                        localStorage.getItem('role') == 'admin' && location.pathname != '/'
                        ? <div className="action_buttons"> {/***ngIf="authService.getUserRole() == 'admin' && router.url != '/'" */}
                            <button className="btn btn_warning" onClick={() => profileAction('?disable=' + user._id)}>Block</button>
                            <button className="btn btn_danger" onClick={() => profileAction('?delete=' + user._id)}>Delete</button>
                          </div>
                        : (<></>)
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </section>
        : <div className="row"> {/***ngIf="!users.length && router.url != '/'" */}
            <div className="col">
              <h2 className="section_title" style={{margin: "200px 0"}}>
                There is no users yet!
              </h2>
            </div>
          </div>
      }
    </>
  )
}


export default ListAuthors;
