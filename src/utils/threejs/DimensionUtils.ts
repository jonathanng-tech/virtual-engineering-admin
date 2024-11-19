import * as THREE from "three";

const padding = 0.5;
export default class DimensionUtils {
  static addDimension(
    mesh: any,
    scene: any,
    facingCamera: any,
    dim0: any,
    dim1: any,
    dim2: any,
    measure: any,
  ) {
    mesh.geometry.computeBoundingBox();

    facingCamera.cb.facingDirChange.push((event: any) => {
      let facingDir = facingCamera.dirs[event.current.best];

      if (dim0.node !== undefined) {
        dim0.detach();
      }
      if (dim1.node !== undefined) {
        dim1.detach();
      }
      if (dim2.node !== undefined) {
        dim2.detach();
      }

      var bbox = mesh.geometry.boundingBox;

      if (Math.abs(facingDir.x) === padding) {
        let from = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z);
        let to = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z);
        let newDimension = dim0.create(from, to, facingDir, measure.z);

        let from3 = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z);
        let to3 = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z);
        let newDimension3 = dim1.create(
          from3,
          to3,
          {
            x: 0,
            y: 0,
            z: facingDir.x > 0 ? -padding : padding,
          },
          measure.x,
        );
        scene.add(newDimension3);

        let newDimension2, from2, to2;
        if (facingDir.x > 0) {
          from2 = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z);
          to2 = new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.max.z);
          newDimension2 = dim2.create(
            from2,
            to2,
            {
              x: 0,
              y: 0,
              z: padding,
            },
            measure.y,
          );
        } else {
          from2 = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z);
          to2 = new THREE.Vector3(bbox.min.x, bbox.max.y, bbox.max.z);
          newDimension2 = dim2.create(
            from2,
            to2,
            {
              x: 0,
              y: 0,
              z: -padding,
            },
            measure.y,
          );
        }

        scene.add(newDimension);
        scene.add(newDimension2);
      }
      if (Math.abs(facingDir.z) === padding) {
        let from = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z);
        let to = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z);
        let newDimension = dim1.create(from, to, facingDir, measure.x);
        scene.add(newDimension);

        let from3 = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z);
        let to3 = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z);
        let newDimension3 = dim0.create(
          from3,
          to3,
          {
            x: facingDir.z < 0 ? -padding : padding,
            y: 0,
            z: 0,
          },
          measure.z,
        );
        scene.add(newDimension3);

        let newDimension2, from2, to2;
        if (facingDir.z > 0) {
          from2 = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.max.z);
          to2 = new THREE.Vector3(bbox.min.x, bbox.max.y, bbox.max.z);
          newDimension2 = dim2.create(
            from2,
            to2,
            {
              x: -padding,
              y: 0,
              z: 0,
            },
            measure.y,
          );
        } else {
          from2 = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.min.z);
          to2 = new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.min.z);
          newDimension2 = dim2.create(
            from2,
            to2,
            {
              x: padding,
              y: 0,
              z: 0,
            },
            measure.y,
          );
        }
        scene.add(newDimension2);
      }
      if (Math.abs(facingDir.y) === padding) {
        let newArray = event.current.facing.slice();
        let bestIdx = newArray.indexOf(event.current.best);
        newArray.splice(bestIdx, 1);

        let facingDir0 = facingCamera.dirs[newArray[0]];
        let facingDir1 = facingCamera.dirs[newArray[1]];
        let from = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z);
        let to = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z);

        let newDimension0 = dim0.create(from, to, facingDir0, measure.z);
        let newDimension1 = dim1.create(from, to, facingDir1, measure.x);

        let newDimension2, from2, to2;
        if (facingDir0.x > 0 && facingDir1.z > 0) {
          from2 = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.max.z);
          to2 = new THREE.Vector3(bbox.min.x, bbox.max.y, bbox.max.z);
          newDimension2 = dim2.create(
            from2,
            to2,
            {
              x: -padding,
              y: 0,
              z: 0,
            },
            measure.y,
          );
        } else if (facingDir0.x > 0 && facingDir1.z < 0) {
          from2 = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z);
          to2 = new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.max.z);
          newDimension2 = dim2.create(
            from2,
            to2,
            {
              x: 0,
              y: 0,
              z: padding,
            },
            measure.y,
          );
        } else if (facingDir0.x < 0 && facingDir1.z < 0) {
          from2 = new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.min.z);
          to2 = new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.min.z);
          newDimension2 = dim2.create(
            from2,
            to2,
            {
              x: padding,
              y: 0,
              z: 0,
            },
            measure.y,
          );
        } else {
          from2 = new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.min.z);
          to2 = new THREE.Vector3(bbox.min.x, bbox.max.y, bbox.min.z);
          newDimension2 = dim2.create(
            from2,
            to2,
            {
              x: 0,
              y: 0,
              z: -padding,
            },
            measure.y,
          );
        }

        scene.add(newDimension0);
        scene.add(newDimension1);
        scene.add(newDimension2);
      }
    });
    facingCamera.forceFacingChanged = true;
  }
}
