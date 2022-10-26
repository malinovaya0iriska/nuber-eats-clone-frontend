/* eslint-disable no-magic-numbers */
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import { usePosition } from 'hooks';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Dashboard = (): ReturnComponentType => {
  const { longitude, latitude } = usePosition();

  const mapData = {
    center: [latitude, longitude],
    zoom: 16,
  };

  const coordinates = [[latitude, longitude]];

  console.log(longitude, latitude);

  return (
    <YMaps>
      <Map defaultState={mapData} width="1400px" height="90%">
        {coordinates.map(coordinate => (
          <Placemark key="d" geometry={coordinate} />
        ))}
      </Map>
    </YMaps>
  );
};
