<script setup lang="ts">
import {onMounted} from 'vue'
import * as PIXI from 'pixi.js'
import {Spine} from '@pixi/spine-pixi';

const app: any = ref(null)

class SpineBoy {
  view: PIXI.Container<PIXI.ContainerChild>;
  spine: Spine;

  constructor() {
    this.view = new PIXI.Container();

    this.spine = Spine.from({
      skeleton: 'spineSkeleton',
      atlas: 'spineAtlas',
    });

    this.view.addChild(this.spine);
  }
}

const keyMap = {
  Space: 'space',
  KeyW: 'up',
  ArrowUp: 'up',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyD: 'right',
  ArrowRight: 'right',
};

class Controller {
  constructor() {
    // The controller's state.
    this.keys = {
      up: {pressed: false, doubleTap: false, timestamp: 0},
      left: {pressed: false, doubleTap: false, timestamp: 0},
      down: {pressed: false, doubleTap: false, timestamp: 0},
      right: {pressed: false, doubleTap: false, timestamp: 0},
      space: {pressed: false, doubleTap: false, timestamp: 0},
    };

    // Register event listeners for keydown and keyup events.
    window.addEventListener('keydown', (event) => this.keydownHandler(event));
    window.addEventListener('keyup', (event) => this.keyupHandler(event));
  }

  keydownHandler(event: KeyboardEvent) {
    const key = keyMap[event.code];
    if (!key) return;
    const now = Date.now();
    // If not already in the double-tap state, toggle the double tap state if the key was pressed twice within 300ms.
    this.keys[key].doubleTap = this.keys[key].doubleTap || now - this.keys[key].timestamp < 300;
    // Toggle on the key pressed state.
    this.keys[key].pressed = true;
  }

  keyupHandler(event: KeyboardEvent) {
    const key = keyMap[event.code];

    if (!key) return;

    const now = Date.now();

    // Reset the key pressed state.
    this.keys[key].pressed = false;

    // Reset double tap only if the key is in the double-tap state.
    if (this.keys[key].doubleTap) this.keys[key].doubleTap = false;
    // Otherwise, update the timestamp to track the time difference till the next potential key down.
    else this.keys[key].timestamp = now;
  }
}

let spineBoy: SpineBoy | null = null;
let controller: Controller | null = null;

onMounted(async () => {

  await initPIXI();

  await loadAssets();

  await initCharacter();

  await initController();
})

const initPIXI = async () => {
  app.value = new PIXI.Application()
  await app.value.init({background: '#1099bb', resizeTo: window});
  document.body.appendChild(app.value.canvas);
}

const loadAssets = async () => {
  await PIXI.Assets.load([
    {
      alias: 'spineSkeleton',
      src: 'https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pro.skel',
    },
    {
      alias: 'spineAtlas',
      src: 'https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pma.atlas',
    },
    {
      alias: 'sky',
      src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/sky.png',
    },
    {
      alias: 'background',
      src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/background.png',
    },
    {
      alias: 'midground',
      src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/midground.png',
    },
    {
      alias: 'platform',
      src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/platform.png',
    },
  ]);
}

const initCharacter = async () => {
  spineBoy = new SpineBoy;

  spineBoy.view.x = app.value.screen.width / 2;
  spineBoy.view.y = app.value.screen.height - 80;
  spineBoy.spine.scale.set(0.5);

  app.value.stage.addChild(spineBoy.view);
}

const initController = async () => {
  controller = new Controller();
  let currentAnimation: string;

  app.value.ticker.add((time) =>
  {
    const rightPressed = controller?.keys.right.pressed;
    const animationName = rightPressed ? 'walk' : 'idle';
    const loop = true;

    if (currentAnimation !== animationName)
    {
      currentAnimation = animationName;

      spineBoy?.spine.state.setAnimation(0, animationName, loop);
    }
  });
}
</script>
