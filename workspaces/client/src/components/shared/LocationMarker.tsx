import { FC, memo, useEffect, useState } from 'react';
import L, { LatLng } from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';

import { IStation } from '@shared/types/assets.types';

interface IProps {
  onMapClick?: (value: IStation['location']) => void | VoidFunction;
  initialPosition?: Partial<LatLng>;
  editable?: boolean;
  onMarkerClick?: () => void;
  enlarged?: boolean;
}

const LocationMarker: FC<IProps> = ({
  onMapClick,
  initialPosition,
  editable,
  onMarkerClick,
  enlarged,
}) => {
  const [position, setPosition] = useState<Partial<LatLng> | null>(
    initialPosition || null
  );

  const map = useMapEvents({
    click(e) {
      editable && setPosition(e.latlng);
      onMapClick && onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });

  useEffect(() => {
    if (initialPosition && enlarged) {
      const initialZoom = map.getZoom();
      let zoomLevel = initialZoom ** 0.9;
      zoomLevel *= initialZoom > 15 ? 2 : initialZoom < 13 ? 0.1 : 0.2;

      map.flyTo(
        {
          lat: initialPosition.lat! - initialPosition.lat! / 2000 / zoomLevel,
          lng: initialPosition.lng!,
        },
        undefined,
        {
          duration: 0.6,
        }
      );
    }
  }, [position, enlarged, map, initialPosition]);

  const markerEventHandlers = {
    click: () => {
      onMarkerClick && onMarkerClick();
    },
  };

  const icon = L.icon({
    iconUrl: '/images/map_location_icon.png',
    iconAnchor: enlarged ? [24, 48] : [16, 32],
    iconSize: enlarged ? [48, 48] : [32, 32],
  });

  return (
    position && (
      <Marker
        position={position as LatLng}
        icon={icon}
        eventHandlers={markerEventHandlers}
      />
    )
  );
};

export default memo(LocationMarker);
