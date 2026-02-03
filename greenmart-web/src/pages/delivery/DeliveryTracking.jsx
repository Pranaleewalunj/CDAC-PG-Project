import { useEffect, useState } from "react";
import axios from "../../services/deliveryAxios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function DeliveryTracking() {
  const [pos, setPos] = useState(null);

  const deliveryManId = localStorage.getItem("delivery_id"); // match login key

if (!deliveryManId) {
  console.error("No deliveryManId found in localStorage!", localStorage);
  return <h3>Error: Please login first.</h3>;
}

  useEffect(() => {
    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition(
        p => {
          const location = {
            lat: p.coords.latitude,
            lng: p.coords.longitude
          };
          setPos(location);

          axios
            .put(`/delivery-men/location/${deliveryManId}`, location)
            .catch(err => console.error("Location update failed", err));
        },
        err => console.error("Geolocation error", err),
        { enableHighAccuracy: true }
      );
    };

    const interval = setInterval(sendLocation, 5000);
    return () => clearInterval(interval);
  }, [deliveryManId]);

  if (!pos) return <h3>Loading Map...</h3>;

  return (
    <div>
      <h3>Tracking Running...</h3>
      <MapContainer
        center={[pos.lat, pos.lng]}
        zoom={15}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[pos.lat, pos.lng]} />
      </MapContainer>
    </div>
  );
}