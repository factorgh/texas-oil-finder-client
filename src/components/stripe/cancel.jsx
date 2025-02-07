/* eslint-disable react/jsx-key */
import { Button, Result } from "antd";

import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status="warning"
        title="Subscription Canceled"
        subTitle="Your payment was not completed."
        extra={[
          <Button type="primary" onClick={() => navigate("/")}>
            Try Again
          </Button>,
        ]}
      />
    </div>
  );
};

export default Cancel;
