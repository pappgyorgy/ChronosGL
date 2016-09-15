import 'package:chronosgl/chronosgl.dart';
import 'package:vector_math/vector_math.dart' as VM;
import 'dart:html' as HTML;

void main() {
  HTML.CanvasElement canvas = HTML.document.querySelector('#webgl-canvas');
  ChronosGL chronosGL = new ChronosGL(canvas);
  OrbitCamera orbit = new OrbitCamera(165.0);
  Perspective perspective = new Perspective(orbit);
  RenderingPhase phase = new RenderingPhase("main", chronosGL.gl);
  ShaderProgram programBasic = phase.createProgram(createTexturedShader());

  Texture blockTex = new ImageTexture("../gradient.jpg");

  ShaderProgram perlinNoise =
      phase.createProgram(createPerlinNoiseColorShader(false));

  Material mat = new Material("torus")
    ..SetUniform(uTextureSampler, blockTex)
    ..SetUniform(uColor, new VM.Vector3.zero());
  Node m1 = new Node("torus1", Shapes.TorusKnot(), mat)
    ..setPos(-50.0, 0.0, 0.0);
  programBasic.add(m1);

  Material matDummy = new Material("mat");
  Node m2 = new Node("torus2", Shapes.TorusKnot(), matDummy)
    ..setPos(50.0, 0.0, 0.0);
  perlinNoise.add(m2);

  ShaderProgram programSprites =
      phase.createProgram(createPointSpritesShader());
  programSprites.add(Utils.MakeParticles(2000));

  void resolutionChange(HTML.Event ev) {
    int w = canvas.clientWidth;
    int h = canvas.clientHeight;
    canvas.width = w;
    canvas.height = h;
    print("size change $w $h");
    perspective.AdjustAspect(w, h);
    phase.viewPortW = w;
    phase.viewPortH = h;
  }

  resolutionChange(null);
  HTML.window.onResize.listen(resolutionChange);

  double _lastTimeMs = 0.0;
  void animate(timeMs) {
    timeMs = timeMs + 0.0;
    double elapsed = timeMs - _lastTimeMs;
    _lastTimeMs = timeMs;
    orbit.azimuth += 0.001;
    orbit.animate(elapsed);
    perlinNoise.SetUniform(uTime, timeMs / 1000.0);
    phase.draw([perspective]);
    HTML.window.animationFrame.then(animate);
  }

  Texture.loadAndInstallAllTextures(chronosGL.gl).then((dummy) {
    animate(0.0);
  });
}
