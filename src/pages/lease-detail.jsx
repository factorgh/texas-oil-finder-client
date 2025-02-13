import { useLocation } from "react-router-dom";

const LeaseDetail = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  return (
    <div>
      <h3>Lease Detail page</h3>
    </div>
  );
};

export default LeaseDetail;
