import { createData } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const CreateData = () => {
  const { token } = useAuth();

  const handleCreate = async () => {
    if (!token) return alert("Login first");
    try {
      const res = await createData(token);
      alert(res.data.message);
    } catch {
      alert("Error creating data");
    }
  };

  return <button onClick={handleCreate}>Create Protected Data</button>;
};

export default CreateData;
