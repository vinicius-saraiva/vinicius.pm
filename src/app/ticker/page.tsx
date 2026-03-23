"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";

type ConnectionStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "reconnecting";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_TICKER_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_TICKER_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function generateRoomCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export default function TickerPage() {
  const [roomCode, setRoomCode] = useState("");
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [prevFlash, setPrevFlash] = useState(false);
  const [nextFlash, setNextFlash] = useState(false);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (connected) {
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setElapsedTime(0);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [connected]);

  const handleConnect = useCallback(async () => {
    if (!roomCode || roomCode.length !== 4) return;

    setStatus("connecting");

    const channel = getSupabase().channel(`room:${roomCode}`, {
      config: { broadcast: { self: false } },
    });

    channel
      .on("broadcast", { event: "slide-command" }, () => {})
      .subscribe((subscriptionStatus) => {
        if (subscriptionStatus === "SUBSCRIBED") {
          setStatus("connected");
          setConnected(true);
        } else if (subscriptionStatus === "CHANNEL_ERROR") {
          setStatus("reconnecting");
        } else if (subscriptionStatus === "CLOSED") {
          setStatus("disconnected");
          setConnected(false);
        }
      });

    channelRef.current = channel;
  }, [roomCode]);

  const handleDisconnect = useCallback(async () => {
    if (channelRef.current) {
      await getSupabase().removeChannel(channelRef.current);
      channelRef.current = null;
    }
    setConnected(false);
    setStatus("disconnected");
  }, []);

  const sendCommand = useCallback(
    async (action: "next" | "prev") => {
      if (!channelRef.current || status !== "connected") return;

      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(action === "next" ? 15 : 10);
      }

      if (action === "next") {
        setNextFlash(true);
        setTimeout(() => setNextFlash(false), 150);
      } else {
        setPrevFlash(true);
        setTimeout(() => setPrevFlash(false), 150);
      }

      await channelRef.current.send({
        type: "broadcast",
        event: "slide-command",
        payload: { action },
      });
    },
    [status]
  );

  useEffect(() => {
    return () => {
      if (channelRef.current) {
        getSupabase().removeChannel(channelRef.current);
      }
    };
  }, []);

  const statusColor =
    status === "connected"
      ? "bg-emerald-400"
      : status === "connecting" || status === "reconnecting"
        ? "bg-amber-400"
        : "bg-gray-500";

  const statusLabel =
    status === "connected"
      ? "Connected"
      : status === "connecting"
        ? "Connecting..."
        : status === "reconnecting"
          ? "Reconnecting..."
          : "Disconnected";

  if (connected) {
    return (
      <div className="flex h-full flex-col select-none">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-block h-2 w-2 rounded-full ${statusColor} ${
                status === "connected" ? "animate-pulse" : ""
              }`}
            />
            <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
              {statusLabel}
            </span>
          </div>
          <div className="font-mono text-sm font-medium tabular-nums text-gray-400">
            {formatTime(elapsedTime)}
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <span className="rounded-full bg-gray-800/60 px-4 py-1 text-xs font-medium tracking-widest text-gray-500">
            ROOM {roomCode}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-2">
          <button
            onPointerDown={() => sendCommand("prev")}
            className={`flex flex-[2] items-center justify-center rounded-2xl border border-gray-700/50 text-lg font-semibold tracking-wide text-gray-300 transition-all duration-100 active:scale-[0.98] ${
              prevFlash
                ? "bg-gray-600 border-gray-500"
                : "bg-gray-800/70 hover:bg-gray-700/70"
            }`}
            style={{ minHeight: 100 }}
          >
            <div className="flex flex-col items-center gap-1">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <span>PREV</span>
            </div>
          </button>

          <button
            onPointerDown={() => sendCommand("next")}
            className={`flex flex-[5] items-center justify-center rounded-2xl text-2xl font-bold tracking-wide text-white transition-all duration-100 active:scale-[0.98] ${
              nextFlash
                ? "bg-blue-400 shadow-lg shadow-blue-400/30"
                : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20"
            }`}
            style={{ minHeight: 200 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span>NEXT</span>
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </button>
        </div>

        <div className="flex justify-center px-4 pb-6">
          <button
            onClick={handleDisconnect}
            className="rounded-full border border-gray-700/50 px-6 py-2.5 text-xs font-medium tracking-wide text-gray-500 transition-colors hover:border-red-800 hover:text-red-400"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 select-none">
      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10">
            <svg
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Slide Remote
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter a room code to control your presentation
          </p>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="room-code"
            className="block text-xs font-medium tracking-wide text-gray-400 uppercase"
          >
            Room Code
          </label>
          <div className="flex gap-2">
            <input
              id="room-code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={roomCode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                setRoomCode(val);
              }}
              placeholder="0000"
              className="flex-1 rounded-xl border border-gray-700/50 bg-gray-900 px-4 py-3.5 text-center font-mono text-2xl font-bold tracking-[0.3em] text-white placeholder-gray-700 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
            />
            <button
              onClick={() => setRoomCode(generateRoomCode())}
              title="Generate random code"
              className="flex items-center justify-center rounded-xl border border-gray-700/50 bg-gray-900 px-3.5 text-gray-400 transition-colors hover:border-gray-600 hover:text-gray-300"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M16.023 9.348h4.992v-.001"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={handleConnect}
          disabled={roomCode.length !== 4 || status === "connecting"}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "connecting" ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Connecting...
            </span>
          ) : (
            "Connect"
          )}
        </button>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${statusColor}`}
          />
          <span className="text-xs text-gray-500">{statusLabel}</span>
        </div>
      </div>
    </div>
  );
}
