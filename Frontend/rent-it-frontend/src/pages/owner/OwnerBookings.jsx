import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OwnerBookingService from "../../api/OwnerBookingService";

function OwnerBookings() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const { userId } = useSelector((state) => state.auth);

    useEffect(() => {
        const id = userId || 2; // Fallback for dev

        async function fetchBookings() {
            try {
                setLoading(true);
                const data = await OwnerBookingService.getOwnerBookings(id);
                console.log("✅ Owner Bookings fetched:", data);
                setBookings(data);
                setFilteredBookings(data);
            } catch (err) {
                console.error("❌ Error fetching owner bookings:", err);
                setError("Failed to fetch bookings for your vehicles.");
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, [userId]);

    useEffect(() => {
        if (statusFilter === "ALL") {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(bookings.filter(b => b.bookingStatus === statusFilter));
        }
    }, [statusFilter, bookings]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Fetching vehicle bookings...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Vehicle Bookings</h2>
                <div className="d-flex gap-2">
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All Bookings</option>
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="ONGOING">Ongoing (Rented)</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            {error && <div className="alert alert-danger shadow-sm">{error}</div>}

            {filteredBookings.length === 0 ? (
                <div className="card text-center p-5 border-0 shadow-sm">
                    <div className="card-body">
                        <i className="bi bi-calendar-x text-muted" style={{ fontSize: "3rem" }}></i>
                        <h4 className="mt-3">No Bookings Found</h4>
                        <p className="text-muted">There are no bookings matching your criteria.</p>
                    </div>
                </div>
            ) : (
                <div className="table-responsive shadow-sm rounded border">
                    <table className="table table-hover align-middle bg-white mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-3 text-uppercase small fw-bold text-muted">Booking</th>
                                <th className="text-uppercase small fw-bold text-muted">Vehicle</th>
                                <th className="text-uppercase small fw-bold text-muted">Customer</th>
                                <th className="text-uppercase small fw-bold text-muted">Dates & Time</th>
                                <th className="text-uppercase small fw-bold text-muted text-end">Amount</th>
                                <th className="text-uppercase small fw-bold text-muted text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.bookingId}>
                                    <td className="ps-3 font-monospace">
                                        <span className="fw-bold">#{booking.bookingId}</span>
                                        <div className="text-muted small" style={{ fontSize: '0.7rem' }}>
                                            {new Date(booking.bookingDate).toLocaleString()}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-bold text-dark">{booking.vehicleName}</div>
                                        <div className="text-muted small">{booking.vehicleNumber}</div>
                                    </td>
                                    <td>
                                        <div className="fw-bold text-dark">{booking.customerName}</div>
                                        <div className="text-primary small">
                                            <i className="bi bi-telephone me-1"></i>
                                            {booking.customerPhone}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column gap-1">
                                            <div className="small">
                                                <span className="badge bg-light text-dark border me-1">From</span>
                                                {booking.startingDate} <span className="text-muted ms-1"><i className="bi bi-clock"></i> {booking.pickupTime}</span>
                                            </div>
                                            <div className="small">
                                                <span className="badge bg-light text-dark border me-1">To</span>
                                                {booking.endDate} <span className="text-muted ms-1"><i className="bi bi-clock"></i> {booking.returnTime}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-end">
                                        <div className="fw-bold text-dark">₹{booking.totalAmount}</div>
                                        <div className="text-danger small" style={{ fontSize: '0.75rem' }}>
                                            Deposit: ₹{booking.depositAmount}
                                        </div>
                                        <div className="text-success small" style={{ fontSize: '0.75rem' }}>
                                            Paid: ₹{booking.paidAmount}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="mb-2">
                                            <span className={`badge rounded-pill ${booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'COMPLETED' ? 'bg-success' :
                                                    booking.bookingStatus === 'PENDING' || booking.bookingStatus === 'ONGOING' ? 'bg-warning text-dark' :
                                                        'bg-danger'
                                                } px-3`}>
                                                {booking.bookingStatus}
                                            </span>
                                        </div>
                                        <div className="small text-muted" style={{ fontSize: '0.7rem' }}>
                                            Payment: {booking.paymentStatus}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style>{`
                .font-monospace {
                    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                }
            `}</style>
        </div>
    );
}

export default OwnerBookings;
