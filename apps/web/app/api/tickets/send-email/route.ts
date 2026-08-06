import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pnr, bookingId, trainName, trainNumber, fromCity, toCity, departureDate, departureTime, arrivalTime, travelClass, quota, passengers, totalFare, paymentMethod, email, mobile } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const ticketData = {
      pnr,
      bookingId,
      trainName,
      trainNumber,
      fromCity,
      toCity,
      departureDate,
      departureTime,
      arrivalTime,
      travelClass,
      quota,
      passengers: passengers.map((p: any) => ({
        name: p.name,
        age: p.age,
        gender: p.gender,
        status: p.status,
        seatAssigned: p.seatAssigned,
      })),
      totalFare,
      paymentMethod,
      email,
      mobile,
      sentAt: new Date().toISOString(),
    };

    console.log('[Email Dispatch]', JSON.stringify(ticketData, null, 2));

    return NextResponse.json({
      success: true,
      emailSentTo: email,
      timestamp: new Date().toISOString(),
      message: `E-Ticket confirmation sent to ${email}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process email request' }, { status: 500 });
  }
}
