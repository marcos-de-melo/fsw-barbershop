import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Star } from "lucide-react"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[159px]">
      <CardContent className="p-0">
        <div className="relative h-[159px] w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-t-xl object-cover"
          />
          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant={"secondary"}
          >
            <Star size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>
        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="text-semibold truncate">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
