/**
 * NORTHLINE FORGE — R3F post stack
 * Copy into a game that installed:
 *   npm i @react-three/postprocessing postprocessing
 * Bloom + vignette is the default “it doesn’t look like unlit cubes” grade.
 * Respect reduced motion: skip bloom if Juice.reducedMotion.
 */

import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";

export function ForgePost({
  bloom = true,
  vignette = true,
  reducedMotion = false,
}: {
  bloom?: boolean;
  vignette?: boolean;
  reducedMotion?: boolean;
}) {
  return (
    <EffectComposer disableNormalPass>
      <SMAA />
      {bloom && !reducedMotion ? (
        <Bloom intensity={0.45} luminanceThreshold={0.85} mipmapBlur />
      ) : null}
      {vignette ? <Vignette darkness={0.55} offset={0.25} /> : null}
    </EffectComposer>
  );
}
