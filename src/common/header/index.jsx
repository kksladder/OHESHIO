import React, { useState, useEffect } from 'react';
import { SiOperagx } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/modules/authSlice';
import { showToast } from '/src/ui/toast/showToast';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBottomMenuVisible, setIsBottomMenuVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1281);
  const { authed } = useSelector((state) => state.authR);
  const [showCloudEffect, setShowCloudEffect] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onGo = () => {
    navigate('/login');
  };
  const onLogout = () => {
    dispatch(authActions.logout());
    showToast('auth', { message: '로그아웃이 완료 되었습니다.' });
    navigate('/login');
  };
  const onMypage = () => {
    if (!authed) {
      showToast('auth', { message: '로그인이 필요한 기능입니다.' });
      navigate('/login');
    } else {
      navigate('/mypage');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      // 1280px 이상일 때만 구름 효과 활성화
      setShowCloudEffect(width >= 1280);
    };

    // 초기 실행
    handleResize();

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 마우스 호버 이벤트 핸들러
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Check if we're in desktop view
  const isDesktop = windowWidth >= 1280;

  const location = useLocation();
  const isCheckoutCompletePage = location.pathname.includes('/checkout/complete');
  const isCheckoutOrCartPage =
    (location.pathname.includes('/checkout') && !isCheckoutCompletePage) || location.pathname.includes('/cart');

  return (
    <>
      {showCloudEffect && (
        <div
          className="cloud-effect"
          style={{
            background: 'linear-gradient(180deg, rgba(231, 236, 234, 1) 10%, rgba(231, 236, 234, 0) 80%)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 90,
            opacity: isHovering ? 1 : 0,
            marginTop: '-30px',
            width: '100%',
            height: '250px',
            transition: 'all 0.5s ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 w-full h-11 transition-all duration-300 z-[8000] ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-4 h-full relative">
          {/* Desktop only "home" text */}
          <div className="hidden xl:block text-xs md:text-sm font-medium absolute top-1/2 -translate-y-1/2 left-16 text-black">
            {isCheckoutOrCartPage ? (
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80"
              >
                back
              </button>
            ) : (
              <Link to="/main">home</Link>
            )}
          </div>

          {/* Mobile/Tablet Icon */}
          <div className="block xl:hidden absolute top-1/2 -translate-y-1/2 left-16">
            {isCheckoutOrCartPage ? (
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80"
              >
                back
              </button>
            ) : (
              <div className="group relative">
                <div className="text-sm text-black cursor-pointer font-medium hover:opacity-80 flex items-center justify-center">
                  <SiOperagx className="text-lg" />
                </div>
                <div className="absolute  flex flex-col left-1/2 -translate-x-1/2 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2">
                  {authed ? (
                    <>
                      <button
                        onClick={onLogout}
                        className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center"
                      >
                        logout
                      </button>

                      <button
                        onClick={onMypage}
                        className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center "
                      >
                        my page
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={onGo}
                        className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center "
                      >
                        sign up
                      </button>
                      <button
                        onClick={onMypage}
                        className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center "
                      >
                        my page
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Logo (always centered) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" width={144} />
            </Link>
          </div>
          {/* Desktop only collection dropdown */}
          {!isCheckoutOrCartPage && (
            <div className="hidden xl:block absolute top-1/2 -translate-y-1/2 right-36">
              <div className="group">
                <div className="text-sm text-black cursor-pointer font-medium hover:opacity-80 mr-32 relative">
                  collection
                </div>
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2">
                  <Link to="/main" className="block">
                    <div className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 ">
                      uniform
                    </div>
                  </Link>
                  <Link to="/kbrand" className="block">
                    <div className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 ">
                      oheshio-k
                    </div>
                  </Link>
                  <Link to="/about" className="block">
                    <div className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 ">
                      about
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* Desktop only SiOperagx icon */}
          {!isCheckoutOrCartPage && (
            <div className="hidden xl:block absolute top-1/2 -translate-y-1/2 right-44">
              <div className="group relative">
                <div className="text-sm text-black cursor-pointer font-medium hover:opacity-80 flex items-center justify-center">
                  <SiOperagx className="text-lg" />
                </div>
                <div className="absolute flex flex-col justify-center left-1/2 -translate-x-1/2 mt-1 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 pt-2">
                  {authed ? (
                    <>
                      {!isCheckoutOrCartPage && (
                        <button
                          onClick={onLogout}
                          className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center"
                        >
                          logout
                        </button>
                      )}
                      <button
                        onClick={onMypage}
                        className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center "
                      >
                        my page
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={onGo}
                        className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600 text-center "
                      >
                        sign up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-1/2 -translate-y-1/2 right-16">
            <div className="group relative">
              <Link to={'/cart'} className="block">
                <div className="text-xs md:text-sm text-black cursor-pointer font-medium hover:opacity-80">bag</div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation bar (mobile/tablet only - shows on screens smaller than xl) */}
      {!isDesktop && !isCheckoutOrCartPage && (
        <div className="fixed bottom-0 left-0 w-full h-14 shadow-lg z-50">
          <div className="container mx-auto h-full flex justify-center items-center">
            <div className="w-full max-w-md flex justify-around items-center">
              {/* Collection button */}
              <div className="group relative">
                <div className="text-sm text-black cursor-pointer font-medium hover:opacity-80">collection</div>
                {/* Dropdown Menu (opens upward) */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-12 w-32 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500">
                  <Link to="/main" className="block">
                    <div className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600">
                      uniform
                    </div>
                  </Link>
                  <Link to="/kbrand" className="block">
                    <div className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600">
                      k-brand
                    </div>
                  </Link>
                  <Link to="/about" className="block">
                    <div className="py-2 px-4 text-xs md:text-sm transition-colors cursor-pointer hover:text-gray-600">
                      about
                    </div>
                  </Link>
                </div>
              </div>

              {/* Refine button (bottom navigation) */}
              <div className="relative">
                <div
                  className="text-sm text-black cursor-pointer font-medium hover:opacity-80"
                  onClick={() => setIsBottomMenuVisible(!isBottomMenuVisible)}
                >
                  refine
                </div>
                {/* Toggle dropdown menu */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-14 transition-all duration-300 overflow-hidden z-[8010] w-[120px] 
                                        ${
                                          isBottomMenuVisible
                                            ? 'max-h-[500px] opacity-100'
                                            : 'max-h-0 opacity-0 pointer-events-none'
                                        }`}
                >
                  <div className="py-2 text-right pr-4 ">
                    <div className="text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80">
                      all
                    </div>
                    <div className="text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80">
                      outer
                    </div>
                    <div className="text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80">
                      tops
                    </div>
                    <div className="text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80">
                      bottoms
                    </div>
                    <div className="text-xs md:text-sm text-black py-2 cursor-pointer font-medium hover:opacity-80">
                      acc
                    </div>

                    {/* Color selection section */}
                    <div className="bg-[#cbd5e1] border-primary-500 shadow-md p-4 mt-2 border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-4 h-4 rounded-full bg-[#B7B7B7]"></div>
                        <span className="text-gray-700 text-xs md:text-sm">gray</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-4 h-4 rounded-full bg-[#000000]"></div>
                        <span className="text-gray-700 text-xs md:text-sm">black</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-gray-200"></div>
                        <span className="text-gray-700 text-xs md:text-sm">white</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-4 h-4 rounded-full bg-[#FCF2D6]"></div>
                        <span className="text-gray-700 text-xs md:text-sm">beige</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-4 h-4 rounded-full bg-[#CEE3FC]"></div>
                        <span className="text-gray-700 text-xs md:text-sm">blue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
