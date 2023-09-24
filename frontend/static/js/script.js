/**
 * Converts a route path to a regular expression.
 *
 * @param {string} path - The path to convert.
 * @returns {RegExp} A regular expression for the path.
 */
 const pathToRegex = (path) =>
 new RegExp("^" + path.replace("//\\g", "\\/").replace(/:\w+/g, "(.+)") + "$");

/**
* Extracts parameters from a matched route.
*
* @param {object} match - The matched route object.
* @returns {object} An object containing parameter names and values.
*/
const getParams = (match) => {
 const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
   (result) => result[1]
 );
 return Object.fromEntries(keys.map((key, i) => [key, match.result[i + 1]]));
};

/**
* Navigates to a specified URL and triggers the router.
*
* @param {string} url - The URL to navigate to.
*/
const navigateTo = (url) => {
 history.pushState(null, null, url);
 router(); // Trigger the router to handle the new URL
};

/**
* Handles routing for the SPA.
*/
const router = async () => {
 // Define the routes and the corresponding view modules (lazy-loaded)
 const routes = [
   { path: "/", view: () => import("./views/Dashboard.js") },
   { path: "/posts", view: () => import("./views/Posts") },
   { path: "/posts/:id", view: () => import("./views/PostView") },
   { path: "/settings", view: () => import("./views/Settings") },
 ];

 // Test each route for a potential match
 const potentialMatches = routes.map((route) => {
   return {
     route: route,
     result: location.pathname.match(pathToRegex(route.path)),
   };
 });

 let match = potentialMatches.find(
   (potentialMatch) => potentialMatch.result !== null
 );

 if (!match) {
   // Handle the case where no route matches the current URL
   match = {
     route: { view: () => import("./views/NotFound.js") },
     result: [location.pathname],
   };
 }

 // Dynamically import and render the view
 const View = (await match.route.view()).default;
 const view = new View(getParams(match));

 // Update the HTML content of the "#app" element with the view's content
 document.querySelector("#app").innerHTML = await view.getHtml();
};

// Listen for the "popstate" event, triggered when the user navigates back or forward
window.addEventListener("popstate", router);

// Wait for the DOM to be fully loaded before setting up event listeners and initial routing
document.addEventListener("DOMContentLoaded", () => {
 // Add a click event listener to the document body for links with the "data-link" attribute
 document.body.addEventListener("click", (e) => {
   if (e.target.matches("[data-link]")) {
     e.preventDefault();
     navigateTo(e.target.href); // Navigate to the clicked link's URL
   }
 });

 // Perform the initial routing when the DOM is loaded
 router();
});

/**
* Lazy loads images with the "lazy" class when they become visible in the viewport.
*
* @param {Element} target - The element to apply lazy loading to.
*/
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

// Select all elements with the "lazy" class and apply lazy loading
const lazyImages = document.querySelectorAll('.lazy');
lazyImages.forEach(lazyLoad);
