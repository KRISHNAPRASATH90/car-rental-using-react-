"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Users, Fuel, Wind, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const cars = [
  {
    id: 1,
    name: "Maruti Swift",
    category: "5-seater",
    type: "Hatchback",
    seats: 5,
    fuel: "Petrol",
    ac: true,
    rate: 12,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=250&fit=crop",
    available: true,
    rating: 4.5,
    isPremium: false,
  },
  {
    id: 2,
    name: "Maruti Dzire",
    category: "5-seater",
    type: "Sedan",
    seats: 5,
    fuel: "Petrol",
    ac: true,
    rate: 14,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop",
    available: true,
    rating: 4.6,
    isPremium: false,
  },
  {
    id: 3,
    name: "Hyundai i20",
    category: "5-seater",
    type: "Hatchback",
    seats: 5,
    fuel: "Petrol",
    ac: true,
    rate: 13,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop",
    available: true,
    rating: 4.4,
    isPremium: false,
  },
  {
    id: 4,
    name: "Toyota Innova",
    category: "8-seater",
    type: "MPV",
    seats: 8,
    fuel: "Diesel",
    ac: true,
    rate: 18,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop",
    available: true,
    rating: 4.7,
    isPremium: false,
  },
  {
    id: 5,
    name: "Maruti Ertiga",
    category: "8-seater",
    type: "MPV",
    seats: 7,
    fuel: "Petrol",
    ac: true,
    rate: 16,
    image: "https://images.unsplash.com/photo-1494976688153-c91c18894e15?w=400&h=250&fit=crop",
    available: true,
    rating: 4.3,
    isPremium: false,
  },
  {
    id: 6,
    name: "Mahindra Bolero",
    category: "8-seater",
    type: "SUV",
    seats: 8,
    fuel: "Diesel",
    ac: true,
    rate: 17,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=250&fit=crop",
    available: false,
    rating: 4.2,
    isPremium: false,
  },
  {
    id: 7,
    name: "Toyota Fortuner",
    category: "suv",
    type: "Premium SUV",
    seats: 7,
    fuel: "Diesel",
    ac: true,
    rate: 25,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
    available: true,
    rating: 4.8,
    isPremium: true,
  },
  {
    id: 8,
    name: "Hyundai Creta",
    category: "suv",
    type: "SUV",
    seats: 5,
    fuel: "Petrol",
    ac: true,
    rate: 22,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=250&fit=crop",
    available: true,
    rating: 4.6,
    isPremium: false,
  },
  {
    id: 9,
    name: "Mahindra XUV700",
    category: "suv",
    type: "Premium SUV",
    seats: 7,
    fuel: "Petrol",
    ac: true,
    rate: 28,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop",
    available: true,
    rating: 4.7,
    isPremium: true,
  },
]

export default function CarsPage() {
  const [driveType, setDriveType] = useState("chauffeur")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const searchParams = useSearchParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    const driveParam = searchParams.get("drive")
    const categoryParam = searchParams.get("category")

    if (driveParam) setDriveType(driveParam)
    if (categoryParam) setSelectedCategory(categoryParam)
  }, [searchParams])

  const filteredCars = cars.filter((car) => {
    if (selectedCategory === "all") return true
    return car.category === selectedCategory
  })

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
              <Link href="/cars" className="text-blue-600 font-medium">
                Cars
              </Link>
              <Link href="/booking" className="text-gray-700 hover:text-blue-600">
                Book Now
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Perfect Car</h1>
          <p className="text-gray-600">
            Select from our wide range of well-maintained vehicles with transparent KM-based pricing
          </p>
        </div>

        {/* Drive Type Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Drive Type</h2>
          <div className="flex gap-4">
            <Button
              variant={driveType === "chauffeur" ? "default" : "outline"}
              onClick={() => setDriveType("chauffeur")}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Chauffeur Driven
            </Button>
            <Button
              variant={driveType === "self" ? "default" : "outline"}
              onClick={() => setDriveType("self")}
              className="flex items-center gap-2"
            >
              <Car className="h-4 w-4" />
              Self Driven
            </Button>
          </div>
          {driveType === "self" && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <Badge variant="secondary" className="mr-2">
                  New!
                </Badge>
                Self-driven option now available. Valid driving license required.
              </p>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Cars</TabsTrigger>
            <TabsTrigger value="5-seater">5-Seater</TabsTrigger>
            <TabsTrigger value="8-seater">8-Seater</TabsTrigger>
            <TabsTrigger value="suv">Premium SUV</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card
              key={car.id}
              className={`overflow-hidden hover:shadow-lg transition-shadow ${!car.available ? "opacity-60" : ""}`}
            >
              <div className="aspect-video bg-gray-200 relative">
                <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                {!car.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="destructive">Not Available</Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{car.name}</CardTitle>
                    <p className="text-sm text-gray-600">{car.type}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-4 w-4 text-gray-500" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span>{car.ac ? "AC" : "Non-AC"}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">₹{car.rate}</span>
                    <span className="text-gray-600">/KM</span>
                    {car.isPremium && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/cars/${car.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" asChild disabled={!car.available}>
                      <Link href={car.available ? `/booking?car=${car.id}&drive=${driveType}` : "#"}>
                        {car.available ? "Book Now" : "Unavailable"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Pricing Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">₹12-14</div>
              <div className="text-gray-600">5-Seater Cars</div>
              <div className="text-sm text-gray-500">Per KM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">₹16-18</div>
              <div className="text-gray-600">8-Seater Cars</div>
              <div className="text-sm text-gray-500">Per KM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">₹25-28</div>
              <div className="text-gray-600">Premium SUVs</div>
              <div className="text-sm text-gray-500">Per KM</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Final fare = Total KM × Rate per KM. 50% advance payment required at booking.
              Remaining amount to be paid after trip completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
