import { useState, useEffect } from 'react';

type GeolocationCoordinates = {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
};

type GeolocationPositionError = {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
};

type GeolocationPosition = {
  coords: GeolocationCoordinates;
  timestamp: number;
};

type PositionType = {
  latitude: number;
  longitude: number;
};

export const usePosition = (): any => {
  const [position, setPosition] = useState<PositionType>({} as PositionType);
  const [error, setError] = useState<string | null>(null);

  const onChange = ({ coords: { latitude, longitude } }: GeolocationPosition): void => {
    setPosition({ latitude, longitude });
  };

  const onError = (error: GeolocationPositionError): void => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Geolocation is not available');

      return;
    }
    geo.getCurrentPosition(onChange, onError, {
      enableHighAccuracy: true,
    });
    const watcher = geo.watchPosition(onChange, onError, { enableHighAccuracy: true });

    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, error, setPosition };
};
