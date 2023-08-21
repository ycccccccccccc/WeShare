import styles from "../styles/createObject.module.scss";

export default function CreateObject() {
  return (
    <div className={styles.wholePage}>
      <div className={styles.titleAndType}>
        <div className={styles.fontType}>標題</div>
        <input type="text" className={styles.inputFrame} />
        <div className={styles.fontType_right}>類型</div>
        <select className={styles.filter}>
          <option> </option>
          <option>消耗品</option>
          <option>清潔用品</option>
          <option>食物</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
        </select>
      </div>
      <div className={styles.contentAndPic}>
        <div className={styles.fontType}>內容</div>
        <textarea className={styles.inputFrame} placeholder="物品詳細資訊" />
        <div className={styles.uploadPic}>上傳圖片</div>
      </div>
      <div className={styles.loactionAndPrice}>
        <div className={styles.fontType}>地點</div>
        <input type="text" className={styles.inputFrameLocation} />
        <div className={styles.fontType_right}>價格</div>
        <input type="text" className={styles.inputFramePrice} />
      </div>
      <button type="button" className={styles.confirmCreate}>
        確定送出
      </button>
    </div>
  );
}
