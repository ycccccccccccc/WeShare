/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import Image from "next/image";
import ReactStars from "react-stars";
import {useState} from "react" 
import styles from "../styles/navbar.module.scss";
import useGiveRating from "../hooks/useGiveRating";

function Notification({ event }) {
  const [rating, setRating] = useState(null);
  const { giveRating, isLoading} = useGiveRating();
  const handleRate = async (newRating) => {
    setRating(newRating);
    
    // 假設你想要對特定的 order 進行評分
    await giveRating(event.order.id, newRating);
  };
  return (
    <div>
      <div className={styles.div2}>
        <div className={styles.leftboard}>
          <Image
            className={styles.menu_pic}
            src="/個人照片.png"
            width={50}
            height={50}
            alt="個人照片"
          />
          <div className={styles.createdtime}>{event.created_at}</div>
        </div>
        <div className={styles.rightboard}>
          <div className={styles.noticontent}>{event.type}</div>
          
          {event.order.status === "request" && (
            <>
              <div className={styles.noticontent}>
                {event.user.name} 購買 {event.order.quantity} 個 {event.order.title}
              </div>
              <div className={styles.twobtn}>
                <button className={styles.confirmbtn} type="button">
                  確認訂單
                </button>
                <button className={styles.canclebtn} type="button">
                  取消訂單
                </button>
              </div>
            </>
          )}

          {event.order.status === "agree" && (
            <>
              <div className={styles.noticontent}>
                {event.user.name} 接受 {event.order.quantity} 個 {event.order.title}
              </div>
              <div>
              <ReactStars 
              className={styles.giverate} 
              count={5} 
              size={24} 
              color2="#ffd700"
              value={rating}
              onChange={handleRate}
            />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.notiline} />
    </div>
  );
}

export default Notification;
