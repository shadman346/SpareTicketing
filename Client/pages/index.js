import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
   return <h1> landing page</h1>;
};

// It is going to render on server
LandingPage.getInitialProps = async (context) => {
   // constext object contains property req that just like express req
   const client = buildClient(context);
   const { data } = await client.get('/api/users/currentuser');
   return data;
};
export default LandingPage;
