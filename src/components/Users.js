import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api()
      .get("/users")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  console.log(data);

  return data.map((item) => {
    console.log(item);
    return (
      <div className="ui relaxed divided list" key={item.id}>
        <div className="item">
          <i className="large github middle aligned icon"></i>
          <div className="content">
            {/* a elementleri Link elementlerine dönüştürüldü. Böylece belirlenen route'a yönlendirme yapıdı. */}
            <Link to={`/users/${item.id}`} className="header">
              {item.name}
            </Link>
          </div>
        </div>
      </div>
    );
  });
};
export default Users;
