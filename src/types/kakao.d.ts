
export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      class LatLng {
        constructor(lat: number, lng: number);
      }

      interface MapOptions {
        center: LatLng;
        level: number;
      }

      class Map {
        constructor(container: HTMLElement, options: MapOptions);
        setCenter(latlng: LatLng): void;
      }

      class Marker {
        constructor(options: { position: LatLng; image?: MarkerImage });
        setMap(map: Map | null): void;
      }

      class InfoWindow {
        constructor(options: { content: string });
        open(map: Map, marker: Marker): void;
        close(): void;
      }

      class Size {
        constructor(width: number, height: number);
      }

      class Point {
        constructor(x: number, y: number);
      }

      interface MarkerImageOptions {
        offset?: Point;
      }

      class MarkerImage {
        constructor(src: string, size: Size, options?: MarkerImageOptions);
      }

      class CustomOverlay {
        constructor(options: {
          position: LatLng;
          content: string;
          yAnchor?: number;
        });
        setMap(map: Map | null): void;
      }

      namespace services {
        interface AddressSearchResult {
          x: string;
          y: string;
          address_name?: string;
          road_address_name?: string;
        }

        enum Status {
          OK = "OK",
          ZERO_RESULT = "ZERO_RESULT",
          ERROR = "ERROR",
        }

        class Geocoder {
          addressSearch(
            address: string,
            callback: (result: AddressSearchResult[], status: Status) => void
          ): void;
        }
      }
    }
  }
}