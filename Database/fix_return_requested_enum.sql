-- FIX for "Data truncated for column 'booking_status'" when requesting return
-- Error: The database ENUM definition does not contain 'RETURN_REQUESTED'.

-- Update booking_status to include 'RETURN_REQUESTED'
ALTER TABLE booking MODIFY COLUMN booking_status ENUM('PENDING', 'PENDING_PAYMENT', 'CONFIRMED', 'CANCELLED', 'ONGOING', 'RETURN_REQUESTED', 'COMPLETED') NOT NULL;
