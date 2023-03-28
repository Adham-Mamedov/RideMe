import { FC, memo, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';

import { IStation } from '@shared/types/assets.types';

interface IProps {
  onClick: (value: IStation['location']) => void | VoidFunction;
  initialPosition?: LatLngExpression;
  editable?: boolean;
}

const LocationMarker: FC<IProps> = ({ onClick, initialPosition, editable }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(
    initialPosition || null
  );
  useMapEvents({
    click(e) {
      editable && setPosition(e.latlng);
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });

  const icon = L.icon({
    iconUrl: '/images/map_location_icon.png',
    iconAnchor: [16, 32],
  });

  return position && <Marker position={position} icon={icon} />;
};

export default memo(LocationMarker);
