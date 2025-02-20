import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import arrow icon

import CountyDetailChart from "../components/common/county-detail-chart";
import TopCounty from "../components/common/Top-County";
import useFetchTopLeases from "../hooks/useFetchTopLeases";
import useFetchTopOperators from "../hooks/useFetchTopOperators";
import useFetchTopPermits from "../hooks/useFetchTopPermits";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

const CountyDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const topLeases = useFetchTopLeases();
  const topOperators = useFetchTopOperators();
  const topPermits = useFetchTopPermits();
  const [open, setOpen] = useState(false);
  // const texasBounds = [
  //   [25.8371, -106.6456], // Southwest corner
  //   [36.5007, -93.5083], // Northeast corner
  // ];

  const position = { lat: 31.9686, lng: -99.9018 };

  const { id, county } = location.state || {};
  console.log(id);

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Back Button */}
      <div className="flex gap-20 items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all border w-28 p-2 rounded-md backdrop-blur"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h3 className="text-2xl leading-none">
          Oil Wells and Production in {county}, TX
        </h3>
      </div>

      {/* Map section */}
      {/* 95e233e99894c103 */}
      {/* mapify */}
      <APIProvider apiKey="AIzaSyAp3oXXFEBD_rQ3QVj7viHJ8DHvNe6qK4U">
        <div className="h-[50vh] w-full">
          <Map zoom={9} center={position} mapId="72b651384acd4611">
            <AdvancedMarker onClick={() => setOpen(true)} position={position}>
              <Pin
                background={"grey"}
                borderColor={"green"}
                glyphColor={"purple"}
              />
              {open && (
                <InfoWindow
                  position={position}
                  onCloseClick={() => setOpen(false)}
                  options={{ maxWidth: 300 }}
                >
                  <div>
                    <h3>{county}</h3>
                    <p>
                      This map shows the location of oil wells and production in{" "}
                      {county}, Texas. Click on the pin to view more details.
                    </p>
                  </div>
                </InfoWindow>
              )}
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
      {/* <CountyDetailMap /> */}
      <CountyDetailChart />
      <CountyDetailChart />

      {/* Top sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        <TopCounty data={topLeases.counties} prefix="Lease" />
        <TopCounty data={topOperators.counties} prefix="Operator" />
        <TopCounty data={topPermits.counties} prefix="Permit" />
      </div>
    </div>
  );
};

export default CountyDetailPage;
