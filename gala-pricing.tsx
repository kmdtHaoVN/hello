import { Check, Crown, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  const pricingTiers = [
    {
      name: "Standard",
      price: 150,
      description: "Perfect for enjoying the gala experience",
      icon: Users,
      features: [
        "General admission seating",
        "Welcome cocktail reception",
        "3-course dinner",
        "Live entertainment",
        "Dancing until midnight",
        "Event program & gift bag",
      ],
      popular: false,
      color: "bg-slate-50 border-slate-200",
    },
    {
      name: "Premium",
      price: 275,
      description: "Enhanced experience with premium benefits",
      icon: Star,
      features: [
        "Priority seating arrangement",
        "Premium cocktail reception",
        "4-course gourmet dinner",
        "Wine pairing with dinner",
        "Meet & greet with performers",
        "Professional event photography",
        "Exclusive gift bag",
        "Complimentary coat check",
      ],
      popular: true,
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "VIP",
      price: 450,
      description: "Ultimate luxury gala experience",
      icon: Crown,
      features: [
        "VIP reserved table seating",
        "Private pre-event reception",
        "5-course chef's special menu",
        "Premium wine & champagne service",
        "Private meet & greet session",
        "Professional portrait session",
        "Luxury gift package",
        "Dedicated concierge service",
        "Valet parking included",
        "After-party access",
      ],
      popular: false,
      color: "bg-amber-50 border-amber-200",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Annual Charity Gala 2024</h1>
          <p className="text-xl text-slate-600 mb-2">An Evening of Elegance & Impact</p>
          <p className="text-slate-500">Saturday, December 14th • 7:00 PM • Grand Ballroom</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier) => {
            const IconComponent = tier.icon
            return (
              <Card
                key={tier.name}
                className={`relative ${tier.color} ${tier.popular ? "ring-2 ring-blue-500 scale-105" : ""} transition-all duration-300 hover:shadow-lg`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${tier.popular ? "bg-blue-100" : "bg-slate-100"}`}>
                      <IconComponent className={`w-8 h-8 ${tier.popular ? "text-blue-600" : "text-slate-600"}`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{tier.name}</CardTitle>
                  <CardDescription className="text-slate-600">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">${tier.price}</span>
                    <span className="text-slate-500 ml-1">per person</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      tier.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-900 hover:bg-slate-800"
                    }`}
                    size="lg"
                  >
                    Select {tier.name} Ticket
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg p-8 shadow-sm border">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Event Details</h3>
              <div className="space-y-2 text-slate-600">
                <p>
                  <strong>Date:</strong> Saturday, December 14th, 2024
                </p>
                <p>
                  <strong>Time:</strong> 7:00 PM - 12:00 AM
                </p>
                <p>
                  <strong>Venue:</strong> Grand Ballroom, Metropolitan Hotel
                </p>
                <p>
                  <strong>Dress Code:</strong> Black Tie Optional
                </p>
                <p>
                  <strong>Parking:</strong> Valet available ($25, complimentary for VIP)
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Important Notes</h3>
              <div className="space-y-2 text-slate-600 text-sm">
                <p>• All ticket sales are final - no refunds</p>
                <p>• Tickets are transferable with advance notice</p>
                <p>• Dietary restrictions can be accommodated</p>
                <p>• Photography will be taking place during the event</p>
                <p>• Proceeds benefit local children's charities</p>
                <p>• Group discounts available for 10+ tickets</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-8 text-slate-600">
          <p>
            Questions? Contact us at <span className="font-medium">events@charitygala.org</span> or call{" "}
            <span className="font-medium">(555) 123-4567</span>
          </p>
        </div>
      </div>
    </div>
  )
}
