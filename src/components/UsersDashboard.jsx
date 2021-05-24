import React, { useState, useEffect } from "react";
import User from "./User";
import Pagination from "./Pagination";
import AddUser from "./AddUser";
import SearchBox from "./SerachBox";
import DetailsOfUser from "./detailsOfAdress";

function UsersDasboard({ user }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userInformation, setUserInformatiom] = useState(null);
  console.log(userInformation);

  useEffect(() => {
    fetch(
      "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
          setFilteredUsers(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let UserInformation = (user) => {
    setUserInformatiom(user);
  };

  let handleSort = (key) => {
    let sortedUsers = [...filteredUsers].sort(function (a, b) {
      if (a[key] > b[key]) {
        return order ? -1 : 1;
      }
      if (a[key] < b[key]) {
        return order ? 1 : -1;
      }

      return 0;
    });
    setOrder(!order);
    setFilteredUsers(sortedUsers);
  };

  let handleFilter = (text) => {
    let result = users.filter((user) =>
      user.firstName.toUpperCase().includes(text.toUpperCase())
    );
    setSearchTerm(text);
    setFilteredUsers([...result]);
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <>
        <AddUser
          users={currentUser}
          setUsers={setUsers}
          setFilteredUsers={setFilteredUsers}
        />
        <SearchBox
          users={users}
          handleFilter={handleFilter}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <User
          users={currentUser}
          setUsers={setUsers}
          handleSort={handleSort}
          order={order}
          UserInformation={UserInformation}
        />
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        {userInformation ? (
          <DetailsOfUser userInformation={userInformation} />
        ) : null}
      </>
    );
  }
}

export default UsersDasboard;
