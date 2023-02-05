import React, { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import { NEW_HOTEL } from "../constants/routes";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import { toast } from "react-toastify";

const DashboardSeller = () => {
  const [hotels, setHotels] = useState([]);
  const { auth } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const connected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link to={NEW_HOTEL} className="btn btn-primary">
              + Add New
            </Link>
          </div>
        </div>

        <div className="row">
          {hotels.map((h) => (
            <SmallCard
              key={h._id}
              h={h}
              showViewMoreButton={false}
              owner={true}
              handleHotelDelete={handleHotelDelete}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleClick = async () => {
    setLoading(true);

    try {
      let res = await createConnectAccount(auth.token);
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again.");
      setLoading(false);
    }
  };

  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Are you sure?")) return;
    deleteHotel(auth.token, hotelId).then(() => {
      toast.success("Hotel Deleted");
      loadSellersHotels();
    });
  };

  const notCoonected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="p-5 pointer">
              <HomeOutlined className="h1" />
              <h4>Setup payouts to Post hotel rooms</h4>
              <p className="lead">
                Booking App partners with Stripe to transfer earning to your
                Bank Account
              </p>
              <button
                disabled={loading}
                onClick={handleClick}
                className="btn btn-primary mb-3"
              >
                {loading ? "Processing..." : "Setup Payouts"}
              </button>
              <p className="text-muted">
                <small>
                  You'll be redirected to Stripe to complete the onboarding
                  process.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const loadSellersHotels = async () => {
    let res = await sellerHotels(auth.token);
    setHotels(res.data);
  };

  useEffect(() => {
    loadSellersHotels();
  }, []);

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notCoonected()}
    </>
  );
};

export default DashboardSeller;
