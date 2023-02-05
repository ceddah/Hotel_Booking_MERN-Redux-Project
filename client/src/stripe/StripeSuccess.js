import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { LoadingOutlined } from "@ant-design/icons";
import { DASHBOARD, STRIPE_CANCEL } from "../constants/routes";

const StripeCancel = ({ match, history }) => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    stripeSuccessRequest(token, match.params.hotelId).then((res) => {
      if (res.data.success) {
        history.push(DASHBOARD);
      } else {
        history.push(STRIPE_CANCEL);
      }
    });
  }, [match.params.hotelId, token, history]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeCancel;
