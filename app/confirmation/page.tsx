"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, CheckCircle, Download, MessageCircle, Calendar, MapPin, Phone, Mail } from "lucide-react"

export default function ConfirmationPage() {
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const data = localStorage.getItem("paymentData")
    if (data) {
      setPaymentData(JSON.parse(data))
    }
  }, [])

  const downloadBill = () => {
    // In a real app, this would generate and download a PDF
    alert("Bill download feature would be implemented here. For demo purposes, showing alert.")
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No Payment Found</h2>
            <p className="text-gray-600 mb-4">Please complete the payment process first.</p>
            <Button asChild>
              <Link href="/booking">Go to Booking</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RentKaro</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild>
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-600">Your car booking has been confirmed</p>
          <Badge variant="secondary" className="mt-2">
            Booking ID: {paymentData.bookingId}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Car:</span>
                  <p className="font-medium">{paymentData.selectedCar.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Drive Type:</span>
                  <p className="font-medium capitalize">{paymentData.driveType} Driven</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Customer:</span>
                  <p className="font-medium">{paymentData.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <p className="font-medium">{paymentData.phone}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Trip Route</span>
                </div>
                <p className="text-sm text-gray-600">From: {paymentData.pickupLocation}</p>
                <p className="text-sm text-gray-600">To: {paymentData.dropLocation}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Schedule</span>
                </div>
                <p className="text-sm text-gray-600">
                  Pickup: {paymentData.pickupDate} at {paymentData.pickupTime}
                </p>
                {paymentData.dropDate && (
                  <p className="text-sm text-gray-600">
                    Drop: {paymentData.dropDate} at {paymentData.dropTime}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-medium">{paymentData.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">{paymentData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated KM:</span>
                  <span className="font-medium">{paymentData.estimatedKm} KM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate per KM:</span>
                  <span className="font-medium">₹{paymentData.selectedCar.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Fare:</span>
                  <span className="font-medium">₹{paymentData.totalFare}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Advance Paid:</span>
                  <span className="font-bold text-green-600">₹{paymentData.advanceAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Remaining Amount:</span>
                  <span>₹{paymentData.totalFare - paymentData.advanceAmount}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Remaining amount to be paid after trip completion based on actual KM
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <Button onClick={downloadBill} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Advance Bill
                </Button>
                <Button asChild className="w-full">
                  <Link href="https://wa.me/919876543210" target="_blank" className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Admin Will Contact</h3>
                <p className="text-sm text-gray-600">Our admin will call you within 1 hour to confirm pickup details</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Car className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Car Assignment</h3>
                <p className="text-sm text-gray-600">Vehicle and driver details will be shared 2 hours before pickup</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Enjoy Your Trip</h3>
                <p className="text-sm text-gray-600">Sit back and enjoy your comfortable journey with RentKaro</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Need Help? Contact Us</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              <span className="text-sm">+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <span className="text-sm">support@rentkaro.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm">WhatsApp Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
