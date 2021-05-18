import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Loader from "./Loader";

import UserContext from "../contexts/UserContext";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const userObj = useContext(UserContext);
  const { id: userId } = useParams();

  useEffect(() => {
    if (!userObj.userData[userId]) {
      userObj.setUserId(userId);
    } else {
      setUser(userObj.userData[userId]);
      setLoading(false);
    }
  }, [userObj.userData]);
  const getAddressElem = (address) => {
    const fullAddress = `${address.suite}, ${address.street}, ${address.city} (${address.zipcode})`;
    return (
      <div>
        <i className="address card icon" />
        <a
          href={
            "https://www.google.com/maps/search/?api=1&query=" +
            address.geo.lat +
            "," +
            address.geo.lng
          }
          target="_blank"
          rel="noreferrer"
        >
          {fullAddress}
        </a>
      </div>
    );
  };

  return (
    <div className="ui container">
      {loading ? (
        <Loader />
      ) : (
        <div className="ui piled segment">
          <h2 className="ui header">{user.name}</h2>
          <div className="ui fitted divider" />
          <div>
            <div className="">
              <i className="envelope outline icon" />
              {user.email}
            </div>
            {getAddressElem(user.address)}
            <div className="">
              <i className="phone icon" />
              {user.phone}
            </div>
            <div className="">
              <i className="globe icon" />
              <a
                href={"https://" + user.website}
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
            </div>
          </div>
          <div className="ui fitted divider" />
        </div>
      )}
    </div>
  );
};

export default User;
