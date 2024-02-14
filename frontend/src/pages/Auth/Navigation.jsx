import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

// we will bw using this to show how many favourites items are inside of a favourites count
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const routes = {
    globalRoutes: [
      {
        id: 1,
        name: 'home',
        path: '/'
      },
      {
        id: 2,
        name: 'shop',
        path: '/shop'
      },
      {
        id: 3,
        name: 'cart',
        path: '/cart'
      },
      {
        id: 4,
        name: 'favorites',
        path: '/favorite'
      }
    ],
    adminRoutes: [
      {
        id: 'a1',
        name: 'dashboard',
        path: '/admin/dashboard'
      },
      {
        id: 'a2',
        name: 'products',
        path: '/admin/productlist'
      },
      {
        id: 'a3',
        name: 'category',
        path: '/admin/categorylist'
      },
      {
        id: 'a4',
        name: 'orders',
        path: '/admin/orderlist'
      },
      {
        id: 'a5',
        name: 'users',
        path: '/admin/userlist'
      }
    ],
    userRoutes: [
      {
        id: 'a6',
        name: 'profile',
        path: '/profile'
      },
      {
        id: 'a7',
        name: 'logout',
        path: '/logout'
      }
    ],
    authenticationRoutes: [
      {
        id: 'a8',
        name: 'login',
        path: '/login'
      },
      {
        id: 'a9',
        name: 'register',
        path: '/register'
      }
    ]

  };

  const { userInfo } = useSelector((state) => state.auth);

  // we will be using it for counting how many products are present inside of a cart
  // const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`flex xl:flex lg:flex md:hidden sm:hidden justify-between px-7 text-white bg-[#000] w-[100vw] fixed `}
    >
      <div className="flex gap-7">
        {
          routes.globalRoutes.map((data) => {
            return (
              <Link key={data.id} to={data.path} className="my-[2vh]">
                <span className="text-white capitalize">{data.name}</span>
              </Link>
            )
          })
        }
      </div>

      <div className="relative flex gap-7">
        {userInfo && (
          <>
            <ul
              className='flex gap-7'
            >
              {userInfo.isAdmin && (
                routes.adminRoutes.map((data) => {
                  return (
                    <li key={data.id} className="py-3 capitalize" >
                      <Link to={data.path}>
                        <span className="text-white">{data.name}</span>
                      </Link>
                    </li>
                  )
                })
              )}

              {routes.userRoutes.map((data) => {
                return (
                  <li key={data.id} className="py-3 capitalize" onClick={data.id == 'a7' && logoutHandler}>
                    <Link to={data.path}>
                      <span className="text-white">{data.name}</span>
                    </Link>
                  </li>
                )
              })}

            </ul>
            <span className="text-white py-3">{userInfo.username}</span>
          </>
        )}
        {!userInfo && (
          <ul className="flex gap-7">
            {
              routes.authenticationRoutes.map((data) => {
                return (
                  <ul className="py-3">
                    <Link to={data.path} key={data.id}>
                      <span className="text-white">{data.name}</span>
                    </Link>
                  </ul>
                )
              })
            }
          </ul>
        )}
      </div>
    </div >
  );
};

export default Navigation;
