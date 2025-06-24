"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Users, MapPin, Clock, Star, Shield, Headphones } from "lucide-react"

export default function HomePage() {
  const [driveType, setDriveType] = useState("chauffeur")
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RentKaro</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/cars" className="text-gray-700 hover:text-blue-600">
                Cars
              </Link>
              <Link href="/booking" className="text-gray-700 hover:text-blue-600">
                Book Now
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>
            <Button asChild>
              <Link href="/cars">Book Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Rent Cars Across India</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose from Chauffeur-Driven or Self-Driven options. Pay per KM with transparent pricing. Book Swift,
            Innova, and more premium cars instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/cars">Browse Cars</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link href="/contact">Contact Admin</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Drive Options */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Drive Style</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card
              className={`p-8 hover:shadow-lg transition-all cursor-pointer ${
                driveType === "chauffeur" ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setDriveType("chauffeur")}
            >
              <CardContent className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold">Chauffeur Driven</h3>
                <p className="text-gray-600">
                  Sit back and relax while our professional drivers take you to your destination safely.
                </p>
                <Badge variant="secondary" className="text-sm">
                  Most Popular
                </Badge>
              </CardContent>
            </Card>
            <Card
              className={`p-8 hover:shadow-lg transition-all cursor-pointer ${
                driveType === "self" ? "ring-2 ring-green-500 bg-green-50" : ""
              }`}
              onClick={() => setDriveType("self")}
            >
              <CardContent className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Car className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">Self Driven</h3>
                <p className="text-gray-600">
                  Drive yourself and enjoy the freedom of the road with our well-maintained vehicles.
                </p>
                <Badge variant="outline" className="text-sm">
                  New Option
                </Badge>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href={`/cars?drive=${driveType}`}>
                Browse {driveType === "chauffeur" ? "Chauffeur Driven" : "Self Driven"} Cars
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Cars Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Car Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <Car className="h-16 w-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">5-Seater Cars</h3>
                <p className="text-gray-600 mb-4">Swift, Dzire, Baleno - Perfect for small families</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">₹12/KM</span>
                  <Button size="sm" asChild>
                    <Link href="/cars?category=5-seater">View Cars</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <Users className="h-16 w-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">8-Seater Cars</h3>
                <p className="text-gray-600 mb-4">Innova, Ertiga - Ideal for large groups</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">₹18/KM</span>
                  <Button size="sm" asChild>
                    <Link href="/cars?category=8-seater">View Cars</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <Shield className="h-16 w-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Premium SUVs</h3>
                <p className="text-gray-600 mb-4">Fortuner, Creta - Luxury travel experience</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-purple-600">₹25/KM</span>
                  <Button size="sm" asChild>
                    <Link href="/cars?category=suv">View Cars</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RentKaro?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">KM-Based Pricing</h3>
              <p className="text-gray-600">Pay only for the distance you travel. Transparent and fair pricing.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Booking</h3>
              <p className="text-gray-600">Book your car in minutes with our simple online process.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Well-maintained vehicles with regular servicing and cleaning.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support via phone and WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Car?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers who trust RentKaro for their travel needs.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link href="/cars">Start Booking Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="text-lg font-bold">RentKaro</span>
              </div>
              <p className="text-gray-400">India's trusted car rental platform with transparent KM-based pricing.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/cars" className="block text-gray-400 hover:text-white">
                  Browse Cars
                </Link>
                <Link href="/booking" className="block text-gray-400 hover:text-white">
                  Book Now
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Car Types</h3>
              <div className="space-y-2">
                <span className="block text-gray-400">5-Seater Cars</span>
                <span className="block text-gray-400">8-Seater Cars</span>
                <span className="block text-gray-400">Premium SUVs</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91 98765 43210</p>
                <p>📧 info@rentkaro.com</p>
                <p>💬 WhatsApp Support</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RentKaro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
