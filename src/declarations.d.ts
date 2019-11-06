declare module "*.css";

declare module "@openmrs/esm-api";

declare var System;

declare module "*.json" {
  const value: any;
  export default value;
}
