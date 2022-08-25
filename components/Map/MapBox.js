import * as React from 'react';
import { useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './Pin';

const MapBox = ({ defaultLat, defaultLng, onDrag, displayType, displayMarker, isDraggable, onZoom, radius }) => {

  const [marker, setMarker] = useState(null);

  useEffect(() => {

    if (marker == null) {
      setMarker({
        lat: defaultLat,
        lng: defaultLng
      })
    }

  }, [defaultLat, defaultLng])

  const geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Point', coordinates: [marker ? marker.lng : defaultLng, marker ? marker.lat : defaultLat] } }
    ]
  };


  let layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 100,  //radius in pixel
      'circle-color': '#007cbf',
      'circle-opacity': 0.3
    }
  }

  return (
    <>
      <Map
        initialViewState={{
          longitude: defaultLng,
          latitude: defaultLat,
          zoom: 10
        }}
        style={{
          width: '90%',
          height: '400px',
          margin: '10px auto',
          borderRadius: '10px'
        }}
        scrollZoom={displayType == 'block' ? true : false}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoidGFuemltYXphZCIsImEiOiJjbDZ4eDN1NnIwMHV5M2NvMTdvZWVzc2txIn0.mEyo9nBDPWk1noTinwQbDg"

        onZoomEnd={(evt) => {
          onZoom(evt.viewState.zoom)
        }
        }
      >

        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>


        <Marker
          longitude={marker ? marker.lng : defaultLng}
          latitude={marker ? marker.lat : defaultLat}
          draggable={isDraggable}
          anchor="bottom"
          onDragEnd={(evt) => {

            setMarker({
              lat: evt.lngLat.lat,
              lng: evt.lngLat.lng
            })
            onDrag(evt.lngLat.lat, evt.lngLat.lng)
          }}
        >

          {/* <img src={markerImg} className="map-marker-style" 
            style={{
              display: `${displayMarker}`
            }} 
          /> */}

          <Pin size={25} displayMarker={displayMarker} />

        </Marker>

      </Map>
    </>
  )
}

export default MapBox;