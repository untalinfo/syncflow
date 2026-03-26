import { RiLoopLeftLine, RiNotification2Line } from "@remixicon/react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__title">SyncFlow</span>
      </div>
      <div className="header__actions">
        <button className="header__icon-btn">
          <RiLoopLeftLine size={20} />
        </button>
        <button className="header__icon-btn header__icon-btn--notify">
          <RiNotification2Line size={20} />
          <span className="header__notify-badge"></span>
        </button>
        <button className="header__primary-btn">
          Create Request
        </button>
        <div className="header__avatar">
          <img
            alt="User profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIOLSwMip41l3YHF4ZNaA6cpUoecDqZXIbXfZ5IxQyqHa5c6k-FADNmOWvhRvhw4Bp4X_zRdR29GIHaqzlKO3YckVdoVibT6dBUtsi_3FUGqiFsEY5LkYtPjCEc6BaXY4Csy_3eeOzre1eGMkM4ZdRqCvilMdK52DhfWyQZz1zJCK75o3pWzWde4sa6D2o7TvxbKn3uFZkug6F9PJV9wXYpCMwyn9ItBeTyALgyGOZbWOgELyp7BzH2iMtbLIKYcIOizFm_eptf3-t"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
