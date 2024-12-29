import React, { useContext, useState } from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
import navigation from '../../../menu-items';

const Navigation = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmLogout = () => {
    // Thực hiện đăng xuất ở đây
    window.location.href = "/";
    console.log('Đăng xuất thành công');
    setShowConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowConfirm(false);
  };

  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const windowSize = useWindowSize();

  let navClass = ['pcoded-navbar'];

  navClass = [...navClass];

  if (windowSize.width < 992 && collapseMenu) {
    navClass = [...navClass, 'mob-open'];
  } else if (collapseMenu) {
    navClass = [...navClass, 'navbar-collapsed'];
  }

  let navBarClass = ['navbar-wrapper'];

  let navContent = (
    <div className={navBarClass.join(' ')}>
      <NavLogo />
      <NavContent navigation={navigation.items} />
    </div>
  );
  if (windowSize.width < 992) {
    navContent = (
      <div className="navbar-wrapper">
        <NavLogo />
        <NavContent navigation={navigation.items} />
      </div>
    );
  }
  return (
    <React.Fragment>
      <nav className={navClass.join(' ')}>{navContent}</nav>
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Bạn có chắc chắn muốn đăng xuất không?</p>
          <button onClick={handleConfirmLogout}>Có</button>
          <button onClick={handleCancelLogout}>Không</button>
        </div>
      )}
    </React.Fragment>

  );
};

export default Navigation;
