const pathToRegex = (path) =>
  new RegExp("^" + path.replace("//\\g", "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  return Object.fromEntries(keys.map((key, i) => [key, match.result[i + 1]]));
};
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: () => import("./views/Dashboard.js") },
    { path: "/posts", view: () => import("./views/Posts") },
    { path: "/posts/:id", view: () => import("./views/PostView") },
    { path: "/settings", view: () => import("./views/Settings") },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatche) => potentialMatche.result !== null
  );

  if (!match) {
    match = {
      route: { view: () => import("./views/NotFound.js") },
      result: [location.pathname],
    };
  }

  // Dynamically import and render the view
  const View = (await match.route.view()).default;
  const view = new View(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});



// Lazy load images with the "lazy" class
const lazyImages = document.querySelectorAll('.lazy');

const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        img.setAttribute('src', src);
        observer.unobserve(img);
      }
    });
  });

  io.observe(target);
};

lazyImages.forEach(lazyLoad);
