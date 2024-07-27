import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Preloader from "../../components/banner/Preloader";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./InfoScreen.css";

export default function InfoScreen() {
  const auth = useContext(AuthContext);

  const [user, setUser] = useState({});

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/getUserInfo",
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        console.log(user);
        setUser(user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserInfo();
  }, [sendRequest, auth.token]);

  return (
    <>
      <Preloader words={["UserInfo"]} />
      <section className="section recent">
        <div className="info-layout">
          <div>
            <img src={user.image} alt="avatar-info" />
          </div>
          <div className="d-flex justify-content-around mt-5">
            <h2>Username: </h2>
            <h2>{user.username}</h2>
          </div>
          <div className="d-flex mt-4">
            <h2>Email: </h2>
            <h2>{user.email}</h2>
          </div>
          <button className="btn">update info</button>
        </div>
      </section>
    </>
  );
}
