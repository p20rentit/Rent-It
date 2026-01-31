import { useEffect, useState } from "react";
import BookingService from "../../services/BookingService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { userId } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userId) return; // Don't fetch if no user

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
    }, [userId]);

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
                                            <span className={`badge rounded-pill ${booking.bookingStatus === 'CONFIRMED' ? 'bg-success' : booking.bookingStatus === 'CANCELLED' ? 'bg-danger' : 'bg-warning'} px-3`}>
                                                {booking.bookingStatus}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={`badge rounded-pill ${booking.paymentStatus === 'SUCCESS' ? 'bg-info bg-opacity-10 text-info border border-info' : 'bg-secondary bg-opacity-10 text-secondary border border-secondary'} px-2`} style={{ fontSize: '0.7rem' }}>
                                                Deposit: {booking.paymentStatus}
                                            </span>
                                        </div>
                                        {(() => {
                                            if (booking.bookingStatus === 'CANCELLED' || booking.bookingStatus === 'COMPLETED') return null;

                                            // 2-day rule check
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);

                                            // Parse manually to ensure local time (YYYY-MM-DD -> Local Midnight)
                                            // booking.startingDate is "YYYY-MM-DD"
                                            const [y, m, d] = booking.startingDate.split('-').map(Number);
                                            const startDate = new Date(y, m - 1, d); // Month is 0-indexed

                                            const diffTime = startDate - today;
                                            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                                            const isEligible = diffDays >= 2;

                                            if (!isEligible) return null;

                                            return (
                                                <div className="mt-2">
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        style={{ fontSize: '0.75rem' }}
                                                        onClick={async () => {
                                                            const confirm = window.confirm("Are you sure you want to cancel this booking?");
                                                            if (confirm) {
                                                                try {
                                                                    console.log(`Attempting to cancel booking ${booking.bookingId} for user ${userId}`);
                                                                    await BookingService.cancelBooking(booking.bookingId, userId);
                                                                    setBookings(prev => prev.map(b => b.bookingId === booking.bookingId ? { ...b, bookingStatus: 'CANCELLED' } : b));
                                                                    alert("Booking cancelled successfully.");
                                                                } catch (err) {
                                                                    console.error("Cancellation failed:", err);
                                                                    const reason = err.response?.data?.message || err.response?.data || "Failed to cancel booking.";
                                                                    alert(`Cancellation failed: ${reason}`);
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            );
                                        })()}
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
