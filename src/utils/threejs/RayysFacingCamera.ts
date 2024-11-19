import * as THREE from "three";
const padding = 0.5;
export default class RayysFacingCamera {
  camera: any;
  dirVector: THREE.Vector3;
  dirs: THREE.Vector3[];
  facingDirs: number[];
  bestFacingDir: number | undefined;
  forceFacingChanged: boolean;
  pause: boolean;
  cb: { facingDirChange: Function[] };

  constructor(camera: any) {
    // camera looking direction will be saved here
    this.dirVector = new THREE.Vector3();
    this.camera = camera;
    // all world directions
    this.dirs = [
      new THREE.Vector3(+padding, 0, 0),
      new THREE.Vector3(-padding, 0, 0),
      new THREE.Vector3(0, +padding, 0),
      new THREE.Vector3(0, -padding, 0),
      new THREE.Vector3(0, 0, +padding),
      new THREE.Vector3(0, 0, -padding),
    ];

    // index of best facing direction will be saved here
    this.facingDirs = [];
    this.bestFacingDir = undefined;
    this.forceFacingChanged = false;
    this.pause = false;

    // TODO: add other facing directions too

    // event listeners are collected here
    this.cb = {
      facingDirChange: [],
    };
  }
  getWorldDirection(target: THREE.Vector3) {
    this.camera.matrixWorldNeedsUpdate = true;
    const e = this.camera.matrixWorld.elements;
    return target.set(-e[8], -e[9], -e[10]).normalize();
  }
  check(camera: any) {
    if (this.pause) {
      return;
    }
    this.getWorldDirection(this.dirVector);
    this.dirVector.negate();

    var maxk = 0;
    var maxdot = -1e19;

    var oldFacingDirs = this.facingDirs;
    var facingDirsChanged = this.forceFacingChanged || false;
    this.facingDirs = [];

    for (var k = 0; k < this.dirs.length; k++) {
      var dot = this.dirs[k].dot(this.dirVector);
      var angle = Math.acos(dot);
      if (angle > -Math.PI / 2 && angle < Math.PI / 2) {
        this.facingDirs.push(k);
        if (oldFacingDirs.indexOf(k) === -1) {
          facingDirsChanged = true;
        }
        if (Math.abs(dot) > maxdot) {
          maxdot = dot;
          maxk = k;
        }
      }
    }

    // and if facing direction changed, notify subscribers
    if (maxk !== this.bestFacingDir || facingDirsChanged) {
      var prevDir = this.bestFacingDir;
      this.bestFacingDir = maxk;
      this.forceFacingChanged = false;

      for (var i = 0; i < this.cb.facingDirChange.length; i++) {
        this.cb.facingDirChange[i](
          {
            before: { facing: oldFacingDirs, best: prevDir },
            current: { facing: this.facingDirs, best: this.bestFacingDir },
          },
          this,
        );
      }
    }
  }
}
