/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import useGetProfile from "../hooks/user/useGetProfile";
import Notification from "./Notification";
import useGetEvents from "../hooks/useGetEvent";
import style from "../styles/navbar.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

export default function Navbar() {
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const { user, isLoading } = useGetProfile(userId);
  const [notificationCount, setNotificationCount] = useState(0);
  const [maxNotifications, setMaxNotifications] = useState(3);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const {
    events,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useGetEvents();
  const userName = user?.name ?? "";
  const userImage = user?.image ?? "/2.png";
  const userImage2 = user?.image ?? "/個人照片.png";
  useEffect(() => {
    setUserId(Cookies.get("userId"));
  }, []);
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login"); // 導向登入頁面或其他目標頁面
  };
  return (
    <header className={style.border}>
      <Link href="/">
        <Image
          className={style.logo}
          src="/logo.png"
          width={100}
          height={100}
          alt=""
        />
      </Link>
      <div className={style.weshare}>We Share</div>
      <div>
        <div className={style.search_bar}>
          <Image
            className={style.search_pic}
            src="/search.png"
            width={40}
            height={40}
            alt=""
          />
          <input
            type="text"
            // value={enterSearch}
            placeholder="搜尋"
            className={style.searching}
            // onChange={handleInputChange}
          />
          <select className={style.filter}>
            <option value="">類型</option>
            <option value="食品">食品</option>
            <option value="日用品">日用品</option>
            <option value="食物">衣物</option>
            <option value="美妝">美妝</option>
            <option value="家具">家具</option>
            <option value="優惠卷">優惠卷</option>
            <option value="其他">其他</option>
          </select>
        </div>
      </div>
      <Link href="/share" className={style.share_post}>
        Share
      </Link>
      <Image
        className={style.message_box}
        src="/message_box.png"
        width={36}
        height={36}
        alt=""
      />
      <div className={style.notification}>
        <div className={style.notification_icon}>
          <Image
            src="/notification.png"
            className={style.notificationpic}
            alt="icon"
            width={36}
            height={36}
          />
          <div className={style.notimenu}>
            <div className={style.notidiv1}>
              <Image
                className={style.notification_pic}
                src="/notification2.png"
                alt="notification"
                width={38}
                height={38}
                quality={100}
              />
              <p className={style.notititle}>通知</p>
            </div>
            {Array.isArray(events) &&
              events
                .slice(
                  0,
                  showAllNotifications ? events.length : maxNotifications
                )
                .map((event) => <Notification key={event.id} event={event} />)}
            {Array.isArray(events) &&
              events.length > maxNotifications &&
              !showAllNotifications && (
                <button
                  type="button"
                  className={style.viewMoreButton}
                  onClick={() => setShowAllNotifications(true)}
                >
                  查看全部通知
                </button>
              )}
          </div>
          <div className={style.is_readcircle}>{notificationCount}</div>
        </div>
      </div>
      <div className={style.profilepic}>
        {isLoading ? (
          <Skeleton
            className={style.authorpic}
            width={36}
            height={36}
            circle={0.5} // You can adjust this value to make it a circle
          />
        ) : (
          <Image
            className={style.profile_pic1}
            src={userImage2}
            width={36}
            height={36}
            alt="個人照片"
          />
        )}
        <div className={style.menu}>
          <div className={style.div1}>
            <Image
              className={style.profile_pic}
              src={userImage}
              alt="profilepic"
              width={38}
              height={38}
              quality={100}
            />
            <p className={style.yourname}>{userName}</p>
          </div>
          <div className={style.div2}>
            <Link href={`/user/${userId}`}>
              <div className={style.hovertit}>查看個人檔案</div>
            </Link>
            <div className={style.line} />
          </div>
          <div className={style.div3} onClick={handleLogout}>
            <div className={style.hovertit}>登出</div>
          </div>
        </div>
      </div>
    </header>
  );
}
