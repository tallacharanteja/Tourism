import React, { useEffect, useState } from "react";
import api from "../api";

function PlaceList({ user }) {
  const [places, setPlaces] = useState([]);
  const [cart, setCart] = useState([]);
  const [paying, setPaying] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Booking form state
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState({
    name: user ? user.username : "",
    persons: 1,
    mobile: ""
  });

  useEffect(() => {
    api.get("/places")
      .then(res => setPlaces(res.data))
      .catch(() => alert("Error fetching places"));
  }, []);

  const addToCart = place => {
    if (!cart.some((p) => p.id === place.id)) {
      setCart([...cart, place]);
      setAnimationKey(animationKey + 1);
    }
  };

  const removeFromCart = id => {
    setCart(cart.filter(p => p.id !== id));
  };

  // Booking details update
  const handleBookingChange = e => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleProceed = () => {
    setShowBooking(true);
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0) * Number(booking.persons);

  const handlePayment = () => {
    // Simple validation
    if (!booking.name || !booking.mobile || !booking.persons || booking.persons < 1) {
      alert("Please fill all details before payment.");
      return;
    }
    setPaying(true);
    setTimeout(() => {
      alert(`Booking Successful! Total: ₹${totalPrice}
      Name: ${booking.name}
      Persons: ${booking.persons}
      Mobile: ${booking.mobile}`);
      setCart([]);
      setShowBooking(false);
      setBooking({ name: user ? user.username : "", persons: 1, mobile: "" });
      setPaying(false);
    }, 1500);
  };

  return (
    <div style={{background: "#f3f4f7", minHeight: "100vh", padding: "30px"}}>
      <h3 style={{color: "#1d3557", marginBottom: 40}}>🌏 Explore Tourist Destinations</h3>
      <div className="row">
        {places.map(p => (
          <div className="col-lg-4 col-md-6 mb-4" key={p.id}>
            <div className="card shadow-sm" style={{borderRadius: 18}}>
              <img src={p.imageUrl || "https://via.placeholder.com/350x180?text=No+Image"}
                   className="card-img-top"
                   alt={p.name}
                   style={{height: 180, objectFit: "cover", borderTopLeftRadius: 18, borderTopRightRadius: 18}} />
              <div className="card-body" style={{background: "#f6fff7", borderBottomLeftRadius: 18, borderBottomRightRadius: 18}}>
                <h5 className="card-title">{p.name}</h5>
                <div className="text-muted">{p.location}</div>
                <p className="card-text" style={{minHeight: 48}}>{p.description}</p>
                <div style={{fontWeight: "bold", fontSize: 18, color: "#0a8851"}}>₹{p.price}</div>
                <button className="btn btn-success mt-2" style={{width: "100%"}}
                  onClick={() => addToCart(p)}
                  disabled={cart.some(x => x.id === p.id)}>
                  {cart.some(x => x.id === p.id) ? "Added to Cart" : "Add to Cart"}
                </button>
                <div className="mt-3">
                  <iframe
                    title={`Google Maps ${p.location}`}
                    width="100%"
                    height="180"
                    style={{border:0, borderRadius: "12px"}}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(p.location)}&output=embed`}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart + Payment section */}
      <div className="container" style={{maxWidth: 520, marginTop: 50}}>
        <h4 style={{color: "#182848"}}>
          <span className="cart-emoji" key={animationKey} style={{display: "inline-block"}}>🛒</span> Your Cart
        </h4>
        <ul className="list-group">
          {cart.length === 0 &&
            <li className="list-group-item text-secondary" style={{background: "#f2fafd"}}>Your cart is empty.</li>
          }
          {cart.map((item, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center" style={{background: "#edf6f9"}}>
              <div>
                <span role="img" aria-label="place">📷</span> <b>{item.name}</b>
                <div style={{fontSize: 13}} className="text-secondary">{item.location}</div>
              </div>
              <div>
                <span style={{color: "#006d77", fontWeight: "bold"}}>₹{item.price}</span>
                <button className="btn btn-link btn-sm text-danger ms-3" onClick={() => removeFromCart(item.id)}>&times;</button>
              </div>
            </li>
          ))}
        </ul>
        {cart.length > 0 &&
          <>
            <div className="d-flex justify-content-between mt-3" style={{fontWeight: "bold"}}>
              <div>Total (for {booking.persons} person{booking.persons > 1 ? "s" : ""}):</div>
              <div>
                ₹{totalPrice}
              </div>
            </div>
            {!showBooking &&
              <button className="btn btn-primary mt-3 w-100" onClick={handleProceed}>
                Proceed to Booking Details
              </button>
            }
            {showBooking &&
              <div className="p-3 bg-light rounded mt-3">
                <h5>Booking Details</h5>
                <form>
                  <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Your Name"
                    value={booking.name}
                    onChange={handleBookingChange}
                    required
                  />
                  <input
                    className="form-control mb-2"
                    type="number"
                    name="persons"
                    min={1}
                    placeholder="Total number of persons"
                    value={booking.persons}
                    onChange={handleBookingChange}
                    required
                  />
                  <input
                    className="form-control mb-2"
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={booking.mobile}
                    onChange={handleBookingChange}
                    required
                  />
                  <button type="button" className="btn btn-success mt-2 w-100" onClick={handlePayment} disabled={paying}>
                    {paying ? "Processing..." : "Confirm & Pay"}
                  </button>
                  <button type="button" className="btn btn-link mt-2 w-100" onClick={() => setShowBooking(false)}>
                    Cancel
                  </button>
                </form>
              </div>
            }
          </>
        }
      </div>
    </div>
  );
}

export default PlaceList;
