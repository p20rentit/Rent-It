-- FIX for "Data truncated for column 'booking_status'"
-- This error occurs because the database ENUM definition does not contain the new status values added in the Java code.

-- 1. Update booking_status to include 'PENDING_PAYMENT'
ALTER TABLE booking MODIFY COLUMN booking_status ENUM('PENDING', 'PENDING_PAYMENT', 'CONFIRMED', 'CANCELLED', 'ONGOING', 'COMPLETED') NOT NULL;

-- 2. Update payment_status to include 'PARTIAL' (Predictive fix for next potential error)
ALTER TABLE payment MODIFY COLUMN payment_status ENUM('PENDING', 'PARTIAL', 'SUCCESS', 'FAILED', 'REFUNDED') NOT NULL;
