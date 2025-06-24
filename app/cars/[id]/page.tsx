"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Users, Fuel, Wind, Star, ArrowLeft, Calendar, MapPin } from "lucide-react"

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
    available: true,
    rating: 4.5,
    isPremium: false,
    description:
      "The Maruti Swift is a popular hatchback known for its fuel efficiency and compact design. Perfect for city drives and short trips.",
    features: ["Power Steering", "Central Locking", "Air Conditioning", "Music System"],
    images: {
      front: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop",
      back: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
      interior: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
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
    available: true,
    rating: 4.6,
    isPremium: false,
    description:
      "The Maruti Dzire offers comfort and style with its spacious sedan design. Ideal for business trips and family outings.",
    features: ["Power Steering", "Central Locking", "Air Conditioning", "Music System", "Power Windows"],
    images: {
      front: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
      back: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
      interior: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
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
    available: true,
    rating: 4.8,
    isPremium: true,
    description:
      "The Toyota Fortuner is a premium SUV that combines luxury with performance. Perfect for long trips and rough terrains.",
    features: ["4WD", "Leather Seats", "Automatic Transmission", "Premium Sound System", "Climate Control", "Sunroof"],
    images: {
      front: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
      back: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
      side: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
      interior: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
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
    available: true,
    rating: 4.7,
    isPremium: true,
    description:
      "The Mahindra XUV700 is a feature-rich premium SUV with advanced technology and superior comfort for the modern traveler.",
    features: [
      "ADAS",
      "Panoramic Sunroof",
      "Premium Audio",
      "Wireless Charging",
      "Digital Cluster",
      "Ventilated Seats",
    ],
    images: {
      front: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
      back: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
      side: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
      interior: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
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
    available: true,
    rating: 4.6,
    isPremium: false,
    description:
      "The Hyundai Creta is a stylish and feature-rich SUV that offers excellent comfort and performance. Perfect for both city drives and highway trips.",
    features: [
      "Touchscreen Infotainment",
      "Automatic Climate Control",
      "Rear Parking Camera",
      "Cruise Control",
      "Wireless Charging",
    ],
    images: {
      front: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop",
      back: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop",
      side: "https://images.unsplash.com/photo-1616788494672-ec4d1b5c8c9d?w=600&h=400&fit=crop",
      interior: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
  },
]

const reviews = [
  {
    id: 1,
    carId: 1,
    name: "Rajesh Kumar",
    date: "2024-01-15",
    rating: 5,
    comment: "Excellent service! The car was clean and well-maintained. Driver was very professional.",
  },
  {
    id: 2,
    carId: 1,
    name: "Priya Sharma",
    date: "2024-01-10",
    rating: 4,
    comment: "Good experience overall. Car was comfortable for our family trip to Goa.",
  },
  {
    id: 3,
    carId: 1,
    name: "Amit Patel",
    date: "2024-01-05",
    rating: 5,
    comment: "Great value for money. Booking process was smooth and hassle-free.",
  },
  {
    id: 4,
    carId: 7,
    name: "Suresh Reddy",
    date: "2024-01-20",
    rating: 5,
    comment: "Amazing SUV! Perfect for our hill station trip. Very comfortable and powerful.",
  },
  {
    id: 5,
    carId: 7,
    name: "Kavita Singh",
    date: "2024-01-18",
    rating: 4,
    comment: "Luxurious experience. The Fortuner handled mountain roads beautifully.",
  },
  {
    id: 6,
    carId: 9,
    name: "Deepak Agarwal",
    date: "2024-01-22",
    rating: 5,
    comment: "Outstanding features and comfort. The XUV700 exceeded our expectations!",
  },
  {
    id: 7,
    carId: 8,
    name: "Rohit Sharma",
    date: "2024-01-25",
    rating: 5,
    comment: "Excellent SUV! Very comfortable for long drives. Great features and smooth performance.",
  },
  {
    id: 8,
    carId: 8,
    name: "Sneha Gupta",
    date: "2024-01-20",
    rating: 4,
    comment: "Good car for family trips. Spacious and well-equipped with modern features.",
  },
  {
    id: 9,
    carId: 8,
    name: "Vikram Singh",
    date: "2024-01-18",
    rating: 5,
    comment: "Amazing value for money. The Creta handles both city and highway driving beautifully.",
  },
]

export default function CarDetailPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState("front")
  const [driveType, setDriveType] = useState("chauffeur")

  const carId = Number.parseInt(params.id as string)
  const car = cars.find((c) => c.id === carId)
  const carReviews = reviews.filter((r) => r.carId === carId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Car Not Found</h2>
            <p className="text-gray-600 mb-4">The requested car could not be found.</p>
            <Button asChild>
              <Link href="/cars">Back to Cars</Link>
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
            <Button variant="ghost" asChild>
              <Link href="/cars" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Cars
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Car Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
            {car.isPremium && <Badge variant="secondary">Premium</Badge>}
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{car.rating}</span>
              <span className="text-gray-500">({carReviews.length} reviews)</span>
            </div>
          </div>
          <p className="text-gray-600">{car.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video mb-4">
                  <Image
                    src={car.images[selectedImage as keyof typeof car.images] || "/placeholder.svg"}
                    alt={`${car.name} ${selectedImage}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(car.images).map(([view, src]) => (
                    <button
                      key={view}
                      onClick={() => setSelectedImage(view)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === view ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`${car.name} ${view}`}
                        width={150}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                      <div className="text-xs text-center py-1 bg-gray-50 capitalize">{view}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features & Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Car Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{car.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seats:</span>
                        <span className="font-medium">{car.seats} Seater</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fuel:</span>
                        <span className="font-medium">{car.fuel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">AC:</span>
                        <span className="font-medium">{car.ac ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-1">
                      {car.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {carReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString("en-IN")}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book This Car</span>
                  <span className="text-2xl font-bold text-blue-600">₹{car.rate}/KM</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Drive Type Selection */}
                <div>
                  <h4 className="font-medium mb-3">Select Drive Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDriveType("chauffeur")}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        driveType === "chauffeur"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Users className="h-4 w-4 mx-auto mb-1" />
                      Chauffeur
                    </button>
                    <button
                      onClick={() => setDriveType("self")}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        driveType === "self"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Car className="h-4 w-4 mx-auto mb-1" />
                      Self Drive
                    </button>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Fuel className="h-4 w-4 text-gray-500" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span>{car.ac ? "AC Available" : "Non-AC"}</span>
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Pricing Details</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Rate per KM:</span>
                      <span className="font-medium">₹{car.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Advance Payment:</span>
                      <span className="font-medium">50% of total</span>
                    </div>
                    <p className="text-xs text-blue-700 mt-2">Final fare = Actual KM × ₹{car.rate}/KM</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/booking?car=${car.id}&drive=${driveType}`}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/contact">
                      <MapPin className="h-4 w-4 mr-2" />
                      Contact Admin
                    </Link>
                  </Button>
                </div>

                {/* Availability Status */}
                <div className="text-center">
                  {car.available ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Available Now
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Currently Unavailable</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
