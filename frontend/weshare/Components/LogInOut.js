'use client';

import '../src/app/globals.css';
import  { useState } from 'react';
import Image from "next/image";
import styles from "../styles/logInOut.module.scss";

export default function LogInOut() {
  // const router = useRouter();
  const [isRegisterPage, setIsRegisterPage] = useState(true)
  const handleTogglePage = () => {
    // 切換註冊/登入頁面
    setIsRegisterPage((prev) => !prev);
  };
  
  return (
    <div id={styles.wholePage}>
      <div id={styles.border}>
        <div>
          <div id={styles.signInUp}>
            <div className={styles.weshare}>We Share</div>
            {isRegisterPage ? (
              <div className={styles.memRL}>會員註冊</div>
            ) : (
              <div className={styles.memRL}>會員登入</div>
            )}
            <div className={styles.textAndInput}>
              {isRegisterPage && (
                <div className={styles.iconAndInput}>
                  <Image
                    src="/user_profle_icon.png"
                    width={30}
                    height={30}
                    alt="Example"
                    className={styles.icon}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="例: Chou Chou Hu"
                    className={styles.inputFrame}
                    // onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            <div className={styles.textAndInput}>
              <div className={styles.iconAndInput}>
                <Image
                  src="/tel_icon.png"
                  width={30}
                  height={30}
                  alt="Example"
                  className={styles.icon}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="例: 0912-345-678"
                  className={styles.inputFrame}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.textAndInput}>
              <div className={styles.iconAndInput}>
                <Image
                  src="/lock_icon.png"
                  width={30}
                  height={30}
                  alt="Example"
                  className={styles.icon}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="密碼"
                  className={styles.inputFrame}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.textAndInput}>
              {isRegisterPage && (
                <div className={styles.iconAndInput}>
                  <Image
                    src="/key_icon.png"
                    width={30}
                    height={30}
                    alt="Example"
                    className={styles.icon}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="再次輸入密碼"
                    className={styles.inputFrame}
                    // onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            {isRegisterPage ? (
              <button
                type="button"
                className={styles.register}
                // onClick={handleSignin}
              >
                登入
              </button>
            ) : (
              <button
                type="button"
                className={styles.register}
                // onClick={handleRegister}
              >
                註冊
              </button>
            )}

            {isRegisterPage ? (
              <div className={styles.blackBlueWords}>
                <div>尚未成為會員？</div>
                <button
                  type="button"
                  className={styles.swichmode}
                  onClick={handleTogglePage}
                >
                  會員註冊
                </button>
              </div>
            ) : (
              <div className={styles.blackBlueWords}>
                <div>已經是會員了？</div>
                <button
                  type="button"
                  className={styles.swichmode}
                  onClick={handleTogglePage}
                >
                  會員登入
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className={styles.copyRight}>
        關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
      </footer>
    </div>
  );
}
