"use client";

import { useEffect, useRef } from "react";

interface BackgroundRandomWalkerProps {
  gap?: number;
  color?: string;
  destructiveColor?: string;
  trailLength?: number;
  speed?: number;
  opacity?: number;
  walkerCount?: number;
}

interface Point {
  x: number;
  y: number;
}

interface TrailPoint extends Point {
  timestamp: number;
  opacity: number;
}

interface Walker {
  id: number;
  currentPos: Point;
  targetPos: Point;
  trail: TrailPoint[];
  lastUpdate: number;
  isDestructive: boolean;
  speed: number;
}

export function BackgroundRandomWalker({
  gap = 50,
  color = "#9AFF8D",
  destructiveColor = "#FF6B6B",
  trailLength = 20,
  speed = 1200,
  opacity = 0.15,
  walkerCount = 10,
}: BackgroundRandomWalkerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const walkersRef = useRef<Walker[]>([]);
  const animationRef = useRef<number>();
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initializeWalkers = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);

      walkersRef.current = Array.from({ length: walkerCount }, (_, i) => {
        const randomCol = Math.floor(Math.random() * cols);
        const randomRow = Math.floor(Math.random() * rows);
        const pos = { x: randomCol * gap, y: randomRow * gap };

        // Random speed between 800ms and 2000ms
        const randomSpeed = 800 + Math.random() * 1200;

        return {
          id: i,
          currentPos: { ...pos },
          targetPos: { ...pos },
          trail: [],
          lastUpdate: 0,
          isDestructive: false,
          speed: randomSpeed,
        };
      });
    };

    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
      dimensionsRef.current = { width, height };

      if (walkersRef.current.length === 0) {
        initializeWalkers();
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getRandomAdjacentDot = (current: Point): Point => {
      const { width, height } = dimensionsRef.current;
      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);

      const currentCol = Math.round(current.x / gap);
      const currentRow = Math.round(current.y / gap);

      // Possible moves: up, down, left, right, and diagonals
      const moves = [
        { dx: -1, dy: 0 }, // left
        { dx: 1, dy: 0 }, // right
        { dx: 0, dy: -1 }, // up
        { dx: 0, dy: 1 }, // down
        { dx: -1, dy: -1 }, // up-left
        { dx: 1, dy: -1 }, // up-right
        { dx: -1, dy: 1 }, // down-left
        { dx: 1, dy: 1 }, // down-right
      ];

      // Filter valid moves
      const validMoves = moves.filter((move) => {
        const newCol = currentCol + move.dx;
        const newRow = currentRow + move.dy;
        return newCol >= 0 && newCol < cols && newRow >= 0 && newRow < rows;
      });

      if (validMoves.length === 0) return current;

      // Pick a random valid move
      const randomMove =
        validMoves[Math.floor(Math.random() * validMoves.length)];
      const newCol = currentCol + randomMove.dx;
      const newRow = currentRow + randomMove.dy;

      return {
        x: newCol * gap,
        y: newRow * gap,
      };
    };

    const lerp = (start: number, end: number, t: number) => {
      return start + (end - start) * t;
    };

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (timestamp: number) => {
      const { width, height } = dimensionsRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const now = timestamp;

      // Check for collisions and update walker states
      const positionMap = new Map<string, number[]>();

      walkersRef.current.forEach((walker) => {
        const gridX = Math.round(walker.currentPos.x / gap);
        const gridY = Math.round(walker.currentPos.y / gap);
        const key = `${gridX},${gridY}`;

        if (!positionMap.has(key)) {
          positionMap.set(key, []);
        }
        positionMap.get(key)!.push(walker.id);
      });

      // Update destructive status based on collisions
      walkersRef.current.forEach((walker) => {
        const gridX = Math.round(walker.currentPos.x / gap);
        const gridY = Math.round(walker.currentPos.y / gap);
        const key = `${gridX},${gridY}`;
        const walkersAtPosition = positionMap.get(key) || [];

        walker.isDestructive = walkersAtPosition.length > 1;
      });

      // Update and draw each walker
      walkersRef.current.forEach((walker) => {
        if (!walker.lastUpdate) {
          walker.lastUpdate = timestamp;
        }

        const elapsed = timestamp - walker.lastUpdate;
        const progress = Math.min(elapsed / walker.speed, 1);
        const easedProgress = easeInOutCubic(progress);

        // Interpolate position
        walker.currentPos = {
          x: lerp(walker.currentPos.x, walker.targetPos.x, easedProgress),
          y: lerp(walker.currentPos.y, walker.targetPos.y, easedProgress),
        };

        // Add current position to trail
        walker.trail.push({
          x: walker.currentPos.x,
          y: walker.currentPos.y,
          timestamp: now,
          opacity: 1,
        });

        // Update trail opacities and remove old points
        const maxAge = walker.speed * 4;
        walker.trail = walker.trail
          .map((point) => {
            const age = now - point.timestamp;
            const pointOpacity = Math.max(0, 1 - age / maxAge);
            return { ...point, opacity: pointOpacity };
          })
          .filter((point) => point.opacity > 0)
          .slice(-trailLength);

        // Choose color based on destructive state
        const walkerColor = walker.isDestructive ? destructiveColor : color;

        // Apply 50% transparency to the entire walker
        const walkerTransparency = 0.5;

        // Draw trail
        if (walker.trail.length > 1) {
          for (let i = 1; i < walker.trail.length; i++) {
            const prev = walker.trail[i - 1];
            const curr = walker.trail[i];

            const avgOpacity = (prev.opacity + curr.opacity) / 2;
            const finalOpacity = avgOpacity * opacity * walkerTransparency;

            ctx.strokeStyle = `${walkerColor}${Math.round(finalOpacity * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }
        }

        // Draw glow at current position (more subtle)
        const glowSize = 8;
        const gradient = ctx.createRadialGradient(
          walker.currentPos.x,
          walker.currentPos.y,
          0,
          walker.currentPos.x,
          walker.currentPos.y,
          glowSize
        );

        const glowOpacity = Math.round(opacity * 255 * 0.8 * walkerTransparency)
          .toString(16)
          .padStart(2, "0");
        gradient.addColorStop(0, `${walkerColor}${glowOpacity}`);
        gradient.addColorStop(
          0.5,
          `${walkerColor}${Math.round(parseInt(glowOpacity, 16) * 0.4)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(1, `${walkerColor}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          walker.currentPos.x,
          walker.currentPos.y,
          glowSize,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Check if walker has reached target
        if (progress >= 1) {
          walker.targetPos = getRandomAdjacentDot(walker.targetPos);
          walker.lastUpdate = timestamp;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gap, color, destructiveColor, trailLength, speed, opacity, walkerCount]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  );
}
