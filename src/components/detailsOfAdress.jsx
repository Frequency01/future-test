import React from "react";

export default function detailsOfUser({ userInformation }) {
  return (
    <div>
      <div>
        Выбран пользователь <p>{userInformation.firstName}</p>
        <p>{userInformation.lastName}</p>
      </div>
      <p>Адрес проживания: {userInformation.address.streetAddress}</p>
      <p>Город: {userInformation.address.city}</p>
      <p>Провинция/штат: {userInformation.address.state}</p>
      <p>Индекс: {userInformation.address.zip}</p>
    </div>
  );
}
