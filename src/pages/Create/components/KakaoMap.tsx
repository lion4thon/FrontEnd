
import React, { useEffect, useRef } from "react";
import markerIcon from "../../../assets/marker.png"

interface KakaoMapProps {
  address: string;
  name?: string;
  height?: string;
}

interface AddressSearchResult {
  x: string; 
  y: string; 
  address_name?: string;
  road_address_name?: string;
}

type KakaoStatus = "OK" | "ZERO_RESULT" | "ERROR";

const KakaoMap: React.FC<KakaoMapProps> = ({ address, name }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMap = () => {
      if (!window.kakao || !window.kakao.maps || !mapContainerRef.current) return;

      const geocoder = new window.kakao.maps.services.Geocoder();

geocoder.addressSearch(
  address,
  (result: AddressSearchResult[], status: KakaoStatus) => {
    if (status !== "OK" || result.length === 0) return;

    const first = result[0];
    const coords = new window.kakao.maps.LatLng(
      Number(first.y),
      Number(first.x)
    );

    const map = new window.kakao.maps.Map(mapContainerRef.current!, {
      center: coords,
      level: 3,
    });

    const imageSrc = markerIcon; 
    const imageSize = new window.kakao.maps.Size(40, 42);
    const imageOption = {
      offset: new window.kakao.maps.Point(20, 42),
    };

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new window.kakao.maps.Marker({
      position: coords,
      image: markerImage,
    });
    marker.setMap(map);

    if (name) {
      const content = `
        <div style="
          padding:4px 10px;
          background:#fff;
          border-radius:12px;
          border:1px solid #ddd;
          font-size:13px;
          box-shadow:0 2px 6px rgba(0,0,0,0.15);
          white-space:nowrap;
          position: relative;
          top: -36px;
        ">
          ${name}
        </div>
      `;

      const overlay = new window.kakao.maps.CustomOverlay({
        position: coords,
        content,
        yAnchor: 1.5, 
      });
      overlay.setMap(map);
    }
  }
);
    };

    const existingScript = document.getElementById(
      "kakao-map-sdk"
    ) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "kakao-map-sdk";
      const appKey = import.meta.env.VITE_API_MAP;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(loadMap);
        }
      };
      document.head.appendChild(script);
    } else {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(loadMap);
      } else {
        existingScript.addEventListener("load", () => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(loadMap);
          }
        });
      }
    }
  }, [address, name]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default KakaoMap;