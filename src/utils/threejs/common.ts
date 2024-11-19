import * as THREE from "three";
import { ConvexHull } from "three/examples/jsm/math/ConvexHull";

export const toScreenPosition = (
  obj: { position: THREE.Vector3Like },
  renderer: { domElement: { width: number; height: number } },
  camera: THREE.Camera,
) => {
  var position = new THREE.Vector3();
  position.copy(obj.position);
  // // TODO: need to update this when resize window
  // var widthHalf = 0.5*renderer.domElement.width;
  // var heightHalf = 0.5*renderer.domElement.height;
  //
  // obj.updateMatrixWorld();
  // vector.setFromMatrixPosition(obj.matrixWorld);
  // vector.project(camera);
  var vector = position.project(camera);

  vector.x = ((vector.x + 1) / 2) * renderer.domElement.width;
  vector.y = (-(vector.y - 1) / 2) * renderer.domElement.height;

  return {
    x: vector.x,
    y: vector.y,
  };
};
export const getConvexHullGeometry = (
  model: THREE.Object3D<THREE.Object3DEventMap>,
) => {
  const hull = new ConvexHull().setFromObject(model);
  const faces = hull.faces;
  const vertices = [];
  const indices = [];
  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    const edge = face.edge;
    vertices.push(
      edge.vertex.point.x,
      edge.vertex.point.y,
      edge.vertex.point.z,
    );
    vertices.push(
      edge.next.vertex.point.x,
      edge.next.vertex.point.y,
      edge.next.vertex.point.z,
    );
    vertices.push(
      edge.prev.vertex.point.x,
      edge.prev.vertex.point.y,
      edge.prev.vertex.point.z,
    );
    const v1 = i * 3;
    const v2 = i * 3 + 1;
    const v3 = i * 3 + 2;
    indices.push(v1, v2, v3);
  }
  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  geometry.setIndex(indices);
  const uvArray: any = [];
  for (let i = 0; i < geometry.attributes.position.count; i++) {
    const uv = new THREE.Vector2(Math.random(), Math.random());
    uvArray.push(uv);
  }
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvArray, 2));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
};
