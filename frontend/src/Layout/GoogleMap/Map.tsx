import "./Map.css";

interface LatLng {
  lat: number | undefined;
  lng: number | undefined;
}

const Map = (props: LatLng) => {
  const { lat, lng } = props;

  return (
    <div className="google__map">
      <iframe
        src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
        loading="lazy"
        allowFullScreen={true}
        className="map"
      />
    </div>
  );
};

export default Map;
