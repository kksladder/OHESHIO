import { useState } from 'react';
import { useSelector } from 'react-redux';
import MyPageOrderHistory from '../../components/mypage/MyPageOrderHistory';
import MyPageCoupons from '../../components/mypage/MyPageCoupons';
import MyPageWishlist from '../../components/mypage/MyPageWishlist';
import MyPageRecentViewed from '../../components/mypage/MyPageRecentViewed';
import MyPageUserInfo from '../../components/mypage/MyPageUserInfo';
import MyPageNavigation from '../../components/mypage/MyPageNavigation';
import MyPageHome from '../../components/mypage/MyPageHome';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('홈');
  const currentUser = useSelector((state) => state.authR.currentUser);
  const isAuthed = useSelector((state) => state.authR.authed);

  if (!isAuthed) {
    return (
      <div className='max-w-7xl mx-auto py-10 text-center'>
        <h1 className='text-2xl font-bold my-6'>로그인이 필요합니다</h1>
        <p>마이페이지를 이용하려면 로그인해 주세요.</p>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto py-10 text-center'>
      <h1 className='text-2xl font-bold my-6'>My Page</h1>
      <MyPageNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='mt-6'>
        {activeTab === '홈' && <MyPageHome currentUser={currentUser} />}
        {activeTab === '주문내역' && <MyPageOrderHistory orders={currentUser.orders} />}
        {activeTab === '쿠폰/적립금' && <MyPageCoupons points={currentUser.points} coupons={currentUser.coupons} />}
        {activeTab === '관심상품' && <MyPageWishlist wishlist={currentUser.wishlist} />}
        {activeTab === '최근 본 상품' && (
          <MyPageRecentViewed recentlyViewed={currentUser.recentlyViewed || []} wishlist={currentUser.wishlist} />
        )}
        {activeTab === '회원정보' && <MyPageUserInfo userInfo={currentUser} />}
      </div>
    </div>
  );
};

export default MyPage;
