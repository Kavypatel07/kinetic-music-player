import { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';

export function usePhysicsEngine(songs, containerRef) {
    const engineRef = useRef(null);
    const runnerRef = useRef(null);
    const worldRef = useRef(null);
    const bodiesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const frozenRef = useRef(false);
    const rafRef = useRef(null);

    const [bodyPositions, setBodyPositions] = useState([]);

    const CARD_W = 180;
    const CARD_H = 220;

    const initPhysics = useCallback(() => {
        if (!containerRef.current || !songs.length) return;

        const { width: W, height: H } = containerRef.current.getBoundingClientRect();

        // Create engine
        const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
        const world = engine.world;
        engineRef.current = engine;
        worldRef.current = world;

        // Boundary walls
        const thickness = 80;
        Matter.World.add(world, [
            Matter.Bodies.rectangle(W / 2, -thickness / 2, W + 200, thickness, { isStatic: true, friction: 0 }),
            Matter.Bodies.rectangle(W / 2, H + thickness / 2, W + 200, thickness, { isStatic: true, friction: 0 }),
            Matter.Bodies.rectangle(-thickness / 2, H / 2, thickness, H + 200, { isStatic: true, friction: 0 }),
            Matter.Bodies.rectangle(W + thickness / 2, H / 2, thickness, H + 200, { isStatic: true, friction: 0 }),
        ]);

        // Create song poster bodies - spread evenly across full container
        const n = songs.length;
        const bodies = songs.map((song, i) => {
            // Distribute evenly in a grid, centered in the available space
            const cols = Math.ceil(Math.sqrt(n));
            const rows = Math.ceil(n / cols);
            const col = i % cols;
            const row = Math.floor(i / cols);
            const padX = Math.max(100, (W - cols * (CARD_W + 40)) / 2);
            const padY = Math.max(80, (H - rows * (CARD_H + 40)) / 2);
            const x = padX + col * (CARD_W + 60) + CARD_W / 2 + (Math.random() - 0.5) * 50;
            const y = padY + row * (CARD_H + 50) + CARD_H / 2 + (Math.random() - 0.5) * 50;

            const body = Matter.Bodies.rectangle(
                Math.max(CARD_W / 2 + 20, Math.min(W - CARD_W / 2 - 20, x)),
                Math.max(CARD_H / 2 + 80, Math.min(H - CARD_H / 2 - 20, y)),
                CARD_W, CARD_H, {
                restitution: 0.65,
                friction: 0.01,
                frictionAir: 0.022,
                angle: (Math.random() - 0.5) * 0.35,
                label: song.id,
            });

            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 3,
                y: (Math.random() - 0.5) * 3,
            });

            return body;
        });

        bodiesRef.current = bodies;
        Matter.World.add(world, bodies);

        // Start runner
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);
        runnerRef.current = runner;

        // Animation loop to sync positions to React state
        const tick = () => {
            if (!frozenRef.current) {
                // Mouse attraction force
                const mx = mouseRef.current.x;
                const my = mouseRef.current.y;

                bodies.forEach(body => {
                    const dx = mx - body.position.x;
                    const dy = my - body.position.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 350 && dist > 1) {
                        const strength = 0.00012 * (1 - dist / 350);
                        Matter.Body.applyForce(body, body.position, {
                            x: dx * strength,
                            y: dy * strength,
                        });
                    }
                });

                setBodyPositions(bodies.map(b => ({
                    id: b.label,
                    x: b.position.x - CARD_W / 2,
                    y: b.position.y - CARD_H / 2,
                    angle: b.angle,
                })));
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            Matter.Runner.stop(runner);
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
        };
    }, [songs]);

    useEffect(() => {
        const cleanup = initPhysics();
        return cleanup;
    }, [initPhysics]);

    const freeze = useCallback(() => {
        frozenRef.current = true;
        bodiesRef.current.forEach(b => {
            Matter.Body.setVelocity(b, { x: 0, y: 0 });
            Matter.Body.setAngularVelocity(b, 0);
        });
    }, []);

    const unfreeze = useCallback(() => {
        frozenRef.current = false;
    }, []);

    const setMousePos = useCallback((x, y) => {
        mouseRef.current = { x, y };
    }, []);

    return { bodyPositions, freeze, unfreeze, setMousePos };
}
