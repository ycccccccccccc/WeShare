/* eslint-disable jsx-a11y/mouse-events-have-key-events */

/* eslint-disable react/prop-types */
import Image from "next/image";
import styles from "../styles/Itemcard.module.scss";

export default function Itemcard({
  id,
  image,
  title,
  cost,
  onPicClick,
  onMouseOver,
  onMouseOut,
}) {
  return (
    <div>
      <div
        className={styles.ItemBoard}

      >
        <button
          className={styles.ItemPic}
          onClick={() => onPicClick(id)}
          onMouseOver={() => onMouseOver(id)}
          onMouseOut={() => onMouseOut()}
          type="button"
        >
          <Image
            className={styles.Pic}
            src={`/${image}`}
            alt="ItemPicture"
            width={244}
            height={230}
          />
        </button>
        <div className={styles.ItemDetail}>
          <div className={styles.ItemDetailName}>物品: {title}</div>
          <div className={styles.ItemDetailPrice}>價格: {cost}元/個</div>
        </div>
        <div className={styles.more}>更多</div>
      </div>
    </div>
  );
}
