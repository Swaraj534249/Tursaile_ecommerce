import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from '../features/auth/AuthSlice'
import ProductSlice from '../features/products/ProductSlice'
import UserSlice from '../features/user/UserSlice'
import BrandSlice from '../features/brands/BrandSlice'
import CategoriesSlice from '../features/categories/CategoriesSlice'
import CartSlice from '../features/cart/CartSlice'
import AddressSlice from '../features/address/AddressSlice'
import ReviewSlice from '../features/review/ReviewSlice'
import OrderSlice from '../features/order/OrderSlice'
import WishlistSlice from '../features/wishlist/WishlistSlice'
import VesselOwnerSlice from '../features/vesselOwner/VesselOwnerSlice'
import VesselManagerSlice from '../features/vesselManager/VesselManagerSlice'
import VesselSlice from '../features/vessel/VesselSlice'
import RankSlice from '../features/rank/RankSlice'
import CrewSlice from '../features/crew/CrewSlice'
import CrewingAgentSlice from '../features/crewingAgent/CrewingAgentSlice'
import ProposeSlice from '../features/propose/ProposeSlice'

export const store=configureStore({
    reducer:{
        AuthSlice,
        ProductSlice,
        UserSlice,
        BrandSlice,
        CategoriesSlice,
        CartSlice,
        AddressSlice,
        ReviewSlice,
        OrderSlice,
        WishlistSlice,
        VesselOwnerSlice,
        VesselManagerSlice,
        VesselSlice,
        RankSlice,
        CrewSlice,
        CrewingAgentSlice,
        ProposeSlice
    }
})