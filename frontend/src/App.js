import { useSelector } from 'react-redux';
import {
  Navigate,
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import { Logout } from './features/auth/components/Logout';
import { Protected } from './features/auth/components/Protected';
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import { AddProductPage, AdminOrdersPage, CartPage, CheckoutPage, ForgotPasswordPage, HomePage, LoginPage, OrderSuccessPage, OtpVerificationPage, ProductDetailsPage, ProductUpdatePage, ResetPasswordPage, SignupPage, UserOrdersPage, UserProfilePage, WishlistPage } from './pages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { VesselOwnerPage } from './pages/VesselOwnerPage';
import { VesselManagerPage } from './pages/VesselManagerPage';
import { VesselPage } from './pages/VesselPage';
import { RankPage } from './pages/RankPage';
import { CrewPage } from './pages/CrewPage';
import { CrewingAgentPage } from './pages/CrewingAgentPage';
import { ProposePage } from './pages/ProposePage';
import { AddProposePage } from './pages/AddProposePage';
import { EditProposalPage } from './pages/EditProposalPage';
import { Form1PDF } from './pages/Form1PDF';

function App() {

  const isAuthChecked=useSelector(selectIsAuthChecked)
  const loggedInUser=useSelector(selectLoggedInUser)


  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);


  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/verify-otp' element={<OtpVerificationPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
        <Route exact path='/logout' element={<Protected><Logout/></Protected>}/>
        <Route exact path='/product-details/:id' element={<Protected><ProductDetailsPage/></Protected>}/>

        <Route path='/vessel-managers' element={<Protected><VesselManagerPage/></Protected>}/>
        <Route path='/vessel-owners' element={<Protected><VesselOwnerPage/></Protected>}/>
        <Route path='/crews' element={<Protected><CrewPage/></Protected>}/>
        <Route path='/crewingAgents' element={<Protected><CrewingAgentPage/></Protected>}/>
        <Route path='/rank' element={<Protected><RankPage/></Protected>}/>
        <Route exact path='/vessels/:id' element={<Protected><VesselPage/></Protected>}/>
        <Route path='/propose' element={<Protected><ProposePage/></Protected>}/>
        <Route path='/add-propose' element={<Protected><AddProposePage/></Protected>}/>
        <Route path='/edit-propose/:id' element={<Protected><EditProposalPage/></Protected>}/>
        {/* <Route path='/form1/:fileName' element={<Protected><Form1PDF/></Protected>}/> */}

        {
          loggedInUser?.isAdmin?(
            // admin routes
            <>
            <Route path='/admin/dashboard' element={<Protected><AdminDashboardPage/></Protected>}/>
            <Route path='/admin/product-update/:id' element={<Protected><ProductUpdatePage/></Protected>}/>
            <Route path='/admin/add-product' element={<Protected><AddProductPage/></Protected>}/>
            <Route path='/admin/orders'  element={<Protected><AdminOrdersPage/></Protected>}/>
            <Route path='/admin/profile'  element={<Protected><UserProfilePage/></Protected>}/>
            <Route path='*' element={<Navigate to={'/admin/dashboard'}/>}/>
            </>
          ):(
            // user routes
            <>
            <Route path='/' element={<Protected><HomePage/></Protected>}/>
            <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
            <Route path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
            <Route path='/checkout' element={<Protected><CheckoutPage/></Protected>}/>
            <Route path='/order-success/:id' element={<Protected><OrderSuccessPage/></Protected>}/>
            <Route path='/orders' element={<Protected><UserOrdersPage/></Protected>}/>
            <Route path='/wishlist' element={<Protected><WishlistPage/></Protected>}/>
            </>
          )
        }

        <Route path='*' element={<NotFoundPage/>} />

      </>
    )
  )

  
  return isAuthChecked ? <RouterProvider router={routes}/> : "";
}

export default App;
