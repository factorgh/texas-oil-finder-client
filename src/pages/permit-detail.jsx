import { useLocation } from "react-router-dom";

const PermitDetail = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  return (
    <div>
      <h3>Permit Detail page</h3>
    </div>
  );
};

export default PermitDetail;
