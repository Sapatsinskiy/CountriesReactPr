import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import "./Map.css";


function Map({element}){
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: "AIzaSyBcbQOenBrouiGdjYHHIpHvAD9Lzxn3K84",
    });
    
    const defaultCenter = {
      lat: element.latlng[0],
      lng: element.latlng[1],
    };

    return (
      <div className="map_container">
        {isLoaded && (
          <GoogleMap mapContainerClassName="map" zoom={5} center={defaultCenter}>
            <Marker position={defaultCenter} />
          </GoogleMap>
        )}
      </div>
    );
  };

export default Map