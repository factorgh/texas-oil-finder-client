/* eslint-disable react/jsx-key */

import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status="success"
        title="Subscription Activated!"
        subTitle="Thank you for subscribing. You can now access premium features."
        extra={[
          <Button type="primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default Success;
