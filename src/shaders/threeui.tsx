import React from "react";
import {
  CloudField,
  DimensionalField,
  DataField,
  TopologyField,
  VoidField,
  IgnitionButton,
  InductionButton,
  PlasmaButton,
  TactileButton,
  ThinkingButton,
  LaunchButton,
  DotBorderButton,
  GradientCta,
  SpinningBorderButton,
  GlassmorphismCta,
  GenerateButton,
  GradientPillButton,
  GradientBeamCta,
  type NeuformIsolatedEffectProps,
} from "./neuform-isolated/NeuformIsolatedEffects";

export type PortalFieldVariant =
  | "cloud-field"
  | "dimensional-field"
  | "data-field"
  | "topology-field"
  | "void-field"
  | string;

export interface PortalFieldCollectionProps extends NeuformIsolatedEffectProps {
  variant?: PortalFieldVariant;
}

export function PortalFieldCollection({
  variant = "cloud-field",
  ...props
}: PortalFieldCollectionProps) {
  switch (variant) {
    case "dimensional-field":
      return <DimensionalField {...props} />;
    case "data-field":
      return <DataField {...props} />;
    case "topology-field":
      return <TopologyField {...props} />;
    case "void-field":
      return <VoidField {...props} />;
    case "cloud-field":
    default:
      return <CloudField {...props} />;
  }
}

export type ShaderButtonVariant =
  | "ignition-button"
  | "ignition"
  | "induction-button"
  | "plasma-button"
  | "tactile-button"
  | "thinking-button"
  | "launch-button"
  | "dot-border-button"
  | "gradient-cta"
  | "spinning-border-button"
  | "glassmorphism-cta"
  | "generate-button"
  | "gradient-pill-button"
  | "gradient-beam-cta"
  | string;

export interface ShaderButtonsProps extends NeuformIsolatedEffectProps {
  variant?: ShaderButtonVariant;
}

export function ShaderButtons({
  variant = "ignition-button",
  ...props
}: ShaderButtonsProps) {
  switch (variant) {
    case "ignition-button":
    case "ignition":
      return <IgnitionButton {...props} />;
    case "induction-button":
    case "induction":
      return <InductionButton {...props} />;
    case "plasma-button":
    case "plasma":
      return <PlasmaButton {...props} />;
    case "tactile-button":
    case "tactile":
      return <TactileButton {...props} />;
    case "thinking-button":
    case "thinking":
      return <ThinkingButton {...props} />;
    case "launch-button":
    case "launch":
      return <LaunchButton {...props} />;
    case "dot-border-button":
    case "dot-border":
      return <DotBorderButton {...props} />;
    case "gradient-cta":
      return <GradientCta {...props} />;
    case "spinning-border-button":
      return <SpinningBorderButton {...props} />;
    case "glassmorphism-cta":
      return <GlassmorphismCta {...props} />;
    case "generate-button":
      return <GenerateButton {...props} />;
    case "gradient-pill-button":
      return <GradientPillButton {...props} />;
    case "gradient-beam-cta":
      return <GradientBeamCta {...props} />;
    default:
      return <IgnitionButton {...props} />;
  }
}

export function Scene() {
  return (
    <div className="shader-frame">
      <ShaderButtons
        variant="ignition-button"
        mode="dark"
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}

export * from "./neuform-isolated/NeuformIsolatedEffects";
