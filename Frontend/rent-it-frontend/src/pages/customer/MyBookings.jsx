import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const userId = user?.userId || user?.id || 2;

        async function fetchBookings() {
            try {
                setLoading(true);
                const data = await BookingService.getBookingsByUser(userId);
                console.log("✅ My Bookings fetched:", data);
                setBookings(data);
            } catch (err) {
                console.error("❌ Error fetching bookings:", err);
                setError("Failed to fetch your bookings.");
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, [user]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Fetching your booking history...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">My Bookings</h2>
                <button className="btn btn-primary btn-sm" onClick={() => navigate("/customer/vehicles")}>
                    <i className="bi bi-plus-lg me-1"></i>New Booking
                </button>
            </div>

            {error && <div className="alert alert-danger shadow-sm">{error}</div>}

            {bookings.length === 0 ? (
                <div className="card text-center p-5 border-0 shadow-sm">
                    <div className="card-body">
                        <i className="bi bi-calendar-x text-muted" style={{ fontSize: "3rem" }}></i>
                        <h4 className="mt-3">No Bookings Found</h4>
                        <p className="text-muted">You haven't booked any vehicles yet.</p>
                        <button className="btn btn-primary" onClick={() => navigate("/customer/vehicles")}>
                            Browse Vehicles
                        </button>
                    </div>
                </div>
            ) : (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover align-middle bg-white mb-0">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th className="ps-3">Booking info</th>
                                <th>Vehicle</th>
                                <th>Pickup Details</th>
                                <th>Return Details</th>
                                <th>Pricing Summary</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.bookingId}>
                                    <td className="ps-3">
                                        <div className="fw-bold text-dark">#{booking.bookingId}</div>
                                        <div className="text-muted extra-small" style={{ fontSize: '0.75rem' }}>
                                            {new Date(booking.bookingDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td>
                                        {booking.vehicle ? (
                                            <div
                                                className="d-flex flex-column"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => navigate(`/customer/vehicles/${booking.vehicle.vehicleId}`)}
                                            >
                                                <span className="fw-bold text-primary hover-link">
                                                    {booking.vehicle.model?.brand?.brand} {booking.vehicle.model?.model}
                                                </span>
                                                <small className="text-muted">
                                                    Reg: {booking.vehicle.vehicleNumber}
                                                </small>
                                                <small className="text-info" style={{ fontSize: '0.7rem' }}>
                                                    Click to view details
                                                </small>
                                            </div>
                                        ) : "N/A"}
                                    </td>
                                    <td>
                                        <div className="fw-medium text-dark">{booking.startingDate}</div>
                                        <div className="badge bg-light text-dark border"><i className="bi bi-clock me-1"></i>{booking.pickupTime}</div>
                                    </td>
                                    <td>
                                        <div className="fw-medium text-dark">{booking.endDate}</div>
                                        <div className="badge bg-light text-dark border"><i className="bi bi-clock me-1"></i>{booking.returnTime}</div>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted small">Daily Rate:</span>
                                            <span className="fw-bold small">₹{booking.vehicle?.vehicleType?.rate || '0'}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted small">Total Rent:</span>
                                            <span className="fw-bold small">₹{booking.totalAmount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between text-danger">
                                            <span className="small">Security Deposit:</span>
                                            <span className="fw-bold small">₹{booking.depositAmount}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="mb-2">
                                            <span className={`badge rounded-pill ${booking.bookingStatus === 'CONFIRMED' ? 'bg-success' : 'bg-warning'} px-3`}>
                                                {booking.bookingStatus}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={`badge rounded-pill ${booking.paymentStatus === 'SUCCESS' ? 'bg-info bg-opacity-10 text-info border border-info' : 'bg-secondary bg-opacity-10 text-secondary border border-secondary'} px-2`} style={{ fontSize: '0.7rem' }}>
                                                Deposit: {booking.paymentStatus}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style>{`
                .hover-link:hover {
                    text-decoration: underline;
                }
                .extra-small {
                    font-size: 0.75rem;
                }
            `}</style>
        </div>
    );
}

export default MyBookings;
