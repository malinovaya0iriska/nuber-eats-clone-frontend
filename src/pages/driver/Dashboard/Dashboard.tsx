import { useRef, useState } from 'react';

import { Map, YMaps } from '@pbe/react-yandex-maps';

import { usePosition } from 'hooks';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Dashboard = (): ReturnComponentType => {
  const { longitude, latitude } = usePosition();

  const mapState = {
    center: [latitude, longitude],
    zoom: 10,
  };

  const [ymaps, setYmaps] = useState<any>(null);
  const routes = useRef();
  const mapRef = useRef<any>(null);

  const getRoute = (ref: any): void => {
    if (ymaps) {
      const multiRoute = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [[latitude, longitude], 'Полоцк, ул. Хруцкого, 20a'],
          params: {
            routingMode: 'driving',
            results: 2,
          },
        },
        {
          boundsAutoApply: true,
          routeActiveStrokeWidth: 6,
          routeActiveStrokeColor: '#fa6600',
        },
      );

      routes.current = multiRoute;
      ref.geoObjects.add(multiRoute);
    }
  };

  if (mapRef.current) {
    console.log(mapRef.current.getZoom());
  }

  return (
    <YMaps query={{ apikey: '2afc7644-e4f8-46c0-8696-4e7c340d5904' }}>
      <Map
        width="1200px"
        height="80%"
        modules={['multiRouter.MultiRoute', 'coordSystem.geo', 'geocode', 'util.bounds']}
        onLoad={ymaps => {
          setYmaps(ymaps);
        }}
        state={mapState}
        instanceRef={ref => ref && getRoute(ref)}
      />
    </YMaps>
  );
};
