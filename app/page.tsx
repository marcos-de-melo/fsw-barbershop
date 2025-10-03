import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"

const Home = async () => {
  const session = await getServerSession(authOptions)
  // chamar os barbearias do banco
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
      })
    : []

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, Marcos</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>
        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant={"secondary"}
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />

                {option.title}
              </Link>
            </Button>
          ))}
        </div>
        {/* IMAGEN */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com a gente"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/* AGENDAMENTO */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
