import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { jwtDecode } from "jwt-decode";

export default function TokenRedirect() {
  const auth = useContext(AuthContext);

  let { tokenId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    try {
      const { userId, image } = jwtDecode(tokenId);
      auth.login(userId, tokenId, image);
      navigate("/");
    } catch (err) {
      navigate("*");
    }
  }, [navigate, tokenId, auth]);

  return null;
}
