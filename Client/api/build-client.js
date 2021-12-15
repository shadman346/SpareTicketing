import axios from 'axios';

export default ({ req }) => {
   if (typeof window === 'undefined') {
      // we are on server
      // request should be made to https://SERVICE_NAME.NAMESPACE.svc.cluster.local/api/users/currentuser

      // headers: {
      //    Host: 'spareticketing.com',
      // },
      // many headers drop when request reach one of our service inside our cluster, so here we reach to client service
      // now client service make further request to other services while being inside cluster so we need to reattach cookies
      // and specify under which hostname we are making request otherwise it chooses default hostname which we genereally
      // not mapped inside our ingress controller
      // so by setting headers:req.headers we are reassigning every drop thing again like cookies and same host name
      // default host: 'ingress-nginx-controller.ingress-nginx.svc.cluster.local' not define in ingress, thats how you reach ingress inside cluster
      // overide host: 'spareticketing.com' define in ingress, thats how you reach ingress from outside world
      // by overiding we make ingress beleive that request coming for this hostname
      return axios.create({
         // we are on browser
         // request should be made normally
         //happens when you navigating within app once it loaded
         baseURL:
            'https://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
         headers: req.headers,
      });
   } else {
      return axios.create({
         baseURL: '/',
      });
   }
};
