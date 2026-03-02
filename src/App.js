import React, { Suspense, lazy } from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './layouts/Layout';
import './css/App.css';
import loader from '../src/assets/loader.svg'
// context providers
import UserProvider from './context/UserContext';
import { FilterProvider } from './context/FilterContext';
import PropertyProvider from './context/PropertyContext';
import CommentProvider from './context/CommentsContext';
import CheckoutProvider from './context/CheckoutContext';
import LikesProvider from './context/LikesContext';
import PromoCodesProvider from './context/PromoCodesContext';
import ListRequestProvider from './context/ListRequestContext';
import BlogsProvider from './context/BlogsContext';
import PesapalProvider from './context/PesapalContext';

// Lazy load the components
const Home = lazy(() => import('./pages/Home'));
const Signup = lazy(() => import('./pages/Signup'));
const Verification = lazy(() => import('./pages/Verification'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Properties = lazy(() => import('./pages/Properties'));
const Aboutus = lazy(() => import('./pages/Aboutus'));
const Contactus = lazy(() => import('./pages/Contactus'));
const Singleproperty = lazy(() => import('./pages/Singleproperty'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Listing = lazy(() => import('./pages/Listing'));
const Blog = lazy(() => import('./pages/Blog'));
const Singleblog = lazy(() => import('./pages/Singleblog'));
const Flight = lazy(() => import('./pages/Flights'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EditProperty = lazy(() => import('./pages/EditProperty'));
const EditBlog = lazy(() => import('./pages/EditBlog'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const PaymentResponse = lazy(() => import('./pages/PaymentResponse'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Faqs = lazy(() => import('./pages/Faqs'));
const OnboardForm = lazy(() => import('./pages/OnboardForm'));
const Sky = lazy(() => import('./pages/Sky'));


function App() {

  return (
    <Router>
      <GoogleOAuthProvider clientId="647898125883-o9u7lqu2ehoej5717m10kcnlh4lkf3l6.apps.googleusercontent.com">
        <UserProvider>
          
          <FilterProvider>
          <PropertyProvider>
            <CommentProvider>
              <CheckoutProvider>
              <PesapalProvider>
                <LikesProvider>
                  <PromoCodesProvider>
                    <ListRequestProvider>
                      <BlogsProvider>
                      <Suspense fallback={<div className='flex items-center justify-center h-screen'><img className='loader xsm:w-[48px] sm:w-[52px] md:w-[64px] lg:w-[64px]' src={loader} alt="Loading"/></div>}>
                        <Routes>
                          <Route path="/" element={<Layout/>}>
                            <Route index element={<Home/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/verification" element={<Verification/>}/>
                            <Route path="/properties" element={<Properties/>}/>
                            <Route path="/portfolio" element={<Portfolio/>}/>
                            <Route path="/aboutus" element={<Aboutus/>}/>
                            <Route path="/contactus" element={<Contactus/>}/>
                            <Route path="/singleproperty/:property_id" element={<Singleproperty/>}/>
                            <Route path="/checkout" element={<Checkout/>}/>
                            <Route path="/listing" element={<Listing/>}/>
                            <Route path="/blog" element={<Blog/>}/>
                            <Route path="/singleblog/:id" element={<Singleblog/>}/>
                            <Route path='/flights' element={<Flight/>}/>
                            <Route path='/dashboard' element={<Dashboard/>}/>
                            <Route path='/editproperty/:property_id' element={<EditProperty/>}/>
                            <Route path='/editblog/:id' element={<EditBlog/>}/>
                            <Route path='/resetpassword' element={<ResetPassword/>}/>
                            <Route path='/paymentresponse' element={<PaymentResponse/>}/>
                            <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
                            <Route path='/faq' element={<Faqs/>}/>
                            <Route path='/onboardform' element={<OnboardForm/>}/>
                            <Route path='/skystay' element={<Sky/>}/>
                          </Route>
                        </Routes>
                      </Suspense>
                      </BlogsProvider>
                    </ListRequestProvider>
                  </PromoCodesProvider>
                </LikesProvider>
                </PesapalProvider>
              </CheckoutProvider>
            </CommentProvider>
          </PropertyProvider>
          </FilterProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
