import 'package:chronosgl/chronosgl.dart';
import 'dart:html' as HTML;

void main() {
  HTML.CanvasElement canvas = HTML.document.querySelector('#webgl-canvas');
  ChronosGL chronosGL = new ChronosGL(canvas);
  OrbitCamera orbit = new OrbitCamera(15.0);
  Perspective perspective = new Perspective(orbit);

  Texture cubeTex = new CubeTexture("stars", "skybox_", ".png");

  RenderingPhase phase = new RenderingPhase("main", chronosGL.gl);
  ShaderProgram programCM = phase.createProgram(createCubeMapShader());
  Node sky = Utils.MakeSkycube(cubeTex);
  programCM.add(sky);

  Material mat = new Material("cubemap")
    ..SetUniform(uTextureCubeSampler, cubeTex);
  MeshData md = Shapes.Cube(x: 2.0, y: 2.0, z: 2.0);
  programCM.add(new Node("cube", md, mat));

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
    timeMs = 0.0 + timeMs;
    double elapsed = timeMs - _lastTimeMs;
    _lastTimeMs = timeMs;
    orbit.azimuth += 0.001;
    orbit.animate(elapsed);
    phase.draw([perspective]);

    HTML.window.animationFrame.then(animate);
  }

  Texture.loadAndInstallAllTextures(chronosGL.gl).then((dummy) {
    animate(0.0);
  });
}
