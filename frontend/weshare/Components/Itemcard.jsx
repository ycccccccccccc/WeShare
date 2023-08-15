/* eslint-disable react/prop-types */
import Image from 'next/image';
import styles from "../styles/Itemcard.module.scss";

export default function Itemcard({ onMoreClick }) {
  const sampleAddress = "台北市南港區東新街170巷47號1樓";
  return (
    <div>
      <div className={styles.ItemBoard}>
        <div className={styles.ItemPic}>
          <Image
            src="/mockitempic.png"
            alt="ItemPicture"
            width={244}
            height={219}
          />
        </div>
        <div className={styles.ItemDetail}>
          <div className={styles.ItemDetailName}>物品: 棉被</div>
          <div className={styles.ItemDetailPrice}>價格: 200元/個</div>
        </div>
        <button type='button' className={styles.more} onClick={() => onMoreClick(sampleAddress)}>更多</button>
      </div>
    </div>
  );
}
