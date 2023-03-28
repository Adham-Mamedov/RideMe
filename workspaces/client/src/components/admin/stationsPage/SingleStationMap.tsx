import { FC, memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import LocationMarker from '@client/components/shared/LocationMarker';

import { IStation } from '@shared/types/assets.types';
import 'leaflet/dist/leaflet.css';

interface IProps {
  lat: number;
  lng: number;
  setPosition: (value: IStation['location']) => void;
}

const SingleStationMap: FC<IProps> = ({ lat, lng, setPosition }) => {
  return (
    <MapContainer
      style={{
        width: '100%',
        height: '100%',
      }}
      center={[lat, lng]}
      zoom={12}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        editable
        onClick={setPosition}
        initialPosition={{ lat, lng }}
      />
    </MapContainer>
  );
};

export default memo(SingleStationMap);
