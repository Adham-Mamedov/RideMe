import { FC, memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import LocationMarker from '@client/components/shared/LocationMarker';

import { useGlobalStore } from '@client/stores/GlobalStore';

import { IStation } from '@shared/types/assets.types';
import { defaultStationData } from '@client/utils/defaults';

import 'leaflet/dist/leaflet.css';

interface IProps {
  onLocationClick: (station: IStation) => void;
  activeStation: IStation | null;
}

const StationsMap: FC<IProps> = ({ onLocationClick, activeStation }) => {
  const filteredStations = useGlobalStore((state) => state.filteredStations);

  return (
    <MapContainer
      style={{
        width: '100%',
        height: '100%',
      }}
      center={defaultStationData.location}
      zoom={14}
      minZoom={14}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredStations.map((station) => (
        <LocationMarker
          key={station.id}
          enlarged={station.id === activeStation?.id}
          onMarkerClick={() => {
            onLocationClick(station);
          }}
          initialPosition={{
            lat: station.location[0],
            lng: station.location[1],
          }}
        />
      ))}
    </MapContainer>
  );
};

export default memo(StationsMap);
