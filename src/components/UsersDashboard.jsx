import React, { useState, useEffect } from "react";
import User from "./User";
import Pagination from "./Pagination";
import AddUser from "./AddUser";
import SearchBox from "./SerachBox";
import DetailsOfUser from "./detailsOfAdress";
import ChooseUrlButtons from "./ChooseUrlButtons";
import { Grid, CircularProgress } from "@material-ui/core";

function UsersDasboard() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chooseUrlButtons, setChooseUrlButtons] = useState(true);
  const [searchField, setSearchField] = useState("id");
  const usersPerPage = 10;

  const shortUrl =
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

  const longURL =
    "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

  useEffect(() => {
    setIsLoaded(false);
    setCurrentPage(1);
    fetch(chooseUrlButtons ? shortUrl : longURL)
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
  }, [chooseUrlButtons]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let showSelectedUser = (user) => {
    setSelectedUser(user);
  };
  let hideSelectedUser = () => {
    setSelectedUser(null);
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
      String(user[searchField]).toUpperCase().includes(text.toUpperCase())
    );
    setSearchTerm(text);
    setFilteredUsers([...result]);
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "20vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  } else {
    return (
      <>
        <Grid container direction="column" justify="center" alignItems="center">
          <ChooseUrlButtons setChooseUrlButtons={setChooseUrlButtons} />
          <Grid item xs={12}>
            <SearchBox
              users={users}
              handleFilter={handleFilter}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              searchField={searchField}
              setSearchField={setSearchField}
            />
          </Grid>
          <Grid item xs={12}>
            <AddUser
              users={currentUser}
              setUsers={setUsers}
              setFilteredUsers={setFilteredUsers}
            />
          </Grid>
          <Grid item xs={12}>
            <User
              users={currentUser}
              setUsers={setUsers}
              handleSort={handleSort}
              order={order}
              showSelectedUser={showSelectedUser}
            />
          </Grid>
          <Grid item xs={12}>
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={users.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Grid>
          {selectedUser ? (
            <DetailsOfUser
              selectedUser={selectedUser}
              hideSelectedUser={hideSelectedUser}
            />
          ) : null}
        </Grid>
      </>
    );
  }
}

export default UsersDasboard;
