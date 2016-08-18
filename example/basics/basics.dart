import 'package:chronosgl/chronosgl.dart';
import 'package:chronosgl/chronosutil.dart';
import 'dart:html' as HTML;

import 'package:vector_math/vector_math.dart' as VM;

void main() {
  StatsFps fps =
      new StatsFps(HTML.document.getElementById("stats"), "blue", "gray");
  ChronosGL chronosGL = new ChronosGL('#webgl-canvas',
      useFramebuffer: false, fxShader: createBlurShader2());

  Camera camera = chronosGL.getCamera();
  OrbitCamera orbit = new OrbitCamera(camera, 25.0, 10.0);

  //TextureWrapper red = new TextureWrapper.SolidColor("red", "rgba(255,0,0,1)");
  Texture gradient = new ImageTexture("../gradient.jpg");
  Texture trans = new ImageTexture("../transparent.png");
  Texture wood = new ImageTexture("../wood.jpg");

  //ShaderProgram perlinNoise = chronosGL.createProgram(createPerlinNoiseColorShader(), true);
  ShaderProgram programBasic = chronosGL.createProgram(createTexturedShader());

  final Material matWood = new Material()
    ..SetUniform(uTextureSampler, wood)
    ..SetUniform(uColor, new VM.Vector3(1.0, 0.9, 0.0));

  final Material matGradient = new Material()
    ..SetUniform(uColor, new VM.Vector3(1.0, 0.0, 0.0))
    ..SetUniform(uTextureSampler, gradient);

  final Material matTrans = new Material()
    ..SetUniform(uTextureSampler, trans)
    ..blend = true;

  {
    Mesh ico = new Mesh(Shapes.Icosahedron(3), matWood)..setPos(0.0, 0.0, 0.0);
    programBasic.add(ico);
  }
  {
    Mesh cube = new Mesh(Shapes.Cube(), matGradient)
      ..setPos(-5.0, 0.0, -5.0)
      ..name = "cube";
    programBasic.add(cube);
  }

  {
    Mesh cyl = new Mesh(Shapes.Cylinder(3.0, 6.0, 2.0, 32), matTrans)
      ..setPos(5.0, 0.0, -5.0);
    programBasic.add(cyl);
  }
  {
    Mesh quad = new Mesh(Shapes.Quad(2), matTrans)
      //quad.blend_dFactor = chronosGL.blendConstants.ONE_MINUS_SRC_ALPHA;
      ..setPos(-5.0, 0.0, 5.0)
      ..name = "quad";
    programBasic.add(quad);
  }
  {
    Mesh torus = new Mesh(Shapes.TorusKnot(radius: 1.0, tube: 0.4), matGradient)
      ..setPos(5.0, 0.0, 5.0);
    programBasic.add(torus);
  }

  ShaderProgram programSprites =
      chronosGL.createProgram(createPointSpritesShader());
  programSprites.add(Utils.MakeParticles(2000));

  double _lastTimeMs = 0.0;
  void animate(timeMs) {
    double elapsed = timeMs - _lastTimeMs;
    _lastTimeMs = timeMs;
    orbit.azimuth += 0.001;
    orbit.animate(elapsed);
    fps.UpdateFrameCount(timeMs);
    chronosGL.draw();
    HTML.window.animationFrame.then(animate);
  }

  Texture.loadAndInstallAllTextures(chronosGL.gl).then((dummy) {
    animate(0.0);
  });
}
