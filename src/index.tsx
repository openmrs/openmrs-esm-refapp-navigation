import "./set-public-path";

function setupOpenMRS() {
  return {
    lifecycle: () => import("./openmrs-esm-refapp-navigation"),
    activate: location => true
  };
}

export { setupOpenMRS };
