import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Chip, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';



export const 
Navbar=({isProductList=false})=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElManager, setAnchorElManager] = React.useState(null);
  const userInfo=useSelector(selectUserInfo)
  // const cartItems=useSelector(selectCartItems)
  const loggedInUser=useSelector(selectLoggedInUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const theme=useTheme()
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const wishlistItems=useSelector(selectWishlistItems)
  const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenManagerMenu = (event) => {
    setAnchorElManager(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseManagerMenu = () => {
    setAnchorElManager(null);
  };

  const handleToggleFilters=()=>{
    dispatch(toggleFilters())
  }

  const settings = [
    {name:"Home",to:"/"},
    {name:'Profile',to:loggedInUser?.isAdmin?"/admin/profile":"/profile"},
    {name:loggedInUser?.isAdmin?'Orders':'My orders',to:loggedInUser?.isAdmin?"/admin/orders":"/orders"},
    {name:'Logout',to:"/logout"},
  ];

  const contracts = [
    {name:"Proposed",to:"/propose"},
    {name:"Selected",to:"/selecte"},
    // {name:"Crew",to:"/crews"},
    // {name:'Crew Agents',to:"/crewingAgents"},
    // {name:'Ranks',to:"/rank"},
  ];

  const manager_pages = [
    {name:"Vessel Managers",to:"/vessel-managers"},
    {name:"Vessel Owners",to:"/vessel-owners"},
    {name:"Crew",to:"/crews"},
    {name:'Crew Agents',to:"/crewingAgents"},
    {name:'Ranks',to:"/rank"},
  ];

  return (
    <AppBar position="sticky" sx={{backgroundColor:"white",boxShadow:"none",color:"text.primary"}}>
        <Toolbar sx={{p:1,height:"4rem",display:"flex",justifyContent:"space-around"}}>

          <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' },fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
            BSM
          </Typography>



          <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={2}>
            <Tooltip title="Open contracts">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                Contract
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {/* {
                loggedInUser?.isAdmin && 
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to="/admin/add-product" textAlign="center">Add new Product</Typography>
                </MenuItem>
              
              } */}
              {contracts.map((contract) => (
                <MenuItem key={contract} onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to={contract.to} textAlign="center">{contract.name}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Tooltip title="Open Settings">
              <IconButton onClick={handleOpenManagerMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo?.name} src="null" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElManager}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElManager)}
              onClose={handleCloseManagerMenu}
            >
              {manager_pages.map((manager_page) => (
                <MenuItem key={manager_page} onClick={handleCloseManagerMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to={manager_page.to} textAlign="center">{manager_page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
            {/* <Typography variant='h6' fontWeight={300}>{is480?`${userInfo?.name.toString().split(" ")[0]}`:`Hey👋, ${userInfo?.name}`}</Typography> */}
            {loggedInUser.isAdmin && <Button variant='contained'>Admin</Button>}
            <Stack sx={{flexDirection:"row",columnGap:"1rem",alignItems:"center",justifyContent:"center"}}>

            
            {/* {
            cartItems?.length>0 && 
            <Badge  badgeContent={cartItems.length} color='error'>
              <IconButton onClick={()=>navigate("/cart")}>
                <ShoppingCartOutlinedIcon />
                </IconButton>
            </Badge>
            } */}
            
            {/* {
              !loggedInUser?.isAdmin &&
                  <Stack>
                      <Badge badgeContent={wishlistItems?.length} color='error'>
                          <IconButton component={Link} to={"/wishlist"}><FavoriteBorderIcon /></IconButton>
                      </Badge>
                  </Stack>
            } */}
            {
              <IconButton onClick={handleToggleFilters}><TuneIcon sx={{color:isProductFilterOpen?"black":""}}/></IconButton>
            }
            
            </Stack>
          </Stack>
        </Toolbar>
    </AppBar>
  );
}