const defaults = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 3.5,
  VELOCITY_DISSIPATION: 2,
  PRESSURE: 0.1,
  PRESSURE_ITERATIONS: 20,
  CURL: 3,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLOR_UPDATE_SPEED: 10,
  BACK_COLOR: { r: 0.5, g: 0, b: 0 },
  TRANSPARENT: true,
  RAINBOW_MODE: true,
  COLOR: '#ff0000'
};

export async function mountSplashCursor(canvas, overrides = {}) {
  const response = await fetch('/assets/vendor/SplashCursor.jsx');
  if (!response.ok) throw new Error('Unable to load SplashCursor source');
  const source = await response.text();
  const startMarker = 'useEffect(() => {';
  const endMarker = '// eslint-disable-next-line react-hooks/exhaustive-deps';
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error('Unexpected SplashCursor source format');

  const body = source
    .slice(start + startMarker.length, end)
    .replace('const canvas = canvasRef.current;', '')
    .replaceAll('animationFrameId.current', 'animationFrameId');
  const settings = { ...defaults, ...overrides };
  const names = Object.keys(defaults);
  const values = names.map(name => settings[name]);
  const factory = new Function('canvas', ...names, `let animationFrameId = null;${body}`);
  return factory(canvas, ...values);
}
