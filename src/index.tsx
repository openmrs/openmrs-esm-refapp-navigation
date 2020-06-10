import "./set-public-path";

function setupOpenMRS() {
  return {
    lifecycle: () => import("./refapp-navigation"),
    activate: ""
  };
}

export { setupOpenMRS };
