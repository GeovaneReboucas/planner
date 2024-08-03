import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateTripPage } from "../pages/CreateTrip"
import { TripDetailsPage } from "../pages/TripDetails"

export function Router(){
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CreateTripPage />
    },
    {
      path: "/trips/:tripId",
      element: <TripDetailsPage />
    },
  ])

  return <RouterProvider router={router} />
}