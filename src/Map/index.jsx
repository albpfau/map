import React, { useMemo, useState } from 'react';
import L from 'leaflet';
import cn from 'classnames';
import { TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import carsList from '../cars';
import 'leaflet/dist/leaflet.css';
import icon from './icon.webp';
import iconCar from './active-car.png';

export const Map = () => {
  const [activeCar, setActiveCar] = useState(null);
  const [inputText, setInputText] = useState('');
  const map = useMap();

  const carIcon = L.icon({
    iconUrl: icon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  const activeCarIcon = L.icon({
    iconUrl: iconCar,
    iconSize: [48, 48],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  const carsUlList = useMemo(() => {
    const showCar = (car) => {
      map.setView(L.latLng(car.latitude, car.longitude), 12);
    };

    const findText = (text) => {
      return text.toLowerCase().includes(inputText.toLowerCase());
    };

    return (
      <ul>
        {carsList
          ?.filter((car) => findText(car.name))
          .map((car) => (
            <li
              key={car.id}
              onClick={(e) => {
                showCar(car);
                setActiveCar(car.id);
              }}
              className={cn({ active: car.id === activeCar })}
            >
              {car.name}
            </li>
          ))}
      </ul>
    );
  }, [activeCar, inputText, map]);

  const carsMarkers = useMemo(() => {
    return (
      <>
        {carsList?.map((car) => (
          <Marker
            key={car.id}
            position={[car.latitude, car.longitude]}
            icon={car.id === activeCar ? activeCarIcon : carIcon}
            eventHandlers={{
              click: () => setActiveCar(car.id),
            }}
          >
            <Popup>{car.name}</Popup>
          </Marker>
        ))}
      </>
    );
  }, [activeCar, activeCarIcon, carIcon]);

  return (
    <div className="mapWrapper">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {carsMarkers}

      <div className="carsBlock">
        <input
          type="text"
          placeholder="Поиск..."
          value={inputText}
          onInput={(e) => setInputText(e.target.value)}
        />
        {carsUlList}
      </div>
    </div>
  );
};
