"use client";

import { useEffect, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import studentData from "../../data/student-locations.json";

type CityData = { city: string; lat: number; lng: number; count: number };

function aggregateCities(): CityData[] {
  const map = new Map<string, CityData>();
  for (const s of studentData) {
    const key = `${s.lat.toFixed(2)},${s.lng.toFixed(2)}`;
    const existing = map.get(key);
    if (existing) {
      existing.count++;
    } else {
      map.set(key, { city: s.city, lat: s.lat, lng: s.lng, count: 1 });
    }
  }
  return Array.from(map.values());
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

export function StudentMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry> | null>(null);
  const cities = aggregateCities();

  useEffect(() => {
    fetch("/world-110m.json")
      .then((r) => r.json())
      .then((topo: Topology) => {
        const countries = feature(
          topo,
          topo.objects.countries
        ) as FeatureCollection<Geometry>;
        setWorldData(countries);
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !worldData) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Get theme colors
    const styles = getComputedStyle(canvas);
    const borderColor = styles.getPropertyValue("--border-strong").trim() || "#C8C5BF";
    const accentHex = styles.getPropertyValue("--accent").trim() || "#3450DB";
    const [r, g, b] = hexToRgb(accentHex);

    // On mobile, zoom tighter on Italy so dots are readable
    const mobile = w < 500;
    const projection = geoNaturalEarth1()
      .center(mobile ? [12.5, 42.5] : [8, 42])
      .scale(mobile ? w * 3.5 : w * 1.6)
      .translate([w * 0.45, h / 2]);

    const path = geoPath(projection, ctx);

    // Draw countries — fill + stroke
    for (const feat of worldData.features) {
      ctx.beginPath();
      path(feat);
      ctx.fillStyle = "rgba(0,0,0,0.02)";
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw student dots
    for (const city of cities) {
      const coords = projection([city.lng, city.lat]);
      if (!coords) continue;
      const [x, y] = coords;
      const radius = Math.min(2.5 + city.count * 0.7, 6);

      // Glow
      ctx.beginPath();
      ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},0.12)`;
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
      ctx.fill();
    }

  }, [worldData, cities]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Trigger re-render by dispatching a custom event
        canvas.dispatchEvent(new Event("resize"));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full aspect-[2.4/1] max-sm:aspect-[1.4/1]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
      <div className="absolute bottom-2 left-0 flex items-center gap-3 font-mono text-[10px] text-text-dim tracking-[0.03em]">
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block bg-accent"
            style={{ opacity: 0.7 }}
          />
          {studentData.length} students across 3 editions
        </span>
      </div>
    </div>
  );
}
