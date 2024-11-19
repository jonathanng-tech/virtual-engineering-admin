import EventEmitter from 'eventemitter3';

export const emitter = new EventEmitter();

export const THREE_EVENTS = {
  addRoot: 'addRoot',
  addLeft: 'addLeft',
  addRight: 'addRight',
  addLeftFront: 'addLeftFront',
  addRightFront: 'addRightFront',
  addTop: 'addTop',
  replaceModule: 'replaceModule',
  zoom: 'zoom',
  refresh: 'refresh',
  rollBack: 'rollBack',
  onModelDidLoad: 'onModelDidLoad',
  onModelClicked: 'onModelClicked',
  onModelDidRemove: 'onModelDidRemove',
  changeMaterial: 'changeMaterial',
  fullScreen: 'fullScreen',
  hideContextMenu: 'hideContextMenu',
  screenShot: 'screenShot',
  change3DEnvironment: 'change3DEnvironment',
  removeAllModel: 'removeAllModel',
  frontView: 'frontView',
  animationAddRangeHood: 'animationAddRangeHood',
};
