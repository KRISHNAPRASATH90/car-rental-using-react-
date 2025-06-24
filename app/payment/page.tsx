"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Car, CreditCard, Smartphone, Building, CheckCircle, ArrowLeft } from "lucide-react"

export default function PaymentPage() {
  const [bookingData, setBookingData] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const data = localStorage.getItem("bookingData")
    if (data) {
      setBookingData(JSON.parse(data))
    }
  }, [])

  const handlePayment = () => {
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      // Store payment success data
      const paymentData = {
        ...bookingData,
        paymentMethod,
        paymentStatus: "success",
        paymentId: "PAY" + Date.now(),
        paymentDate: new Date().toISOString(),
      }
      localStorage.setItem("paymentData", JSON.stringify(paymentData))
      window.location.href = "/confirmation"
    }, 3000)
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No Booking Found</h2>
            <p className="text-gray-600 mb-4">Please complete the booking process first.</p>
            <Button asChild>
              <Link href="/booking">Go to Booking</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RentKaro</span>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/booking" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Booking
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Payment</h1>
          <p className="text-gray-600">Secure your booking with advance payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {/* UPI Payment */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Smartphone className="h-6 w-6 text-green-600" />
                        <div>
                          <div className="font-medium">UPI Payment</div>
                          <div className="text-sm text-gray-500">Pay using GPay, PhonePe, Paytm</div>
                        </div>
                      </Label>
                    </div>
                    {paymentMethod === "upi" && (
                      <div className="mt-4 pl-9 space-y-3">
                        <div className="flex gap-3">
                          <div className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium">GPay</div>
                          <div className="bg-purple-600 text-white px-3 py-2 rounded text-sm font-medium">PhonePe</div>
                          <div className="bg-blue-500 text-white px-3 py-2 rounded text-sm font-medium">Paytm</div>
                        </div>
                        <Input placeholder="Enter UPI ID (optional)" />
                      </div>
                    )}
                  </div>

                  {/* Card Payment */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-500">Visa, Mastercard, RuPay</div>
                        </div>
                      </Label>
                    </div>
                    {paymentMethod === "card" && (
                      <div className="mt-4 pl-9 space-y-3">
                        <Input placeholder="Card Number" />
                        <div className="grid grid-cols-2 gap-3">
                          <Input placeholder="MM/YY" />
                          <Input placeholder="CVV" />
                        </div>
                        <Input placeholder="Cardholder Name" />
                      </div>
                    )}
                  </div>

                  {/* Net Banking */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Building className="h-6 w-6 text-orange-600" />
                        <div>
                          <div className="font-medium">Net Banking</div>
                          <div className="text-sm text-gray-500">All major banks supported</div>
                        </div>
                      </Label>
                    </div>
                    {paymentMethod === "netbanking" && (
                      <div className="mt-4 pl-9">
                        <select className="w-full p-2 border rounded">
                          <option>Select Your Bank</option>
                          <option>State Bank of India</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Punjab National Bank</option>
                        </select>
                      </div>
                    )}
                  </div>
                </RadioGroup>

                <div className="mt-6">
                  <Button onClick={handlePayment} disabled={processing} className="w-full" size="lg">
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Pay ₹{bookingData.advanceAmount}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">{bookingData.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Car:</span>
                    <span className="font-medium">{bookingData.selectedCar.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Drive Type:</span>
                    <span className="font-medium capitalize">{bookingData.driveType} Driven</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated KM:</span>
                    <span className="font-medium">{bookingData.estimatedKm} KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate:</span>
                    <span className="font-medium">₹{bookingData.selectedCar.rate}/KM</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Fare:</span>
                    <span className="font-medium">₹{bookingData.totalFare}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Advance Payment:</span>
                    <span className="font-bold text-green-600">₹{bookingData.advanceAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Remaining (After Trip):</span>
                    <span>₹{bookingData.totalFare - bookingData.advanceAmount}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Secure Payment:</strong> Your payment is protected with 256-bit SSL encryption.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
