"use client";

import type { ReactNode } from "react";

import { ResourceGenericPage } from "./common";
import { RentControlPage } from "./rent-control";
import "../operation/operation.css";
import "./resource.css";

const generic = (id: string) => {
  const Component = () => <ResourceGenericPage id={id} />;
  Component.displayName = `ResourceGeneric-${id}`;
  return Component;
};

const RESOURCE_COMPONENTS: Record<string, () => ReactNode> = {
  "rent-control": RentControlPage,
  projects: generic("projects"),
  "property-projects": generic("property-projects"),
  "property-house": generic("property-house"),
  business: generic("business"),
  residence: generic("residence"),
  apartment: generic("apartment"),
  "food-market": generic("food-market"),
  station: generic("station"),
  bed: generic("bed"),
  venue: generic("venue"),
  "ad-space": generic("ad-space"),
  parking: generic("parking"),
  vehicle: generic("vehicle"),
  warehouse: generic("warehouse"),
};

export function ResourcePageRenderer({ slug }: { slug: string }) {
  const Component = RESOURCE_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
