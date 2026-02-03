import { useEffect, useState } from "react"
import axios from "../services/axiosConfig"
import { useParams } from "react-router-dom"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function AdminDeliveryTrack() {
  const { id } = useParams()
  const [location, setLocation] = useState(null)

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const res = await axios.get(`/order/track/${id}`)
        const data = res.data.data

        setLocation({
          lat: Number(data.latitude),
          lng: Number(data.longitude),
          status: data.delivery_status
        })
      } catch (err) {
        console.log("Tracking error", err)
      }
    }

    loadLocation()
    const interval = setInterval(loadLocation, 3000)
    return () => clearInterval(interval)
  }, [id])

  if (!location) return <h4>Loading tracking...</h4>

  return (
    <div className="container mt-4">
      <h3>Live Delivery Tracking</h3>

      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
      <p>Status: {location.status}</p>

      <MapContainer center={[location.lat, location.lng]} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.lat, location.lng]}>
          <Popup>Delivery Man</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}