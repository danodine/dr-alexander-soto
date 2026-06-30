"use client";

import { useMemo, useRef, useState } from "react";

const TILE_SIZE = 256;
const DEFAULT_ZOOM = 16;
const MIN_ZOOM = 14;
const MAX_ZOOM = 18;
const MAP_TILES_RADIUS = 2;
const DEFAULT_CENTER = {
  lat: -0.1834646,
  lon: -78.5026448,
};
const DEFAULT_LOCATIONS = [
  {
    id: "ceo",
    name: "CEO Ecuador",
    address:
      "Edificio CITIMED, Av. Mariana de Jesús OE7-02 y Nuño de Valderrama P.B.",
    ...DEFAULT_CENTER,
  },
];

function lonToTileX(lon, zoom) {
  return ((lon + 180) / 360) * 2 ** zoom;
}

function latToTileY(lat, zoom) {
  const latRad = (lat * Math.PI) / 180;
  return (
    ((1 -
      Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) /
      2) *
    2 ** zoom
  );
}

export default function ContactMap({
  locations = DEFAULT_LOCATIONS,
  defaultLocationId = "ceo",
}) {
  const mapRef = useRef(null);
  const dragRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [activeLocationId, setActiveLocationId] = useState(defaultLocationId);
  const activeLocation =
    locations.find((location) => location.id === activeLocationId) ??
    locations[0] ??
    DEFAULT_LOCATIONS[0];

  const mapState = useMemo(() => {
    const clinicPixel = {
      x: lonToTileX(activeLocation.lon, zoom) * TILE_SIZE,
      y: latToTileY(activeLocation.lat, zoom) * TILE_SIZE,
    };
    const viewportCenterPixel = {
      x: clinicPixel.x - pan.x,
      y: clinicPixel.y - pan.y,
    };
    const centerTile = {
      x: Math.floor(viewportCenterPixel.x / TILE_SIZE),
      y: Math.floor(viewportCenterPixel.y / TILE_SIZE),
    };
    const tiles = [];

    for (
      let row = centerTile.y - MAP_TILES_RADIUS;
      row <= centerTile.y + MAP_TILES_RADIUS;
      row += 1
    ) {
      for (
        let col = centerTile.x - MAP_TILES_RADIUS;
        col <= centerTile.x + MAP_TILES_RADIUS;
        col += 1
      ) {
        tiles.push({
          key: `${col}-${row}`,
          src: `https://tile.openstreetmap.org/${zoom}/${col}/${row}.png`,
          left: col * TILE_SIZE - viewportCenterPixel.x,
          top: row * TILE_SIZE - viewportCenterPixel.y,
        });
      }
    }

    const marker = {
      x: clinicPixel.x - viewportCenterPixel.x,
      y: clinicPixel.y - viewportCenterPixel.y,
    };

    return { marker, tiles };
  }, [activeLocation, pan, zoom]);

  const stopControlDrag = (event) => {
    event.stopPropagation();
  };

  const recenterMap = () => {
    dragRef.current = null;
    setPan({ x: 0, y: 0 });
  };

  const updateZoom = (nextZoom) => {
    dragRef.current = null;
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom)));
    setPan({ x: 0, y: 0 });
  };

  const selectLocation = (locationId) => {
    dragRef.current = null;
    setActiveLocationId(locationId);
    setZoom(DEFAULT_ZOOM);
    setPan({ x: 0, y: 0 });
  };

  const startDrag = (id, clientX, clientY) => {
    dragRef.current = {
      pointerId: id,
      startX: clientX,
      startY: clientY,
      startPan: pan,
    };
  };

  const updateDrag = (id, clientX, clientY) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== id) return;

    setPan({
      x: drag.startPan.x + clientX - drag.startX,
      y: drag.startPan.y + clientY - drag.startY,
    });
  };

  const stopDrag = (id) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== id) return;
    dragRef.current = null;
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    startDrag(event.pointerId, event.clientX, event.clientY);
  };

  const handlePointerMove = (event) => {
    updateDrag(event.pointerId, event.clientX, event.clientY);
  };

  const endDrag = (event) => {
    stopDrag(event.pointerId);
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0 || dragRef.current) return;
    startDrag("mouse", event.clientX, event.clientY);
  };

  const handleMouseMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId === "touch") return;
    updateDrag(drag.pointerId, event.clientX, event.clientY);
  };

  const endMouseDrag = () => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId === "touch") return;
    stopDrag(drag.pointerId);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch || dragRef.current) return;
    startDrag("touch", touch.clientX, touch.clientY);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    updateDrag("touch", touch.clientX, touch.clientY);
  };

  const endTouchDrag = () => {
    stopDrag("touch");
  };

  return (
    <div
      ref={mapRef}
      className="contact-interactive-map"
      role="application"
      aria-label="Mapa interactivo de la ubicación del consultorio del Dr. Alexander Soto en Quito"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={endMouseDrag}
      onMouseLeave={endMouseDrag}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={endTouchDrag}
      onTouchCancel={endTouchDrag}
    >
      <div
        className="contact-map-location-selector"
        onPointerDown={stopControlDrag}
        onMouseDown={stopControlDrag}
        onTouchStart={stopControlDrag}
      >
        {locations.map((location) => (
          <button
            key={location.id}
            type="button"
            className={location.id === activeLocation.id ? "is-active" : ""}
            aria-pressed={location.id === activeLocation.id}
            onClick={() => selectLocation(location.id)}
          >
            {location.name}
          </button>
        ))}
      </div>
      <div className="contact-interactive-map-tiles" aria-hidden="true">
        {mapState.tiles.map((tile) => (
          // Map tiles should load directly from the free tile server.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={tile.key}
            src={tile.src}
            alt=""
            draggable="false"
            referrerPolicy="no-referrer"
            style={{
              transform: `translate(${tile.left}px, ${tile.top}px)`,
            }}
          />
        ))}
      </div>
      <div
        className="contact-map-pin"
        style={{
          left: `calc(50% + ${mapState.marker.x}px)`,
          top: `calc(50% + ${mapState.marker.y}px)`,
        }}
        aria-hidden="true"
      >
        <span />
      </div>
      <div className="contact-map-attribution">
        © OpenStreetMap contributors
      </div>
      <div className="contact-map-location-label">
        <strong>{activeLocation.name}</strong>
        <span>{activeLocation.address}</span>
      </div>
      <button
        type="button"
        className="contact-map-recenter"
        onPointerDown={stopControlDrag}
        onMouseDown={stopControlDrag}
        onTouchStart={stopControlDrag}
        onClick={recenterMap}
      >
        Centrar clinica
      </button>
      <div
        className="contact-map-zoom-controls"
        onPointerDown={stopControlDrag}
        onMouseDown={stopControlDrag}
        onTouchStart={stopControlDrag}
      >
        <button
          type="button"
          aria-label="Acercar mapa"
          onClick={() => updateZoom(zoom + 1)}
          disabled={zoom >= MAX_ZOOM}
        >
          +
        </button>
        <button
          type="button"
          aria-label="Alejar mapa"
          onClick={() => updateZoom(zoom - 1)}
          disabled={zoom <= MIN_ZOOM}
        >
          -
        </button>
      </div>
    </div>
  );
}
