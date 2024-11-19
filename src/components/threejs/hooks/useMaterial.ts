import * as THREE from 'three';

export const useMaterial = () => {
  const highlightScene = (
    scene: THREE.Group<THREE.Object3DEventMap>,
    highlight: boolean
  ) => {
    scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        // Clone the material for each mesh to ensure unique materials
        const clonedMaterial = child.material.clone();
        if (highlight) {
          clonedMaterial.color.set(0xff0000); // Set the color to red
          clonedMaterial.emissive.set(0x0000ff); // Set the emissive color to red
          clonedMaterial.emissiveIntensity = 0.1; // Increase the emissive intensity
          // clonedMaterial.wireframe = true; // Enable wireframe mode to create a line effect
        } else {
          clonedMaterial.color.set(0xffffff); // Reset the color to white
          clonedMaterial.emissive.set(0x000000); // Reset the emissive color
          clonedMaterial.emissiveIntensity = 0; // Reset the emissive intensity
          // clonedMaterial.wireframe = false; // Disable wireframe mode
        }
        child.material = clonedMaterial;
      }
    });
  };

  const changeMaterialForScene = (
    scene: THREE.Group<THREE.Object3DEventMap>,
    materialName: string,
    texturePath: string
  ) => {
    const textureLoader = new THREE.TextureLoader();

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material;

        if (material.name.startsWith(materialName)) {
          if (texturePath.startsWith('http')) {
            // Load texture from URL
            const textureUrl = texturePath + `?t=${Date.now()}`;
            textureLoader.load(
              textureUrl,
              (texture: THREE.Texture) => {
                console.log('Changing texture for material:', material.name);
                const currentTexture = material.map.clone(true);
                currentTexture.source = texture.source;
                material.map = currentTexture;
                material.needsUpdate = true;
              },
              undefined,
              (error) => {
                console.error('Error loading texture:', error);
              }
            );
          } else {
            console.log('Changing color for material:', material.name);
            material.color.set(texturePath);
            material.needsUpdate = true;
            material.color.convertSRGBToLinear();
            console.log('New color:', material.color);
          }
        }
      }
    });
  };

  const changeMaterialForModules = (
    kitchenModuleRefs: any,
    name: string,
    texture: string
  ) => {
    if (!kitchenModuleRefs?.current) return;

    kitchenModuleRefs.current.forEach((ref: any) => {
      const scene = ref.current?.scene;
      if (!scene) return;

      changeMaterialForScene(scene, name, texture);
    });
  };

  return { highlightScene, changeMaterialForScene, changeMaterialForModules };
};
