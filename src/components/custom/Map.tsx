import { Map, AdvancedMarker, APIProvider } from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";

export default function ImpactMap() {

  const t = useTranslations("frontpage.map");

  return (
    <div className="h-2/5 w-full flex flex-col justify-center items-center ">
      <div>
        <h1 className="text-lg font-bold text-center mb-4">{t("title")}</h1>
      </div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{
            width: "80vw",
            height: "80vh",
            borderRadius: "1rem",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
          defaultCenter={{
            lat: 38.05549193859103,
            lng: -1.217749291324227,
          }}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
          mapTypeId="terrain"
        >
          <AdvancedMarker
            position={{ lat: 38.05549193859103, lng: -1.217749291324227 }}
          />
        </Map>
      </APIProvider>
    </div>
  );
}
