import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
   return (
      <div>
         <Header currentUser={currentUser} />
         <Component {...pageProps} />
      </div>
   );
};

// app context is different from other pages context because it somewhat a container who wraps our whole application
//it contains appContext === {'AppTree','Component','router','ctx'}
// so appContext.ctx is what we looking for and equal to other pages context

// once this appComponent.getInitialProps going to be called other pages getinitialProps() are not going to be called
// automatically you have to call all those props() manually here and somhow pass all the data that you fetch down the tree
AppComponent.getInitialProps = async (appContext) => {
   const client = buildClient(appContext.ctx);
   const { data } = await client.get('/api/users/currentuser');

   let pageProps = {};
   if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
   }

   return {
      pageProps,
      currentUser: data.currentUser,
   };
};
export default AppComponent;
