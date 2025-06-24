"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Car, MapPin, Calculator, CreditCard } from "lucide-react"

const cars = [
  { id: 1, name: "Maruti Swift", rate: 12, category: "5-seater" },
  { id: 2, name: "Maruti Dzire", rate: 14, category: "5-seater" },
  { id: 3, name: "Hyundai i20", rate: 13, category: "5-seater" },
  { id: 4, name: "Toyota Innova", rate: 18, category: "8-seater" },
  { id: 5, name: "Maruti Ertiga", rate: 16, category: "8-seater" },
  { id: 6, name: "Mahindra Bolero", rate: 17, category: "8-seater" },
  { id: 7, name: "Toyota Fortuner", rate: 25, category: "suv" },
  { id: 8, name: "Hyundai Creta", rate: 22, category: "suv" },
  { id: 9, name: "Mahindra XUV700", rate: 28, category: "suv" },
]

export default function BookingPage() {
  const searchParams = useSearchParams()
  const [selectedCar, setSelectedCar] = useState("")
  const [driveType, setDriveType] = useState("chauffeur")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
    estimatedKm: "",
    specialRequests: "",
  })
  const [totalFare, setTotalFare] = useState(0)
  const [advanceAmount, setAdvanceAmount] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const carId = searchParams.get("car")
    const drive = searchParams.get("drive")

    if (carId) setSelectedCar(carId)
    if (drive) setDriveType(drive)
  }, [searchParams])

  useEffect(() => {
    if (selectedCar && formData.estimatedKm) {
      const car = cars.find((c) => c.id === Number.parseInt(selectedCar))
      if (car) {
        const total = Number.parseInt(formData.estimatedKm) * car.rate
        setTotalFare(total)
        setAdvanceAmount(Math.round(total * 0.5))
      }
    }
  }, [selectedCar, formData.estimatedKm])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedCarData = cars.find((c) => c.id === Number.parseInt(selectedCar))

  const handleBooking = () => {
    if (!selectedCar || !formData.name || !formData.phone || !formData.estimatedKm) {
      alert("Please fill all required fields")
      return
    }

    // Store booking data in localStorage for payment page
    const bookingData = {
      ...formData,
      selectedCar: selectedCarData,
      driveType,
      totalFare,
      advanceAmount,
      bookingId: "BK" + Date.now(),
    }
    localStorage.setItem("bookingData", JSON.stringify(bookingData))

    // Redirect to payment
    window.location.href = "/payment"
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
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/cars" className="text-gray-700 hover:text-blue-600">
                Cars
              </Link>
              <Link href="/booking" className="text-blue-600 font-medium">
                Book Now
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Car</h1>
          <p className="text-gray-600">Fill in the details below to complete your booking</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Trip Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup">Pickup Location *</Label>
                    <Input
                      id="pickup"
                      value={formData.pickupLocation}
                      onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                      placeholder="Enter pickup address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="drop">Drop Location *</Label>
                    <Input
                      id="drop"
                      value={formData.dropLocation}
                      onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                      placeholder="Enter drop address"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup-date">Pickup Date *</Label>
                    <Input
                      id="pickup-date"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pickup-time">Pickup Time *</Label>
                    <Input
                      id="pickup-time"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => handleInputChange("pickupTime", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="drop-date">Drop Date</Label>
                    <Input
                      id="drop-date"
                      type="date"
                      value={formData.dropDate}
                      onChange={(e) => handleInputChange("dropDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="drop-time">Drop Time</Label>
                    <Input
                      id="drop-time"
                      type="time"
                      value={formData.dropTime}
                      onChange={(e) => handleInputChange("dropTime", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Car Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Car & Drive Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Drive Type</Label>
                  <RadioGroup value={driveType} onValueChange={setDriveType} className="flex gap-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chauffeur" id="chauffeur" />
                      <Label htmlFor="chauffeur">Chauffeur Driven</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="self" id="self" />
                      <Label htmlFor="self">Self Driven</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="car">Select Car *</Label>
                  <Select value={selectedCar} onValueChange={setSelectedCar}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your car" />
                    </SelectTrigger>
                    <SelectContent>
                      {cars.map((car) => (
                        <SelectItem key={car.id} value={car.id.toString()}>
                          {car.name} - ₹{car.rate}/KM ({car.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="km">Estimated KM *</Label>
                  <Input
                    id="km"
                    type="number"
                    value={formData.estimatedKm}
                    onChange={(e) => handleInputChange("estimatedKm", e.target.value)}
                    placeholder="Enter approximate distance"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This helps us calculate your advance payment. Final billing will be based on actual KM.
                  </p>
                </div>
                <div>
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    placeholder="Any special requirements or instructions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCarData && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Car:</span>
                      <span className="font-medium">{selectedCarData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drive Type:</span>
                      <span className="font-medium capitalize">{driveType} Driven</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rate per KM:</span>
                      <span className="font-medium">₹{selectedCarData.rate}</span>
                    </div>
                    {formData.estimatedKm && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated KM:</span>
                          <span className="font-medium">{formData.estimatedKm} KM</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between text-lg">
                            <span className="font-semibold">Total Fare:</span>
                            <span className="font-bold text-blue-600">₹{totalFare}</span>
                          </div>
                          <div className="flex justify-between text-lg mt-2">
                            <span className="font-semibold">Advance (50%):</span>
                            <span className="font-bold text-green-600">₹{advanceAmount}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>Remaining:</span>
                            <span>₹{totalFare - advanceAmount}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleBooking}
                    className="w-full"
                    size="lg"
                    disabled={!selectedCar || !formData.name || !formData.phone || !formData.estimatedKm}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Payment
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  You'll pay ₹{advanceAmount} now. Remaining amount after trip completion.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
