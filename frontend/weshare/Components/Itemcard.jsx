import styles from "../styles/Itemcard.module.scss";
import Image from 'next/image';
export default function Itemcard() {
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
        <div className={styles.more}>更多</div>
      </div>
    </div>
  );
}
