/* eslint-disable react/prop-types */
import Image from 'next/image';
import styles from "../styles/Itemcard.module.scss";

export default function Itemcard({  image, title, cost }) {
  return (
    <div>
      <div className={styles.ItemBoard}>
        <div className={styles.ItemPic}>
          <Image
            className={styles.Pic}
            src={`/${image}`}
            alt="ItemPicture"
            width={244}
            height={230}
          />
        </div>
        <div className={styles.ItemDetail}>
          <div className={styles.ItemDetailName}>物品: {title}</div>
          <div className={styles.ItemDetailPrice}>價格: {cost}元/個</div>
        </div>
        <div  className={styles.more} >更多</div>
      </div>
    </div>
  );
}
