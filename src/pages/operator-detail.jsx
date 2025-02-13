import { useLocation } from "react-router-dom";

const OperatorDetail = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  return (
    <div>
      <h3>Operator Detail page</h3>
    </div>
  );
};

export default OperatorDetail;
